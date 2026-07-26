/* ===== app.js — 冰島自駕遊 PWA 主邏輯 ===== */

// ── 16 天行程資料：來自 data.js（單一資料來源，與各 day 頁一致） ──
const DAYS = window.TRIP_DATA;

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
    renderExpenseOverview();
    initScrollAnim();
    initDarkMode();
    initLargeText();
    initVoiceSettings();
    lucide.createIcons();
    registerSW();
});

// ── 渲染日期卡片（含 SVG 縮圖與打卡進度） ──
function renderDayCards() {
    const container = document.getElementById('day-cards');
    const visitedAll = JSON.parse(localStorage.getItem('visitedSpots') || '{}');
    container.innerHTML = DAYS.map(d => {
        const done = Object.keys(visitedAll[d.day] || {}).length;
        const pct = Math.round(done / d.spots.length * 100);
        const tags = d.markers.slice(0, 3).map(m => m.name);
        return `
    <a class="day-card" href="day${d.day}.html">
      <div class="day-thumb" style="--accent:${d.color}">
        <img src="images/day${d.day}.svg" alt="" loading="lazy" onerror="this.style.display='none'">
        <span class="day-num">${String(d.day).padStart(2, '0')}</span>
        ${pct > 0 ? `<span class="day-pct ${pct === 100 ? 'full' : ''}">${pct === 100 ? '✓' : pct + '%'}</span>` : ''}
      </div>
      <div class="day-body">
        <div class="day-meta"><span class="day-date">${d.date}</span></div>
        <div class="day-theme">${d.theme}</div>
        <div class="attraction-tags">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        ${pct > 0 ? `<div class="day-mini-progress"><div style="width:${pct}%;background:${d.color}"></div></div>` : ''}
      </div>
      <div class="day-arrow">›</div>
    </a>`;
    }).join('');
}

