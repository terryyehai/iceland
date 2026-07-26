# 冰島自駕環島 2026

16 天 15 夜冰島 Ring Road 自駕環島行程網站 —— 一個零建置（no build step）的靜態
PWA（Progressive Web App）：可安裝到手機主畫面、離線瀏覽已造訪過的頁面，內建即時
天氣、匯率換算、航班追蹤、空拍飛行助手等實用功能。

線上網址：透過 GitHub Pages 部署（見下方「部署」）。

## 功能總覽

### 首頁 (`index.html`)
- 出發倒數計時、行程統計列
- 冰島 5 大城市即時天氣（Open-Meteo）
- 即時匯率換算（ISK → TWD）與當地油價參考
- 極光即時預測（NOAA Kp 指數）
- 航班與票務資訊：6 段航班即時狀態，點擊可展開登機門／行李轉盤詳情
  （桃園機場前端直接查詢；KEF／香港／法蘭克福機場由 GitHub Actions 排程於
  server-side 抓取，見下方說明）
- 必備行李清單、旅費總覽（各日記帳加總）
- 每日行程卡片、環島路線地圖總覽
- 深色模式、大字體（駕駛模式）、語音導覽語速設定、行事曆一鍵匯出 (.ics)、
  PWA 推播測試、清除快取重置

### 每日行程頁 (`day1.html` ~ `day16.html`)
16 個頁面共用同一份 `day.js` 渲染邏輯，由 `data.js` 的 `TRIP_DATA` 資料驅動：
- 當日天氣與日出日落
- 行程時間軸（可打卡、可收合、語音導覽朗讀、Google 地圖導航按鈕）
- 當晚住宿資訊、景點地圖、今日記帳、今日提醒
- 上一天／下一天導覽

### 空拍飛行助手 (`drone.html`)
- 疊加冰島交通運輸局（Samgöngustofa）官方禁限航 GeoJSON 圖層
- GPS 定位＋即時風況（Open-Meteo），自動判斷是否落在限制區內
- 行程景點空拍合法性判定（禁止／有條件／一般規則評估），依日期篩選
- EASA 開放類別規則（A1/A2/A3）、保護區限制、有條件開放地點、起飛前檢查清單

## 技術架構

**完全零建置**：純 HTML/CSS/JS，`<script src>` 引入，沒有 bundler、不需要
`npm install`。第三方套件（Leaflet 地圖、Lucide 圖示、Google Fonts）都透過
CDN 引入。

```
index.html / style.css / app.js     首頁
day1~16.html / day.js / day.css     每日行程頁（16 頁共用一份 day.js）
data.js                              單一資料來源（TRIP_DATA，16 天行程內容）
drone.html / drone.js / drone.css   空拍飛行助手
manifest.json / sw.js               PWA 設定與離線快取（Service Worker）
scripts/fetch-flights.mjs           Node 腳本：server-side 抓取即時航班資訊
.github/workflows/static.yml        推送到 main 分支即自動部署到 GitHub Pages
.github/workflows/flights.yml       每 15 分鐘排程抓取即時航班資訊（僅行程期間）
Task/*.docx                          原始每日行程規劃文件
```

## 本機預覽

不需要任何建置指令，任何靜態檔案伺服器都可以：

```bash
python -m http.server 8000
```

再開啟 `http://localhost:8000`。（`.claude/launch.json` 已設定好，Claude Code
可直接用內建的預覽功能開啟。）

## 部署

推送到 `main` 分支會自動觸發 `.github/workflows/static.yml`，把整個目錄部署到
GitHub Pages —— 沒有建置步驟，上傳即部署。

`flights-live.json` 由 `.github/workflows/flights.yml` 每 15 分鐘排程執行
`scripts/fetch-flights.mjs` 產生（只在行程期間 2026-07-30 ~ 2026-08-17
實際執行，其餘時間自動略過），供首頁航班卡片讀取 KEF／香港／法蘭克福機場的
即時登機門與行李轉盤資訊。行程結束後，`flights.yml` 這個 workflow 可以整個
刪除。

---

## 下次規劃別的行程？用 Skill 幾分鐘生一個新網站

這個專案的完整架構（PWA 殼、首頁模組、每日行程樣板、航班追蹤、空拍助手）已經
整理成一個可重複使用的 **Claude Code Skill**：`travel-itinerary-site`，安裝在
`~/.claude/skills/travel-itinerary-site/`（個人層級，不綁定這個資料夾，所以
在任何專案目錄下開新的 Claude Code 對話都能自動用到）。

### 怎麼用

下次規劃新行程時，直接跟 Claude 說類似這樣的話（不需要記住 skill 名稱，
Claude 會自動判斷該用這個 skill）：

> 我在規劃 11 月的京都行程，幫我做一個像冰島那個一樣的行程網站

或更直接：

> 幫我用 travel-itinerary-site 這個 skill 建立新行程的網站

Claude 會先跟你確認幾個關鍵資訊再開始動手：
- **行程基本資料**：目的地、出發日期（會轉換成 ISO 格式）、天數、網站標題
- **貨幣**：當地貨幣 → 想換算成的貨幣（例如 JPY → TWD）
- **語言**：目前範本的介面文字是繁體中文，若這次行程需要別的語言會先跟你確認
- **選用模組**：
  - **航班追蹤**：轉機班次多、銜接緊湊才建議加；單純直飛通常不需要
  - **空拍飛行助手**：只有真的會帶空拍機出門才需要，而且要先確認目的地
    國家有沒有公開的禁限航資料（大多數國家沒有，屆時會做簡化版）
- **每日行程內容**：你可以貼上大致的行程草稿、訂票確認信，或直接跟 Claude
  邊聊邊把每天的行程建出來——這通常是整個過程裡最花時間的部分，值得花心思

接著 Claude 會依照 skill 裡的步驟：複製範本、把 `config.js`／`data.js`／
`index.html` 填上這次行程的實際內容、跑產生每日頁面的腳本、在瀏覽器裡實際
檢查（深色模式、手機/平板/桌機版面、有沒有主控台錯誤），最後才交付給你。

### Skill 內容一覽

```
~/.claude/skills/travel-itinerary-site/
  SKILL.md                      使用流程與訪談問題
  references/
    architecture.md             零建置慣例、PWA/深色模式/響應式設計說明
    data-schema.md               TRIP_DATA 與 config.js 完整欄位說明
    flight-tracking.md           航班追蹤模組的研究方法（怎麼查一個新機場的即時資料）
    drone-assistant.md           空拍助手模組怎麼調整（EASA 規則框架僅適用歐盟）
  assets/                       實際的網站範本檔案（HTML/CSS/JS）
  assets/optional/               選用模組（空拍助手、航班 server-side 抓取腳本）
  scripts/generate-day-pages.mjs 依 data.js 自動產生每日行程頁的小工具
```

這個 skill 是從這個冰島專案整理、通用化而來的（拿掉了冰島專屬的地名/座標/
規則內容，保留了可重用的機制），所以你完全不需要保留這個資料夾也能在下次
用到它——它已經獨立存在於你的 Claude Code 個人設定裡了。
