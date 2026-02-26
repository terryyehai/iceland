/* ===== app.js — 冰島自駕遊 PWA 主邏輯 ===== */

// ── 16 天行程資料 ──
const DAYS = [
    { day: 1, date: '8/1（五）', theme: '抵達雷克雅維克', icon: '✈️', tags: ['抵達', 'KEF機場', '市區漫步'], accent: 'accent-d1' },
    { day: 2, date: '8/2（六）', theme: '黃金圈經典路線', icon: '⛲', tags: ['辛格維利爾', '間歇泉', '黃金瀑布'], accent: 'accent-d2' },
    { day: 3, date: '8/3（日）', theme: '南海岸瀑布之旅', icon: '🌊', tags: ['塞里雅蘭瀑布', '斯科加瀑布', 'Dyrhólaey'], accent: 'accent-d3' },
    { day: 4, date: '8/4（一）', theme: '黑沙灘與海蝕柱', icon: '🖤', tags: ['Reynisfjara', '維克小鎮', '玄武岩柱'], accent: 'accent-d4' },
    { day: 5, date: '8/5（二）', theme: '冰河湖與鑽石沙灘', icon: '🧊', tags: ['Jökulsárlón', '鑽石沙灘', '冰河健行'], accent: 'accent-d5' },
    { day: 6, date: '8/6（三）', theme: '東部峽灣探索', icon: '⛰️', tags: ['東峽灣', '漁村', '野生馴鹿'], accent: 'accent-d6' },
    { day: 7, date: '8/7（四）', theme: '東峽灣至米湖', icon: '🚗', tags: ['黛提瀑布', 'Stuðlagil峽谷', '自駕公路'], accent: 'accent-d7' },
    { day: 8, date: '8/8（五）', theme: '米湖地熱奇觀', icon: '♨️', tags: ['米湖溫泉', 'Hverir地熱', '偽火山口'], accent: 'accent-d8' },
    { day: 9, date: '8/9（六）', theme: '胡薩維克賞鯨', icon: '🐋', tags: ['賞鯨', 'Puffin', '眾神瀑布'], accent: 'accent-d9' },
    { day: 10, date: '8/10（日）', theme: '阿克雷里北部之都', icon: '🏘️', tags: ['阿克雷里教堂', '植物園', '峽灣'], accent: 'accent-d10' },
    { day: 11, date: '8/11（一）', theme: '西北冰島公路', icon: '🛤️', tags: ['Skagafjörður', '馬群', '布倫迪歐斯'], accent: 'accent-d11' },
    { day: 12, date: '8/12（二）', theme: '斯奈山半島東段', icon: '🌄', tags: ['教會山', 'Grundarfjörður', 'Stykkishólmur'], accent: 'accent-d12' },
    { day: 13, date: '8/13（三）', theme: '斯奈山半島西段', icon: '🏔️', tags: ['斯奈菲爾冰川', 'Djúpalónssandur', 'Arnarstapi'], accent: 'accent-d13' },
    { day: 14, date: '8/14（四）', theme: '雷克雅維克市區', icon: '🎨', tags: ['哈爾格林姆教堂', '彩虹街', '哈帕音樂廳'], accent: 'accent-d14' },
    { day: 15, date: '8/15（五）', theme: '藍湖溫泉與紀念品', icon: '💎', tags: ['Blue Lagoon', '紀念品', 'Laugavegur'], accent: 'accent-d15' },
    { day: 16, date: '8/16（六）', theme: '返程', icon: '🛫', tags: ['KEF機場', '免稅店', '回程'], accent: 'accent-d16' },
];

// ── 地圖標記資料 (環島主要點) ──
const MAP_SPOTS = [
    { name: '雷克雅維克', lat: 64.1466, lng: -21.9426, c: '#2563eb' },
    { name: '辛格維利爾', lat: 64.2559, lng: -21.1306, c: '#f59e0b' },
    { name: '間歇泉', lat: 64.3103, lng: -20.3023, c: '#f59e0b' },
    { name: '黃金瀑布', lat: 64.3271, lng: -20.1199, c: '#f59e0b' },
    { name: '塞里雅蘭瀑布', lat: 63.6156, lng: -19.9925, c: '#10b981' },
    { name: '斯科加瀑布', lat: 63.5321, lng: -19.5113, c: '#10b981' },
    { name: '維克', lat: 63.4186, lng: -19.0060, c: '#1e293b' },
    { name: '冰河湖', lat: 64.0784, lng: -16.2306, c: '#06b6d4' },
    { name: '埃伊爾斯塔濟', lat: 65.2500, lng: -14.3948, c: '#8b5cf6' },
    { name: '米湖', lat: 65.6009, lng: -16.9969, c: '#ef4444' },
    { name: '胡薩維克', lat: 66.0449, lng: -17.3389, c: '#14b8a6' },
    { name: '阿克雷里', lat: 65.6835, lng: -18.0878, c: '#f97316' },
    { name: '教會山', lat: 64.9264, lng: -23.4094, c: '#ec4899' },
    { name: '藍湖', lat: 63.8804, lng: -22.4495, c: '#0ea5e9' },
    { name: 'KEF機場', lat: 63.9850, lng: -22.6056, c: '#ef4444' },
];

