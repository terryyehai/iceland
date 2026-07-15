/* ===== day.js — 每日行程頁共用邏輯（由 data.js 驅動） ===== */
(function () {
    'use strict';

    const dayNum = parseInt(document.body.dataset.day, 10);
    const D = (window.TRIP_DATA || []).find(x => x.day === dayNum);
    const root = document.getElementById('day-root');
    if (!D || !root) return;

    // ── localStorage 輔助 ──
    const store = {
        get(key, fallback) {
            try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
        },
        set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
    };

    // ── 打卡狀態 ──
    function getVisited() { return store.get('visitedSpots', {})[dayNum] || {}; }
    function setVisited(idx, on) {
        const all = store.get('visitedSpots', {});
        const day = all[dayNum] || {};
        if (on) day[idx] = true; else delete day[idx];
        all[dayNum] = day;
        store.set('visitedSpots', all);
    }

    // ── 日期（2026 年，從 "8月1日（週六）" 取出） ──
    function isoDate() {
        const m = D.date.match(/(\d+)月(\d+)日/);
        if (!m) return null;
        return `2026-${String(m[1]).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}`;
    }

    // ══════════════ 渲染 ══════════════
    function render() {
        const visited = getVisited();
        const doneCount = Object.keys(visited).length;

        root.innerHTML = `
        <!-- 頂部導覽 -->
        <div class="top">
            <a class="back" href="${D.prev || 'index.html'}" aria-label="上一頁">←</a>
            <div style="flex:1">
                <div class="top-title">Day ${D.day} · ${D.title}</div>
                <div class="top-sub">${D.date}</div>
            </div>
            <a class="back home-btn" href="index.html" aria-label="回首頁"><i data-lucide="home"></i></a>
        </div>
        <div class="day-progress"><div class="day-progress-fill" id="day-progress-fill" style="width:${Math.round(doneCount / D.spots.length * 100)}%; background:${D.color}"></div></div>

        <!-- 英雄插畫 + 日橫幅 -->
        <div class="day-hero" style="--accent:${D.color}">
            <img src="images/day${D.day}.svg" alt="Day ${D.day} ${D.title} 插畫"
                 onerror="this.closest('.day-hero').classList.add('no-img')" />
            <div class="hero-overlay"></div>
            <div class="banner-num">${String(D.day).padStart(2, '0')}</div>
            <div class="banner-info">
                <div class="theme">${D.theme}</div>
                <div class="meta">${D.meta}</div>
            </div>
        </div>

        <!-- 當日天氣 -->
        <div class="sec-head">
            <div class="dot" style="background:${D.color}"></div>
            <h2><i data-lucide="cloud-sun"></i> 當日天氣與日照</h2>
        </div>
        <div class="day-weather" id="day-weather"><div class="dw-loading">☁️ 讀取當日預報中…</div></div>

        <!-- 行程時間軸 -->
        <div class="sec-head">
            <div class="dot" style="background:${D.color}"></div>
            <h2><i data-lucide="map-pin"></i> 今日行程</h2>
            <span class="tl-progress-text" id="tl-progress-text">${doneCount}/${D.spots.length} 打卡</span>
            <button class="fold-all-btn" id="fold-all-btn" title="全部收合／展開"><i data-lucide="chevrons-down-up"></i></button>
        </div>
        <div class="tl-hint">💡 點時間軸圓點打卡，點標題可收合</div>
        <div class="timeline">
            ${D.spots.map((s, i) => renderSpot(s, i, !!visited[i])).join('')}
        </div>

        <!-- 住宿 -->
        <div class="sec-head">
            <div class="dot" style="background:#0D9488"></div>
            <h2><i data-lucide="bed"></i> 今晚住宿</h2>
        </div>
        <div class="hotel-card">
            <div class="icon">${D.hotel ? D.hotel.icon : '🏨'}</div>
            <div>
                <div class="name">${D.hotel ? D.hotel.name : '—'}</div>
                <div class="desc">${D.hotel ? D.hotel.desc : ''}</div>
            </div>
        </div>

        <!-- 地圖 -->
        <div class="sec-head">
            <div class="dot" style="background:#3B82F6"></div>
            <h2><i data-lucide="map"></i> 景點地圖</h2>
        </div>
        <div id="map"></div>

        <!-- 記帳 -->
        <div class="sec-head">
            <div class="dot" style="background:#F59E0B"></div>
            <h2><i data-lucide="wallet"></i> 今日記帳</h2>
        </div>
        <div class="expense-card">
            <div class="exp-form">
                <input type="number" id="exp-amount" inputmode="decimal" placeholder="金額 ISK" min="0">
                <select id="exp-cat">
                    <option value="⛽ 加油">⛽ 加油</option>
                    <option value="🍽️ 餐飲">🍽️ 餐飲</option>
                    <option value="🎫 門票/活動">🎫 門票/活動</option>
                    <option value="🛒 超市">🛒 超市</option>
                    <option value="🏨 住宿">🏨 住宿</option>
                    <option value="🎁 購物">🎁 購物</option>
                    <option value="📦 其他">📦 其他</option>
                </select>
                <input type="text" id="exp-note" placeholder="備註（選填）">
                <button id="exp-add"><i data-lucide="plus"></i> 記一筆</button>
            </div>
            <div class="exp-list" id="exp-list"></div>
            <div class="exp-total" id="exp-total"></div>
        </div>

        <!-- 提示 -->
        <div class="sec-head">
            <div class="dot" style="background:#F87171"></div>
            <h2><i data-lucide="lightbulb"></i> 今日提醒</h2>
        </div>
        <div class="tips">
            ${D.tips.map(t => `<div class="tip"><span class="tip-ic"><i data-lucide="alert-circle"></i></span><span>${t}</span></div>`).join('')}
        </div>

        <!-- 上一天 / 下一天 -->
        <div class="day-nav-row">
            ${D.prev ? `<a class="day-nav-btn prev" href="${D.prev}">← Day ${D.day - 1}</a>` : `<a class="day-nav-btn prev" href="index.html">← 首頁</a>`}
            ${D.next ? `<a class="day-nav-btn next" href="${D.next.href}">${D.next.label} →</a>` : `<a class="day-nav-btn next" href="index.html">🏠 回首頁</a>`}
        </div>`;
    }

    function renderSpot(s, i, done) {
        return `
        <div class="tl-item" id="spot-${i}">
            <div class="tl-line">
                <input type="checkbox" class="tl-check" data-idx="${i}" ${done ? 'checked' : ''} aria-label="打卡：${s.title}">
                ${i < D.spots.length - 1 ? '<div class="tl-bar"></div>' : ''}
            </div>
            <div class="tl-card ${done ? 'done' : ''}">
                <div class="tl-time-row">
                    <div class="tl-time">${s.time}<span class="tl-done-badge">✓ 已打卡</span></div>
                    <div class="tl-actions">
                        <button class="nav-btn play-btn" data-idx="${i}" title="播放景點導覽"><i data-lucide="volume-2"></i> 導覽</button>
                        <a href="${s.nav}" target="_blank" rel="noopener" class="nav-btn"><i data-lucide="navigation"></i> 導航</a>
                    </div>
                </div>
                <button class="tl-title" data-idx="${i}" aria-expanded="true">${s.title}<span class="tl-caret">▾</span></button>
                <div class="tl-body">
                    <div class="tl-desc">${s.desc}</div>
                    ${s.tags.length ? `<div class="tl-tags">${s.tags.map(t => `<span class="tl-tag">${t}</span>`).join('')}</div>` : ''}
                </div>
            </div>
        </div>`;
    }

    // ══════════════ 互動：打卡 ══════════════
    function updateProgress() {
        const done = Object.keys(getVisited()).length;
        const pct = Math.round(done / D.spots.length * 100);
        document.getElementById('day-progress-fill').style.width = pct + '%';
        document.getElementById('tl-progress-text').textContent = `${done}/${D.spots.length} 打卡`;
    }

    function bindEvents() {
        // 打卡
        root.querySelectorAll('.tl-check').forEach(cb => {
            cb.addEventListener('change', () => {
                const i = +cb.dataset.idx;
                setVisited(i, cb.checked);
                document.querySelector(`#spot-${i} .tl-card`).classList.toggle('done', cb.checked);
                updateProgress();
            });
        });
        // 摺疊
        root.querySelectorAll('.tl-title').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.tl-card');
                const folded = card.classList.toggle('folded');
                btn.setAttribute('aria-expanded', String(!folded));
            });
        });
        // 全部收合/展開
        let allFolded = false;
        document.getElementById('fold-all-btn').addEventListener('click', () => {
            allFolded = !allFolded;
            root.querySelectorAll('.tl-card').forEach(c => c.classList.toggle('folded', allFolded));
            root.querySelectorAll('.tl-title').forEach(b => b.setAttribute('aria-expanded', String(!allFolded)));
        });
        // 語音導覽
        root.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const s = D.spots[+btn.dataset.idx];
                speakText(s.title, s.speak || s.desc);
            });
        });
        // 記帳
        document.getElementById('exp-add').addEventListener('click', addExpense);
        document.getElementById('exp-amount').addEventListener('keydown', e => { if (e.key === 'Enter') addExpense(); });
    }

    function speakText(title, desc) {
        if (!('speechSynthesis' in window)) { alert('您的瀏覽器不支援語音導覽功能。'); return; }
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance('即將抵達' + title + '。 ' + desc);
        msg.lang = 'zh-TW';
        msg.rate = parseFloat(localStorage.getItem('voiceRate') || '1.0');
        window.speechSynthesis.speak(msg);
    }

    // ══════════════ 地圖 ══════════════
    function initMap() {
        try {
            const map = L.map('map').setView([D.map.lat, D.map.lng], D.map.zoom);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM', maxZoom: 18 }).addTo(map);
            D.markers.forEach(mk => {
                // 嘗試對應到時間軸景點，讓 popup 可以跳到該行程卡
                const idx = D.spots.findIndex(s => s.title.includes(mk.name) || mk.name.includes(s.title) ||
                    (mk.name.length > 3 && (s.title + s.desc).includes(mk.name)));
                const jump = idx >= 0 ? `<br><a href="#spot-${idx}" class="popup-jump" data-idx="${idx}">📍 查看行程 ›</a>` : '';
                L.circleMarker([mk.lat, mk.lng], { radius: 7, fillColor: mk.c, color: '#fff', weight: 2, fillOpacity: .9 })
                    .addTo(map).bindPopup(`<b>${mk.name}</b>${jump}`);
            });
            map.on('popupopen', e => {
                const link = e.popup.getElement().querySelector('.popup-jump');
                if (link) link.addEventListener('click', ev => {
                    ev.preventDefault();
                    const i = +link.dataset.idx;
                    const el = document.getElementById(`spot-${i}`);
                    el.querySelector('.tl-card').classList.remove('folded');
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.querySelector('.tl-card').classList.add('flash');
                    setTimeout(() => el.querySelector('.tl-card').classList.remove('flash'), 1600);
                });
            });
        } catch (e) {
            document.getElementById('map').innerHTML = '<div style="height:200px;display:flex;align-items:center;justify-content:center;color:#6B7280;">地圖載入失敗</div>';
        }
    }

    // ══════════════ 當日天氣 / 日出日落 ══════════════
    async function fetchDayWeather() {
        const el = document.getElementById('day-weather');
        const date = isoDate();
        const loc = D.markers[0] || D.map;
        if (!date || !loc) { el.style.display = 'none'; return; }

        const tz = loc.lat > 60 ? 'Atlantic/Reykjavik' : 'Asia/Taipei';
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lng}` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,wind_speed_10m_max,precipitation_probability_max` +
            `&start_date=${date}&end_date=${date}&timezone=${encodeURIComponent(tz)}`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('out of range');
            const data = await res.json();
            const d = data.daily;
            if (!d || d.temperature_2m_max[0] == null) throw new Error('no data');
            const hm = s => s.slice(11, 16);
            const dayH = (d.daylight_duration[0] / 3600).toFixed(1);
            el.innerHTML = `
              <div class="dw-main">
                <span class="dw-icon">${weatherIcon(d.weather_code[0])}</span>
                <span class="dw-temp">${Math.round(d.temperature_2m_min[0])}° ~ ${Math.round(d.temperature_2m_max[0])}°C</span>
                <span class="dw-loc">📍 ${D.markers[0] ? D.markers[0].name : ''}</span>
              </div>
              <div class="dw-grid">
                <div class="dw-cell">🌅 日出<br><b>${hm(d.sunrise[0])}</b></div>
                <div class="dw-cell">🌇 日落<br><b>${hm(d.sunset[0])}</b></div>
                <div class="dw-cell">☀️ 日照<br><b>${dayH} 小時</b></div>
                <div class="dw-cell">💨 最大風速<br><b>${Math.round(d.wind_speed_10m_max[0])} km/h</b></div>
                <div class="dw-cell">🌧️ 降雨機率<br><b>${d.precipitation_probability_max ? (d.precipitation_probability_max[0] ?? '--') : '--'}%</b></div>
              </div>`;
        } catch {
            el.innerHTML = `<div class="dw-loading">📅 ${date} 的預報將於出發前 16 天內自動顯示</div>`;
        }
    }

    function weatherIcon(code) {
        if (code === 0) return '☀️';
        if (code <= 3) return '⛅';
        if (code <= 48) return '🌫️';
        if (code <= 67) return '🌧️';
        if (code <= 77) return '🌨️';
        if (code <= 82) return '🌦️';
        if (code <= 86) return '❄️';
        return '⛈️';
    }

    // ══════════════ 記帳 ══════════════
    function getRate() { return parseFloat(localStorage.getItem('iskRate')) || 0.235; }
    function getExpenses() { return store.get('expenses', {})[dayNum] || []; }
    function saveExpenses(list) {
        const all = store.get('expenses', {});
        all[dayNum] = list;
        store.set('expenses', all);
    }

    function addExpense() {
        const amountEl = document.getElementById('exp-amount');
        const amount = parseFloat(amountEl.value);
        if (!amount || amount <= 0) { amountEl.focus(); return; }
        const list = getExpenses();
        list.push({ a: amount, c: document.getElementById('exp-cat').value, n: document.getElementById('exp-note').value.trim(), t: Date.now() });
        saveExpenses(list);
        amountEl.value = '';
        document.getElementById('exp-note').value = '';
        renderExpenses();
    }

    function renderExpenses() {
        const list = getExpenses();
        const listEl = document.getElementById('exp-list');
        const rate = getRate();
        listEl.innerHTML = list.length === 0
            ? '<div class="exp-empty">尚無記錄，出發後隨手記一筆吧！</div>'
            : list.map((e, i) => `
              <div class="exp-item">
                <span class="exp-cat">${e.c}</span>
                <span class="exp-note">${e.n || ''}</span>
                <span class="exp-amt">${e.a.toLocaleString()} ISK</span>
                <button class="exp-del" data-idx="${i}" aria-label="刪除">✕</button>
              </div>`).join('');
        listEl.querySelectorAll('.exp-del').forEach(btn => {
            btn.addEventListener('click', () => {
                const l = getExpenses();
                l.splice(+btn.dataset.idx, 1);
                saveExpenses(l);
                renderExpenses();
            });
        });
        const total = list.reduce((s, e) => s + e.a, 0);
        document.getElementById('exp-total').innerHTML = total > 0
            ? `今日合計 <b>${total.toLocaleString()} ISK</b> ≈ <b>NT$ ${Math.round(total * rate).toLocaleString()}</b>`
            : '';
    }

    // ══════════════ 初始化 ══════════════
    if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark-mode');
    if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');

    render();
    bindEvents();
    initMap();
    fetchDayWeather();
    renderExpenses();
    if (window.lucide) lucide.createIcons();

    // 滾動漸入動畫
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    root.querySelectorAll('.tl-item, .hotel-card, .tips, .day-weather, .expense-card').forEach(el => {
        el.classList.add('fade-up');
        obs.observe(el);
    });
})();