// ── 旅費總覽（各 day 頁記帳的加總） ──
function renderExpenseOverview() {
    const el = document.getElementById('expense-overview');
    if (!el) return;
    const all = JSON.parse(localStorage.getItem('expenses') || '{}');
    const perDay = DAYS.map(d => ({
        day: d.day, color: d.color,
        total: (all[d.day] || []).reduce((s, e) => s + e.a, 0)
    }));
    const grand = perDay.reduce((s, d) => s + d.total, 0);
    if (grand === 0) {
        el.innerHTML = '<div class="eo-empty">還沒有支出記錄。到每日行程頁的「今日記帳」隨手記，這裡會自動加總。</div>';
        return;
    }
    const max = Math.max(...perDay.map(d => d.total));
    el.innerHTML = `
      <div class="eo-total">總支出 <b>${grand.toLocaleString()} ISK</b> ≈ <b>NT$ ${Math.round(grand * currentIskToTwdRate).toLocaleString()}</b></div>
      <div class="eo-bars">
        ${perDay.map(d => `
          <a class="eo-bar" href="day${d.day}.html" title="Day ${d.day}：${d.total.toLocaleString()} ISK">
            <div class="eo-bar-fill" style="height:${d.total ? Math.max(8, Math.round(d.total / max * 100)) : 0}%;background:${d.color}"></div>
            <span>${d.day}</span>
          </a>`).join('')}
      </div>`;
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
    // 每天取一個代表點（冰島境內），popup 可直接進入該日行程
    const dayStops = DAYS
        .map(d => {
            const mk = d.markers.find(m => m.lat > 60);
            return mk ? { day: d.day, theme: d.theme, color: d.color, lat: mk.lat, lng: mk.lng, name: mk.name } : null;
        })
        .filter(Boolean);
    dayStops.forEach(s => {
        L.circleMarker([s.lat, s.lng], { radius: 7, fillColor: s.color, color: '#fff', weight: 2, fillOpacity: .9 })
            .addTo(map)
            .bindPopup(`<b>Day ${s.day}</b>｜${s.name}<br><a href="day${s.day}.html">${s.theme} ›</a>`);
    });
    // 畫環島路線（依日期順序）
    const route = dayStops.map(s => [s.lat, s.lng]);
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
            localStorage.setItem('iskRate', String(currentIskToTwdRate)); // 供 day 頁記帳換算使用
            document.getElementById('isk-to-twd-rate').textContent = currentIskToTwdRate.toFixed(4);
            calcExchange();
            renderExpenseOverview(); // 匯率更新後重算 TWD
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

// ── 航班資訊：班表狀態 + airplanes.live 即時 ADS-B 補充 ──
// 狀態主體由行程班表推算（含時區，永遠正確）；airplanes.live 免金鑰、支援 CORS、無配額，
// 查得到即時訊號時疊加顯示高度/速度。（aviationstack 配額已耗盡、OpenSky 擋 CORS、adsbdb 航線資料有誤，皆不可用）
const FLIGHT_SCHEDULE = [
    { no: 'CI923', callsign: 'CAL923', dep: '2026-08-01T18:10:00+08:00', arr: '2026-08-01T20:05:00+08:00' },
    { no: 'LH797', callsign: 'DLH797', dep: '2026-08-01T23:25:00+08:00', arr: '2026-08-02T06:55:00+02:00' },
    { no: 'LH844', callsign: 'DLH844', dep: '2026-08-02T11:10:00+02:00', arr: '2026-08-02T12:55:00+00:00' },
    { no: 'LH845', callsign: 'DLH845', dep: '2026-08-15T14:20:00+00:00', arr: '2026-08-15T19:50:00+02:00' },
    { no: 'LH796', callsign: 'DLH796', dep: '2026-08-15T21:40:00+02:00', arr: '2026-08-16T15:45:00+08:00' },
    { no: 'CI916', callsign: 'CAL916', dep: '2026-08-16T17:30:00+08:00', arr: '2026-08-16T19:25:00+08:00' }
];

async function fetchFlights() {
    const CACHE_KEY = 'iceland_flights_live';
    const CACHE_TIME = 10 * 60 * 1000; // 10 分鐘快取，避免頻繁打 API

    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{"time":0,"data":{}}');
    let liveMap = cached.data;

    if (Date.now() - cached.time > CACHE_TIME) {
        liveMap = {};
        await Promise.all(FLIGHT_SCHEDULE.map(async fs => {
            try {
                const res = await fetch(`https://api.airplanes.live/v2/callsign/${fs.callsign}`);
                if (!res.ok) return;
                const json = await res.json();
                const ac = (json.ac || [])[0];
                if (ac) liveMap[fs.no] = { alt: ac.alt_baro, gs: ac.gs };
            } catch (e) { console.warn(`Fetch live flight ${fs.no} failed:`, e); }
        }));
        localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), data: liveMap }));
    }

    const now = Date.now();
    FLIGHT_SCHEDULE.forEach(fs => {
        const el = document.getElementById(`f-${fs.no}`);
        const exEl = document.getElementById(`f-${fs.no}-ex`);
        if (!el) return;

        const dep = new Date(fs.dep).getTime();
        const arr = new Date(fs.arr).getTime();
        const live = liveMap[fs.no];
        const inWindow = now >= dep && now <= arr + 60 * 60 * 1000; // 起飛後至抵達+1小時內

        if (now < dep - 2 * 3600000) {
            const daysLeft = Math.ceil((dep - now) / 86400000);
            el.innerHTML = daysLeft > 1 ? `🗓️ 已排定（${daysLeft} 天後）` : '🗓️ 已排定（今日）';
            el.className = 'fi-status st-sched';
        } else if (now < dep) {
            el.innerHTML = '🛄 即將起飛';
            el.className = 'fi-status st-sched';
        } else if (inWindow) {
            if (live && live.alt !== 'ground') { el.innerHTML = '✈️ 飛行中（即時）'; el.className = 'fi-status st-active'; }
            else if (live) { el.innerHTML = '🛬 已在地面'; el.className = 'fi-status st-landed'; }
            else if (now <= arr) { el.innerHTML = '✈️ 飛行中（依班表）'; el.className = 'fi-status st-active'; }
            else { el.innerHTML = '🛬 已抵達'; el.className = 'fi-status st-landed'; }
        } else {
            el.innerHTML = '✅ 已完成';
            el.className = 'fi-status st-landed';
        }

        // 即時 ADS-B 補充資訊：飛行中顯示高度/速度；行前查到同班號今日航班則顯示參考訊號
        if (exEl) {
            if (live && live.alt !== 'ground') {
                const altFt = typeof live.alt === 'number' ? Math.round(live.alt).toLocaleString() : '-';
                const kmh = typeof live.gs === 'number' ? Math.round(live.gs * 1.852).toLocaleString() : '-';
                const label = inWindow ? '📡 即時訊號' : '📡 同班號今日航班（參考）';
                exEl.innerHTML = `
                    <div class="fi-extra-info">
                        <span>${label}</span>
                        <span>高度 ${altFt} ft｜時速 ${kmh} km/h</span>
                    </div>`;
            } else {
                exEl.innerHTML = '';
            }
        }
    });

    if (window.lucide) window.lucide.createIcons();
}