// ── 天氣城市 ──
const WEATHER_CITIES = [
    { name: '雷克雅維克', lat: 64.15, lon: -21.94 },
    { name: '維克', lat: 63.42, lon: -19.01 },
    { name: '米湖', lat: 65.60, lon: -17.00 },
    { name: '阿克雷里', lat: 65.68, lon: -18.09 },
    { name: '斯奈山', lat: 64.80, lon: -23.78 },
];

// ── 初始化 ──
document.addEventListener('DOMContentLoaded', () => {
    renderDayCards();
    initCountdown();
    initMap();
    fetchWeather();
    fetchExchangeRate();
    fetchAurora();
    fetchFlights();
    initPackingList();
    initScrollAnim();
    initDarkMode();
    lucide.createIcons();
    registerSW();
});

// ── 渲染日期卡片 ──
function renderDayCards() {
    const container = document.getElementById('day-cards');
    container.innerHTML = DAYS.map(d => `
    <a class="day-card" href="day${d.day}.html">
      <div class="day-accent ${d.accent}">
        <span class="day-num">${String(d.day).padStart(2, '0')}</span>
        <span class="day-label">DAY</span>
      </div>
      <div class="day-body">
        <div class="day-meta"><span class="day-date">${d.date}</span></div>
        <div class="day-theme">${d.icon} ${d.theme}</div>
        <div class="attraction-tags">${d.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
      <div class="day-arrow">›</div>
    </a>
  `).join('');
}

// ── 倒數計時器 ──
function initCountdown() {
    const target = new Date('2026-08-01T00:00:00+00:00');
    function update() {
        const now = new Date();
        const diff = target - now;
        if (diff <= 0) { document.getElementById('countdown-value').textContent = '已出發！🎉'; return; }
        const days = Math.floor(diff / 86400000);
        const hrs = Math.floor((diff % 86400000) / 3600000);
        document.getElementById('countdown-value').textContent = `${days} 天 ${hrs} 小時`;
    }
    update();
    setInterval(update, 60000);
}

// ── Leaflet 地圖 ──
function initMap() {
    const el = document.getElementById('map-overview');
    if (!el) return;
    const map = L.map('map-overview').setView([64.9, -18.5], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18
    }).addTo(map);
    // 加入標記
    MAP_SPOTS.forEach(s => {
        L.circleMarker([s.lat, s.lng], { radius: 6, fillColor: s.c, color: '#fff', weight: 2, fillOpacity: .9 })
            .addTo(map).bindPopup(`<b>${s.name}</b>`);
    });
    // 畫環島路線 (簡化折線)
    const route = MAP_SPOTS.map(s => [s.lat, s.lng]);
    route.push(route[0]); // 回到起點
    L.polyline(route, { color: '#2563eb', weight: 2, dashArray: '6,4', opacity: .6 }).addTo(map);
}

