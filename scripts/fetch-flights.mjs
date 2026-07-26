// 由 GitHub Actions 排程執行（見 .github/workflows/flights.yml），server-side 直接呼叫
// KEF／HKG／FRA 三個機場官網的即時航班介面，寫出 flights-live.json 給靜態網站前端讀取。
// （TPE 桃園機場官網 API 本就允許瀏覽器跨網域讀取，前端可直接呼叫，見 app.js
//   fetchTpeFlightDetail，不需搬來這裡；且其 Cloudflare 防護會攔截 Node fetch 的
//   TLS 指紋，即使補上瀏覽器標頭也一樣被擋，用 curl 才過得去，不值得為它額外處理。）
//
// 之所以要搬到 server-side 執行，是因為瀏覽器端呼叫這些介面各自碰到不同障礙：
//   HKG 香港機場：官網 API 會比對 Origin 白名單，瀏覽器帶的 Origin 一律被拒絕（403）；
//                 不帶 Origin 標頭時（Node fetch 預設不會帶）可直接取得資料。
//   FRA 法蘭克福機場：舊版頁面 URL 已改版（/en/flights/departures.html 現為 404），
//                 新版 /en/flights-and-transfer/departures.html 背後的
//                 _jcr_content.flights.json/filter?...&q=<航班號> 端點無存取限制。
//   KEF 凱夫拉維克：官網 API 本就不擋 CORS，過去經 corsproxy.io 中轉，現在 server-side
//                 直接呼叫，不再需要依賴外部公開 proxy。
// 加上 TPE 原本就有的兩段，六班航班的十二個航段之後全部有即時資料來源。

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const OUT_PATH = fileURLToPath(new URL('../flights-live.json', import.meta.url));

// 只在行程日期前後這段期間才實際打 API，其餘時間排程直接跳過（省資源、避免無意義的 commit）
const ACTIVE_FROM = new Date('2026-07-30T00:00:00Z');
const ACTIVE_TO = new Date('2026-08-17T12:00:00Z');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

// 每段航班的出發／抵達分別對應哪個機場的即時查詢（TPE 兩段由前端直接處理，這裡略過）
const FLIGHTS = [
    { no: 'CI923', dep: null, arr: { airport: 'hkg', date: '2026-08-01', arrival: true } },
    { no: 'LH797', dep: { airport: 'hkg', date: '2026-08-01', arrival: false }, arr: { airport: 'fra', date: '2026-08-02', arrival: true } },
    { no: 'LH844', dep: { airport: 'fra', date: '2026-08-02', arrival: false }, arr: { airport: 'kef', date: '2026-08-02', arrival: true } },
    { no: 'LH845', dep: { airport: 'kef', date: '2026-08-15', arrival: false }, arr: { airport: 'fra', date: '2026-08-15', arrival: true } },
    { no: 'LH796', dep: { airport: 'fra', date: '2026-08-15', arrival: false }, arr: { airport: 'hkg', date: '2026-08-16', arrival: true } },
    { no: 'CI916', dep: { airport: 'hkg', date: '2026-08-16', arrival: false }, arr: null },
];

const KEF_STATUS_MAP = {
    NoStatus: '尚未開放', GateOpen: '登機門開放', GTO: '登機門開放', Boarding: '登機中', BRD: '登機中',
    BDC: '最後登機', FinalCall: '最後登機', ATD: '已起飛', DEP: '已起飛', CNL: '已取消',
    DLY: '延誤', EXP: '預計抵達', LAN: '已降落', ARR: '已降落', CFM: '已確認', SCH: '已排定',
};

const FRA_STATUS_MAP = {
    boarding: '登機中', 'gate open': '登機門開放', 'final call': '最後登機',
    departed: '已起飛', landed: '已降落', approaching: '即將抵達',
    cancelled: '已取消', delayed: '延誤', scheduled: '已排定',
};

const norm = (s) => (s || '').replace(/\s+/g, '').toUpperCase();

async function fetchKef(no, opt) {
    const res = await fetch(`https://www.kefairport.com/api/flightData?date=${opt.date}`, {
        headers: { 'User-Agent': UA },
    });
    if (!res.ok) throw new Error(`KEF HTTP ${res.status}`);
    const json = await res.json();
    const f = (json.value || []).find((x) => x.flightNumber === no && x.arrival === opt.arrival);
    if (!f) return null;
    return {
        source: 'KEF 機場',
        gate: f.gate || f.gatePublic || '',
        belt: f.belt || '',
        status: f.status ? (KEF_STATUS_MAP[f.status] || f.status) : '',
        updated: f.updatedTime || '',
    };
}

async function fetchHkg(no, opt) {
    // 刻意不帶 Origin 標頭 — 官網會比對白名單，帶了反而被拒
    const res = await fetch(`https://www.hongkongairport.com/flightinfo-rest/rest/flights?span=1&date=${opt.date}&lang=en&cargo=false&arrival=${opt.arrival}`, {
        headers: { 'User-Agent': UA, 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`HKG HTTP ${res.status}`);
    const json = await res.json();
    const list = (json[0] || {}).list || [];
    const entry = list.find((x) => (x.flight || []).some((f) => norm(f.no) === norm(no)));
    if (!entry) return null;
    return {
        source: '香港機場',
        gate: entry.gate || '',
        belt: entry.baggage || '',
        status: entry.status || '',
        updated: '',
    };
}

async function fetchFra(no, opt) {
    const flighttype = opt.arrival ? 'arrivals' : 'departures';
    const q = no.replace(/^([A-Za-z]+)(\d+)$/, '$1 $2');
    const url = `https://www.frankfurt-airport.com/en/_jcr_content.flights.json/filter?perpage=5&lang=en-GB&page=1&flighttype=${flighttype}&q=${encodeURIComponent(q)}`;
    const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`FRA HTTP ${res.status}`);
    const json = await res.json();
    const f = (json.data || []).find((x) => norm(x.fnr) === norm(no));
    if (!f) return null;
    const statusRaw = (f.status || '').trim();
    return {
        source: '法蘭克福機場',
        gate: f.gate || f.ausgang || '',
        belt: Array.isArray(f.bag) ? f.bag.join(', ') : '',
        status: FRA_STATUS_MAP[statusRaw.toLowerCase()] || statusRaw,
        updated: f.lu ? f.lu.slice(11, 16) : '',
    };
}

const FETCHERS = { kef: fetchKef, hkg: fetchHkg, fra: fetchFra };

async function fetchLeg(no, leg) {
    if (!leg) return null;
    const fetcher = FETCHERS[leg.airport];
    try {
        return await fetcher(no, leg);
    } catch (e) {
        console.warn(`[${no}] ${leg.airport} 抓取失敗：${e.message}`);
        return null;
    }
}

async function main() {
    const now = new Date();
    if (now < ACTIVE_FROM || now > ACTIVE_TO) {
        console.log(`目前不在行程期間（${ACTIVE_FROM.toISOString()} ~ ${ACTIVE_TO.toISOString()}），略過本次抓取。`);
        return;
    }

    const flights = {};
    for (const f of FLIGHTS) {
        const [dep, arr] = await Promise.all([fetchLeg(f.no, f.dep), fetchLeg(f.no, f.arr)]);
        flights[f.no] = { dep, arr };
    }

    await writeFile(OUT_PATH, JSON.stringify({ generatedAt: now.toISOString(), flights }, null, 2) + '\n', 'utf-8');
    console.log(`已寫入 ${OUT_PATH}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