// ── 航班詳情展開（登機門／行李轉盤，Flightradar24 風格） ──
// 出發／抵達兩側各自對應一個機場的即時來源：
//   TPE 桃園機場：官網 API 直接允許瀏覽器跨網域讀取，前端直接呼叫（見 fetchTpeFlightDetail）
//   KEF／HKG／FRA：瀏覽器端無法直接取得即時資料 ——
//     HKG 官網 API 會比對 Origin 白名單，瀏覽器帶的 Origin 一律被拒絕；
//     FRA 官網無公開、允許跨網域的即時查詢介面；
//     KEF 官網 API 本身不主動允許 CORS。
//   這三個機場改由 GitHub Actions 排程 server-side 抓取（不受瀏覽器限制），寫入
//   flights-live.json 後由前端直接讀取（見 scripts/fetch-flights.mjs、.github/workflows/flights.yml）。
const FLIGHT_DETAILS = {
    CI923: {
        dep: { code: 'TPE', name: '台北桃園', time: '18:10', live: { type: 'tpe', date: '2026/08/01', arrival: false } },
        arr: { code: 'HKG', name: '香港', time: '20:05', live: { type: 'hkg' } },
        links: [['桃園機場出發航班', 'https://www.taoyuan-airport.com/flight_depart']]
    },
    LH797: {
        dep: { code: 'HKG', name: '香港', time: '23:25', live: { type: 'hkg' } },
        arr: { code: 'FRA', name: '法蘭克福', time: '06:55 (+1)', live: { type: 'fra' } },
        links: [['香港機場出發航班', 'https://www.hongkongairport.com/en/flights/departures/passenger.page']]
    },
    LH844: {
        dep: { code: 'FRA', name: '法蘭克福', time: '11:10', live: { type: 'fra' } },
        arr: { code: 'KEF', name: '凱夫拉維克', time: '12:55', live: { type: 'kef' } },
        links: [['法蘭克福機場出發航班', 'https://www.frankfurt-airport.com/en/flights-and-transfer/departures.html'], ['KEF 抵達航班', 'https://www.kefairport.com/en/flights/arrivals']]
    },
    LH845: {
        dep: { code: 'KEF', name: '凱夫拉維克', time: '14:20', live: { type: 'kef' } },
        arr: { code: 'FRA', name: '法蘭克福', time: '19:50', live: { type: 'fra' } },
        links: [['KEF 出發航班', 'https://www.kefairport.com/en/flights/departures']]
    },
    LH796: {
        dep: { code: 'FRA', name: '法蘭克福', time: '21:40', live: { type: 'fra' } },
        arr: { code: 'HKG', name: '香港', time: '15:45 (+1)', live: { type: 'hkg' } },
        links: [['法蘭克福機場出發航班', 'https://www.frankfurt-airport.com/en/flights-and-transfer/departures.html']]
    },
    CI916: {
        dep: { code: 'HKG', name: '香港', time: '17:30', live: { type: 'hkg' } },
        arr: { code: 'TPE', name: '台北桃園', time: '19:25', live: { type: 'tpe', date: '2026/08/16', arrival: true } },
        links: [['桃園機場抵達航班', 'https://www.taoyuan-airport.com/flight_arrive']]
    }
};

