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
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const toggle = document.getElementById('dark-toggle');
        if (toggle) toggle.checked = true;
    }
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
