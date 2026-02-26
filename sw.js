/* ===== Service Worker — 冰島自駕遊 PWA ===== */
/* 作用：快取靜態資源，讓 App 能離線瀏覽已造訪過的頁面 */

const CACHE_NAME = 'iceland-travel-v1';

// 安裝時需要預先快取的核心檔案
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './puffin-icon-192.png',
  './puffin-icon-512.png',
  // Google Fonts
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  // Leaflet 地圖函式庫
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  // Lucide 圖標
  'https://unpkg.com/lucide@latest'
];

// ── 安裝階段：快取靜態資源 ──
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // 跳過等待，立即啟動新版 Service Worker
  self.skipWaiting();
});

// ── 啟動階段：清除舊版快取 ──
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // 讓新 SW 立刻接管所有頁面
  self.clients.claim();
});

// ── 攔截請求：根據類型選擇策略 ──
self.addEventListener('fetch', (event) => {
  // 只攔截 GET 請求
  if (event.request.method !== 'GET') return;

  // 天氣 API 等第三方 → Network First（優先取得最新資料）
  if (event.request.url.includes('api.open-meteo.com')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open('iceland-api-cache').then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // 斷網時，回傳最後一次的 API 快取
          return caches.match(event.request);
        })
    );
    return;
  }

  // 一般靜態資源 → Cache First（優先從快取讀取，加速載入）
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        // 動態將新抓到的資源也加入快取
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      });
    })
  );
});