// 桃園機場：官網 API 直接允許跨網域讀取，不需任何中轉代理
async function fetchTpeFlightDetail(flightNo, tpeOpt) {
    const CACHE_KEY = 'iceland_tpe_detail';
    const CACHE_TIME = 10 * 60 * 1000;
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const hit = cached[flightNo];
    if (hit && Date.now() - hit.time < CACHE_TIME) return hit.data;

    const res = await fetch('https://www.taoyuan-airport.com/api/api/flight/a_flight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ODate: tpeOpt.date, AState: tpeOpt.arrival ? 'A' : 'D', STime: '00:00', ETime: '23:59', language: 'ch' })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const code = flightNo.replace(/^([A-Za-z]+)0*(\d+)$/, '$1$2');
    const f = json.find(x => x.flightCode === code);
    const data = f ? { source: '桃園機場', gate: f.Gate || '', belt: tpeOpt.arrival ? (f.StopCode && f.StopCode !== '.' ? f.StopCode : '') : '', status: (f.Memo || f.CurrentStatus || '').trim(), updated: f.RTime ? f.RTime.slice(0, 5) : '' } : null;
    cached[flightNo] = { time: Date.now(), data };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
    return data;
}

// KEF／HKG／FRA：由 GitHub Actions 排程產生的快取檔（見 scripts/fetch-flights.mjs）
let flightsLiveCache = null;
async function loadFlightsLive() {
    if (flightsLiveCache) return flightsLiveCache;
    try {
        const res = await fetch(`flights-live.json?_=${Date.now()}`, { cache: 'no-store' });
        flightsLiveCache = res.ok ? await res.json() : { flights: {} };
    } catch (e) {
        console.warn('Fetch flights-live.json failed:', e);
        flightsLiveCache = { flights: {} };
    }
    return flightsLiveCache;
}

const SOURCE_NAME = { tpe: '桃園機場', kef: 'KEF 機場', hkg: '香港機場', fra: '法蘭克福機場' };

// 抓取單一航段（出發或抵達）的即時資訊；回傳 { data, err }
async function fetchLegLive(no, legPos, leg) {
    if (!leg.live) return { data: null, err: false };
    if (leg.live.type === 'tpe') {
        try { return { data: await fetchTpeFlightDetail(no, leg.live), err: false }; }
        catch (e) { console.warn(`Live detail ${no} (tpe) failed:`, e); return { data: null, err: true }; }
    }
    const cache = await loadFlightsLive();
    const data = (cache.flights && cache.flights[no] && cache.flights[no][legPos]) || null;
    return { data, err: false };
}

function renderLegRow(icon, label, leg, legPos, result) {
    const { data, err } = result;
    let valueStr = '—', statusStr = '';
    if (data) {
        valueStr = legPos === 'dep' ? (data.gate || '未分配') : (data.belt || '未分配');
        statusStr = `${data.status || '尚無狀態'}${data.updated ? `（更新 ${data.updated}）` : ''}`;
    }
    const valueLabel = legPos === 'dep' ? '登機門' : '行李轉盤';
    const sourceName = leg.live ? SOURCE_NAME[leg.live.type] : '';
    const note = !leg.live
        ? ''
        : data
            ? `<div class="fd-row fd-status"><span>🛰️ ${sourceName}即時狀態</span><span>${statusStr}</span></div>`
            : err
                ? `<div class="fd-note">⚠️ ${sourceName}資料暫時無法取得，可稍後再試</div>`
                : `<div class="fd-note">ℹ️ ${sourceName}尚無此班次資料（通常起飛前 1-2 天才開放）</div>`;
    return `<div class="fd-row"><span>${icon} ${label}</span><span>${leg.code} ${leg.name} · ${leg.time}</span><span>${valueLabel} ${valueStr}</span></div>${note}`;
}

function renderFlightDetail(no, depResult, arrResult) {
    const d = FLIGHT_DETAILS[no];
    const links = [...d.links, ['Flightradar24 即時追蹤', `https://www.flightradar24.com/data/flights/${no.toLowerCase()}`]]
        .map(([label, url]) => `<a class="fd-link" href="${url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${label} ↗</a>`)
        .join('');

    return `
        <div class="fd-grid">
            ${renderLegRow('🛫', '出發', d.dep, 'dep', depResult)}
            ${renderLegRow('🛬', '抵達', d.arr, 'arr', arrResult)}
        </div>
        <div class="fd-links">${links}</div>`;
}

async function toggleFlightDetail(no) {
    const panel = document.getElementById(`f-${no}-detail`);
    if (!panel) return;
    if (!panel.hidden) { panel.hidden = true; return; }
    panel.hidden = false;
    panel.innerHTML = '<div class="fd-note">⏳ 載入詳細資訊…</div>';

    const d = FLIGHT_DETAILS[no];
    const [depResult, arrResult] = await Promise.all([
        fetchLegLive(no, 'dep', d.dep),
        fetchLegLive(no, 'arr', d.arr)
    ]);
    panel.innerHTML = renderFlightDetail(no, depResult, arrResult);
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

// ── 深色模式：預設關閉，不再依系統偏好自動開啟，只依使用者手動設定 ──
function initDarkMode() {
    const shouldBeDark = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', shouldBeDark);
    // 明確同步開關視覺狀態，避免瀏覽器保留上次操作的 checkbox 狀態導致開關顯示跟實際主題不一致
    const toggle = document.getElementById('dark-toggle');
    if (toggle) toggle.checked = shouldBeDark;
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

// ── 設定：大字體模式 ──
function initLargeText() {
    const isLarge = localStorage.getItem('largeText') === 'true';
    const toggle = document.getElementById('large-text-toggle');
    if (toggle) toggle.checked = isLarge;
    if (isLarge) document.body.classList.add('large-text');
}

function toggleLargeText() {
    const toggle = document.getElementById('large-text-toggle');
    if (!toggle) return;
    const isLarge = toggle.checked;
    localStorage.setItem('largeText', isLarge);
    if (isLarge) document.body.classList.add('large-text');
    else document.body.classList.remove('large-text');
}

// ── 設定：語音設定 ──
function initVoiceSettings() {
    const rate = localStorage.getItem('voiceRate') || '1.0';
    const voiceInput = document.getElementById('voice-rate');
    const voiceVal = document.getElementById('voice-rate-val');
    if (voiceInput) voiceInput.value = rate;
    if (voiceVal) voiceVal.textContent = parseFloat(rate).toFixed(1) + 'x';
}

function saveVoiceSettings() {
    const voiceInput = document.getElementById('voice-rate');
    const voiceVal = document.getElementById('voice-rate-val');
    if (!voiceInput) return;
    localStorage.setItem('voiceRate', voiceInput.value);
    if (voiceVal) voiceVal.textContent = parseFloat(voiceInput.value).toFixed(1) + 'x';
}

// ── 設定：測試推播 ──
function testNotification() {
    if (!("Notification" in window)) {
        alert("您的瀏覽器不支援通知功能。");
        return;
    }
    if (Notification.permission === "granted") {
        showPush();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") showPush();
        });
    } else {
        alert("您已封鎖通知。如果是在 iOS Safari，請將此網站『加入主畫面』後再試一次，或至系統設定開啟通知。");
    }
}

function showPush() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('冰島自駕 PWA 提醒', {
                body: '早安！即將開始今天的行程，記得檢查必備行李喔！',
                icon: './puffin-icon-192.png',
                vibrate: [200, 100, 200]
            });
        }).catch(err => {
            new Notification('冰島自駕 PWA 提醒', { body: '早安！' });
        });
    } else {
        new Notification('冰島自駕 PWA 提醒', { body: '早安！' });
    }
}