// ── 天氣 ──
async function fetchWeather() {
    const container = document.getElementById('weather-cards');
    const cards = [];
    for (const city of WEATHER_CITIES) {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Atlantic/Reykjavik`;
            const res = await fetch(url);
            const data = await res.json();
            const c = data.current;
            const icon = getWeatherIcon(c.weather_code);
            cards.push(`
        <div class="weather-card">
          <div class="wc-city">${city.name}</div>
          <div class="wc-icon">${icon}</div>
          <div class="wc-temp">${Math.round(c.temperature_2m)}°C</div>
          <div class="wc-details"><span>💧${c.relative_humidity_2m}%</span><span>💨${c.wind_speed_10m}km/h</span></div>
        </div>
      `);
        } catch { cards.push(`<div class="weather-card"><div class="wc-city">${city.name}</div><div class="wc-loading">無法載入</div></div>`); }
    }
    container.innerHTML = cards.join('');
}

function getWeatherIcon(code) {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '🌨️';
    if (code <= 82) return '🌦️';
    if (code <= 86) return '❄️';
    return '⛈️';
}

// ── 匯率 ──
let currentIskToTwdRate = 0.23; // 預設參考匯率

async function fetchExchangeRate() {
    try {
        // 使用 Frankfurter API (免費，無須註冊) 抓取 ISK 對 TWD 匯率 (可能需透過 EUR 中轉或直接抓，這裡示範透過 API)
        // Frankfurter 不一定直接支援 ISK->TWD，若無則改用備用公共 API 或寫死接近即時的參考值
        // 為了確保前端穩定性且無需 API key，這裡呼叫一個通用的開放 API (例如 open.er-api.com)
        const res = await fetch('https://open.er-api.com/v6/latest/ISK');
        const data = await res.json();
        if (data && data.rates && data.rates.TWD) {
            currentIskToTwdRate = data.rates.TWD;
            document.getElementById('isk-to-twd-rate').textContent = currentIskToTwdRate.toFixed(4);
            calcExchange();
        } else {
            throw new Error("No TWD rate found");
        }
    } catch (e) {
        console.warn("Fetch exchange rate failed, using fallback:", e);
        // Fallback 近期參考匯率 (約為 1 ISK = 0.235 TWD)
        currentIskToTwdRate = 0.235;
        document.getElementById('isk-to-twd-rate').textContent = currentIskToTwdRate.toFixed(4);
        calcExchange();
    }
}

function calcExchange() {
    const iskInput = document.getElementById('isk-input');
    const resultEl = document.getElementById('twd-result');
    if (!iskInput || !resultEl) return;

    let iskVal = parseFloat(iskInput.value) || 0;
    let twdVal = iskVal * currentIskToTwdRate;

    // 顯示結果，取整數
    resultEl.textContent = Math.round(twdVal).toLocaleString();
}

// ── 極光預測 (Kp Index) ──
async function fetchAurora() {
    try {
        // 使用 NOAA 太空天氣預測中心的免費公開 API (Planetary K-index), 1分鐘更新
        const res = await fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json');
        const data = await res.json();
        // data 格式第一行為標題，最後一列為最新預測值 ["2026-08-01 12:00:00.000", "2.33"]
        if (data && data.length > 1) {
            const latest = data[data.length - 1];
            const kp = parseFloat(latest[1]);
            document.getElementById('aurora-kp').textContent = kp.toFixed(1);

            let chance = '極低';
            let color = '#64748b'; // gray
            if (kp >= 2 && kp < 4) { chance = '低 (可嘗試攝影)'; color = '#10b981'; } // green
            if (kp >= 4 && kp < 5) { chance = '中 (肉眼可見)'; color = '#f59e0b'; } // yellow
            if (kp >= 5) { chance = '高 (風暴級！)'; color = '#ef4444'; } // red

            const chanceEl = document.getElementById('aurora-chance');
            if (chanceEl) {
                chanceEl.textContent = chance;
                chanceEl.style.color = color;
            }
        }
    } catch (e) {
        console.warn("Fetch Aurora API failed:", e);
        document.getElementById('aurora-kp').textContent = '--';
    }
}

// ── 航班追蹤 (Aviationstack) ──
async function fetchFlights() {
    const flights = ['CI923', 'LH797', 'LH844', 'LH845', 'LH796', 'CI916'];
    const apiKey = '4e6b9230157d7292916389ff7e13289f';
    const CACHE_KEY = 'iceland_flights_data';
    const CACHE_TIME = 30 * 60 * 1000; // 30 分鐘快取，節省免費額度

    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{"time":0, "data":{}}');
    const now = Date.now();
    let dataMap = cached.data;

    if (now - cached.time > CACHE_TIME) {
        dataMap = {};
        for (let f of flights) {
            try {
                const url = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${f}`;
                const res = await fetch(url);
                const json = await res.json();

                if (json && json.data && json.data.length > 0) {
                    const flightData = json.data[0];
                    dataMap[f] = {
                        status: flightData.flight_status,
                        depGate: flightData.departure?.gate || '-',
                        depTerminal: flightData.departure?.terminal || '-',
                        arrGate: flightData.arrival?.gate || '-',
                        arrTerminal: flightData.arrival?.terminal || '-',
                        baggage: flightData.arrival?.baggage || '-'
                    };
                } else {
                    dataMap[f] = { status: 'unknown' };
                }
            } catch (err) {
                console.warn(`Fetch flight ${f} failed:`, err);
                dataMap[f] = { status: 'error' };
            }
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify({ time: now, data: dataMap }));
    }

    // 更新 UI
    flights.forEach(f => {
        const el = document.getElementById(`f-${f}`);
        const exEl = document.getElementById(`f-${f}-ex`);
        if (el && dataMap[f]) {
            const fd = typeof dataMap[f] === 'string' ? { status: dataMap[f] } : dataMap[f];
            const status = fd.status;
            if (status === 'scheduled') { el.innerHTML = '⏱️ 預定起飛'; el.className = 'fi-status st-sched'; }
            else if (status === 'active') { el.innerHTML = '✈️ 飛行中'; el.className = 'fi-status st-active'; }
            else if (status === 'landed') { el.innerHTML = '🛬 已抵達'; el.className = 'fi-status st-landed'; }
            else if (status === 'cancelled') { el.innerHTML = '❌ 已取消'; el.className = 'fi-status st-cancelled'; }
            else if (status === 'incident' || status === 'diverted') { el.innerHTML = '⚠️ 異常'; el.className = 'fi-status st-cancelled'; }
            else { el.innerHTML = '🔍 查無狀態'; el.className = 'fi-status st-unk'; }

            if (exEl && fd.status && fd.status !== 'unknown' && fd.status !== 'error') {
                const termStr = fd.depTerminal !== '-' ? `T${fd.depTerminal}` : '-';
                exEl.innerHTML = `
                    <div class="fi-extra-info">
                        <span>出發: 航廈 ${termStr} / 登機台 ${fd.depGate}</span>
                        <span>抵達: 行李轉盤 ${fd.baggage}</span>
                    </div>
                `;
            }
        }
    });

    // 重新觸發 Lucide icon 繪製
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// ── 行李打包清單 ──
const PACKING_ITEMS = [
    { id: 'p_doc', label: '護照 (>6個月效期) & 機票行程單' },
    { id: 'p_jacket', label: '防水防風外套 (Gore-Tex)' },
    { id: 'p_base', label: '保暖底層衣 (發熱衣/羊毛)' },
    { id: 'p_shoes', label: '防水登山鞋 (冰川健行必備)' },
    { id: 'p_plug', label: '歐洲規格轉接頭 (雙圓孔 220V)' },
    { id: 'p_card', label: '信用卡 (需有預借現金密碼供無人加油站)' },
    { id: 'p_med', label: '個人常備藥物 & 暈車藥' },
    { id: 'p_swim', label: '泳衣與大毛巾 (溫泉用)' },
    { id: 'p_food', label: '保溫瓶與乾糧零食' }
];

function initPackingList() {
    const container = document.getElementById('packing-list');
    if (!container) return;

    const saved = JSON.parse(localStorage.getItem('packingStatus') || '{}');

    container.innerHTML = PACKING_ITEMS.map(item => `
        <label class="pack-item ${saved[item.id] ? 'checked' : ''}">
            <input type="checkbox" value="${item.id}" ${saved[item.id] ? 'checked' : ''} onchange="togglePackItem(this)">
            <span class="pack-label">${item.label}</span>
        </label>
    `).join('');

    updatePackingProgress();
}

// window 物件曝光以供 HTML onchange 呼叫
window.togglePackItem = function (cb) {
    const saved = JSON.parse(localStorage.getItem('packingStatus') || '{}');
    saved[cb.value] = cb.checked;
    localStorage.setItem('packingStatus', JSON.stringify(saved));

    if (cb.checked) {
        cb.parentElement.classList.add('checked');
    } else {
        cb.parentElement.classList.remove('checked');
    }
    updatePackingProgress();
};

function updatePackingProgress() {
    const saved = JSON.parse(localStorage.getItem('packingStatus') || '{}');
    const checkedCount = PACKING_ITEMS.filter(item => saved[item.id]).length;
    const total = PACKING_ITEMS.length;
    const percentage = Math.round((checkedCount / total) * 100);

    const fill = document.getElementById('packing-progress-fill');
    const text = document.getElementById('packing-progress-text');
    if (fill && text) {
        fill.style.width = `${percentage}%`;
        text.textContent = `${checkedCount}/${total} 完成 (${percentage}%)`;
    }
}

// ── 滾動動畫 ──
function initScrollAnim() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.day-card, .weather-card, .stats-bar, .map-section, .tips-card, .tip-item').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
}

// ── 深色模式 ──
function initDarkMode() {
    // 檢查 LocalStorage 或是系統偏好 (prefers-color-scheme)
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 如果有儲存設定優先，沒有的話依系統
    const shouldBeDark = saved === 'true' || (saved === null && prefersDark);

    if (shouldBeDark) {
        document.body.classList.add('dark-mode');
        const toggle = document.getElementById('dark-toggle');
        if (toggle) toggle.checked = true;
    }

    // 監聽系統主題改變
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            const toggle = document.getElementById('dark-toggle');
            if (toggle) toggle.checked = e.matches;
        }
    });
}
function toggleDark() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// ── 設定面板 ──
function toggleSettings() {
    document.getElementById('settings-overlay').classList.toggle('open');
}

// ── 註冊 Service Worker ──
function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW:', err));
    }
}