// ── 設定：清除快取與重置 ──
function resetAppData() {
    if (!confirm('🚨 這會清除所有的行李打包紀錄、深色模式設定與快取，並載入最新版的 App。\n\n確定嗎？')) return;

    // 1. 清除 LocalStorage
    localStorage.clear();

    // 2. 解除安裝 Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (let registration of registrations) {
                registration.unregister();
            }
        }).then(() => {
            // 3. 清除 Cache API
            if ('caches' in window) {
                caches.keys().then(names => {
                    Promise.all(names.map(name => caches.delete(name))).then(() => {
                        window.location.reload(true);
                    });
                });
            } else {
                window.location.reload(true);
            }
        });
    } else {
        window.location.reload(true);
    }
}

// ── 設定：行事曆匯出 (.ics) ──
function exportToICS() {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Iceland PWA//TW\n";

    DAYS.forEach(d => {
        // 從 '8月1日（週六）' 中萃取出日期
        const match = d.date.match(/(\d+)月(\d+)日/);
        if (match) {
            let m = String(match[1]).padStart(2, '0');
            let dd = String(match[2]).padStart(2, '0');
            let dateStr = `2026${m}${dd}`;

            icsContent += "BEGIN:VEVENT\n";
            icsContent += `DTSTART;VALUE=DATE:${dateStr}\n`;
            icsContent += `DTEND;VALUE=DATE:${dateStr}\n`;
            icsContent += `SUMMARY:[冰島 Day ${d.day}] ${d.theme}\n`;
            let desc = d.spots.map(s => `${s.time} ${s.title}`).join('｜').replace(/[\r\n]/g, ' ');
            icsContent += `DESCRIPTION:${desc}\n`;
            icsContent += "END:VEVENT\n";
        }
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "Iceland_2026_Itinerary.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
