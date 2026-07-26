/* ===== 冰島空拍飛行助手 ===== */

const DRONE_LAYER_URLS = {
  permanent: 'https://gis.natt.is/geoserver/samgongustofa/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=samgongustofa:dronemap_ice_json&outputFormat=application/json',
  temporary: 'https://gis.natt.is/geoserver/samgongustofa/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=samgongustofa:skyndilokanir_dronar&outputFormat=application/json'
};

const DRONE_SOURCES = {
  map: 'https://kort.gis.is/mapview/?app=dronar',
  nature: 'https://www.nattura.is/stofnunin/reglur-um-notkun-drona',
  vatnajokull: 'https://www.vatnajokulsthjodgardur.is/en/thenationalpark/drone-rules',
  thingvellir: 'https://www.thingvellir.is/en/administration/licensing/droneflying-for-personal-use/',
  kerid: 'https://www.kerid.is/'
};

// 只收錄行程中的觀光／活動地點；餐廳、住宿、超市與純交通點不列入。
// status 依 2026 年 8 月行程判讀，官方即時 WFS 命中會在載入後再提高限制層級。
const TRIP_SPOT_RULES = {
  '藍湖 Blue Lagoon': { status: 'review', detail: '私人營運場地；未查得場地方公開的休閒空拍許可，須先取得場方同意並遵守現場標示。', source: 'https://www.bluelagoon.com/' },
  '辛格韋德利 Silfra': { status: 'conditional', golden: true, detail: 'Þingvellir 核心區（含 Silfra）只可於 09:00 前或 18:00 後飛行；避開遊客與野生動物。', source: DRONE_SOURCES.thingvellir },
  'Efstidalur II': { status: 'review', golden: true, detail: '私人農場與餐飲場地；官方未公布可飛政策，必須先取得地主／業者同意。', source: 'https://efstidalur.is/' },
  'Geysir': { status: 'blocked', golden: true, detail: '2026 保護區規則：休閒空拍全年禁止，僅特定商業用途可申請許可。', source: DRONE_SOURCES.nature },
  'Gullfoss': { status: 'blocked', golden: true, detail: '2026 保護區規則：休閒空拍全年禁止；即使 Drónakort 點位未命中也不得飛。', source: DRONE_SOURCES.nature },
  'Kerið': { status: 'review', golden: true, detail: '火口湖位於私人土地；景點官網未公布空拍許可，現場 No Drone 牌及地主決定優先。', source: DRONE_SOURCES.kerid },
  'Seljalandsfoss': { status: 'review', detail: '未列入 2026 指定禁飛清單，但入口來自農地且人潮密集；須確認現場牌示與地主規則。', source: DRONE_SOURCES.map },
  'Skógafoss': { status: 'blocked', detail: '2026 保護區規則：休閒空拍全年禁止，僅指定商業用途可申請許可。', source: DRONE_SOURCES.nature },
  'Sólheimajökull': { status: 'review', detail: '冰川活動區有嚮導、遊客與可能的直升機；須取得起降地管理者同意並避開所有團體。', source: DRONE_SOURCES.map },
  '飛機殘骸': { status: 'review', detail: 'Sólheimasandur 為私人土地且常有人潮；須遵守地主與現場規定，不能飛越遊客。', source: DRONE_SOURCES.map },
  'Dyrhólaey': { status: 'blocked', detail: '2026 保護區規則：為保護海鳥與遊客體驗，休閒空拍全年禁止。', source: DRONE_SOURCES.nature },
  'Heimaey 港口': { status: 'review', detail: '港區鄰近 Vestmannaeyjar 機場且有船舶與人群；即時官方空域若命中須取得授權。', source: DRONE_SOURCES.map },
  'Eldheimar': { status: 'review', detail: '館舍與市區鄰近 Vestmannaeyjar 機場；須依官方空域及館方規定。', source: DRONE_SOURCES.map },
  'Stórhöfði': { status: 'review', detail: '海鸚繁殖與觀察區，且可能落在 Vestmannaeyjar 機場限制空域；不得干擾野生動物。', source: DRONE_SOURCES.map },
  'Vík 騎馬場': { status: 'review', detail: '私人騎馬活動場地；必須取得業者同意，且不得接近人員、馬匹或干擾活動。', source: DRONE_SOURCES.map },
  'Fjaðrárgljúfur': { status: 'review', detail: '官方旅遊頁未公布可飛政策；屬敏感峽谷與熱門步道，須依現場封閉、牌示及管理規則。', source: 'https://www.south.is/en/destinations/nature/geosites/fjadrargljufur-canyon' },
  'Fjallsárlón': { status: 'review', detail: '私人營運冰河湖與船遊區；須先詢問營運者，並注意冰川、遊客與其他活動。', source: DRONE_SOURCES.map },
  'Jökulsárlón': { status: 'conditional', detail: '8 月只可於 09:00 前或 18:00 後在指定區飛行；人潮紅區始終禁止，並須讓路直升機。', source: DRONE_SOURCES.vatnajokull },
  'Vestrahorn': { status: 'review', detail: 'Stokksnes／Vestrahorn 為收費私人土地；須取得地主同意並遵守現場 No Drone 標示。', source: 'https://www.stokksnes.is/' },
  'Skaftafell': { status: 'blocked', detail: 'Skaftafell 大部分區域（含 Svartifoss）休閒空拍禁止；僅 Skaftafellsjökull 前緣於 09:00 前或 18:00 後例外。', source: DRONE_SOURCES.vatnajokull },
  'Djúpivogur': { status: 'review', detail: '官方未發現地點特別禁令；仍須避開港區、人群、住宅與鳥類並確認起降地許可。', source: DRONE_SOURCES.map },
  'Hengifoss': { status: 'review', detail: '官方未發現地點特別禁令；步道與觀景區有人時不可飛越，並須確認地主／現場規則。', source: DRONE_SOURCES.map },
  'Seyðisfjörður': { status: 'review', detail: '市鎮、住宅與港區環境；官方未發現地點特別禁令，但須依一般規則及起降地許可評估。', source: DRONE_SOURCES.map },
  'Stuðlagil': { status: 'review', detail: '峽谷兩側涉及私人土地且步道狹窄；須確認地主規則並避免飛越人群。', source: DRONE_SOURCES.map },
  'Dettifoss': { status: 'conditional', detail: '8 月僅西側、08:00 前或 18:00 後可飛；只能飛峽谷上方，不得越過最北觀景台向北。', source: DRONE_SOURCES.vatnajokull },
  'Hverir': { status: 'review', detail: '地熱區環境敏感且鄰近 Mývatn 保護區；須以現場邊界、牌示及官方地圖確認。', source: DRONE_SOURCES.map },
  'Goðafoss': { status: 'blocked', detail: '2026 保護區規則：休閒空拍全年禁止，僅指定商業用途可申請許可。', source: DRONE_SOURCES.nature },
  'Aldeyjarfoss': { status: 'review', detail: '官方未發現地點特別禁令；高地與私人／公有土地邊界仍須現場確認。', source: DRONE_SOURCES.map },
  'Dimmuborgir': { status: 'blocked', detail: '行程在 5/1–9/15 限制期內；此期間休閒用途不核發許可，僅指定商業用途可申請。', source: DRONE_SOURCES.nature },
  'Hverfjall': { status: 'blocked', detail: '位於 Mývatn／Laxá 保護範圍；2026 規則下休閒空拍禁止。', source: DRONE_SOURCES.nature },
  'Húsavík': { status: 'review', detail: '港口有賞鯨船、人群及海鳥；官方未發現地點特別禁令，仍須向港區／起降地管理者確認。', source: DRONE_SOURCES.map },
  'GeoSea': { status: 'review', detail: '私人溫泉營運場地；須先取得業者同意，且不能飛越泡湯旅客。', source: 'https://www.geosea.is/' },
  'Hvítserkur': { status: 'review', detail: '海岸野生動物與鳥類敏感區；官方未發現地點特別禁令，但須停止任何造成動物反應的飛行。', source: DRONE_SOURCES.map },
  'Sky Lagoon': { status: 'review', detail: '私人溫泉營運場地與密集旅客區；須先取得業者同意並遵守隱私規定。', source: 'https://www.skylagoon.com/' },
  'Ytri Tunga 海豹灘': { status: 'review', detail: '海豹觀察區；即使空域無限制也不得接近或干擾野生動物，須遵守地主與現場規定。', source: DRONE_SOURCES.map },
  'Arnarstapi': { status: 'blocked', detail: 'Stapi／Hellnar 海岸列入全年限制清單，休閒空拍禁止。', source: DRONE_SOURCES.nature },
  'Djúpalónssandur': { status: 'blocked', detail: '位於 Snæfellsjökull 國家公園；8 月在 5/1–9/15 限制期內，休閒用途不核發許可。', source: DRONE_SOURCES.nature },
  'Kirkjufell': { status: 'review', detail: '熱門景點涉及私人土地與密集遊客；官方未發現地點特別禁令，須取得起降地許可並遵守現場牌示。', source: DRONE_SOURCES.map },
  '哈爾格林姆教堂': { status: 'review', detail: '市中心宗教建築與密集人群；須取得起降地／管理者同意，且不可飛越人群。', source: DRONE_SOURCES.map },
  'Harpa': { status: 'review', detail: '市中心與敏感政府設施、Reykjavík 機場空域相鄰；以即時官方圖層判定授權要求。', source: DRONE_SOURCES.map },
  '太陽航海者': { status: 'review', detail: '熱門濱海公共空間且人潮密集；官方未發現地點特別禁令，仍不得飛越人群。', source: DRONE_SOURCES.map },
  '托寧湖': { status: 'review', detail: '鄰近 Alþingi 與 Reykjavík 機場限制區，且有大量水鳥；以即時官方圖層判定。', source: DRONE_SOURCES.map },
  'Perlan': { status: 'review', detail: '私人館舍、公園與市區人群環境；須取得起降地管理者同意並確認 Reykjavík 空域。', source: DRONE_SOURCES.map }
};

const CATEGORY_INFO = {
  a1: {
    title: 'A1：C0／C1 輕型無人機',
    text: 'C0（<250 g）與 C1（<900 g）可依 A1 操作；舊型無 C 標籤機種只有 <250 g 可進 A1。不得飛越人群，接近未參與人員的條件仍依 C0/C1 與操作規則區分。',
    tags: ['C0 <250 g', 'C1 <900 g', 'Legacy <250 g']
  },
  a2: {
    title: 'A2：C2 無人機接近未參與人員',
    text: 'C2（<4 kg）可在 A2 操作。與未參與人員至少保持 30 m；啟用符合規範的低速模式時可縮至 5 m，並須具備 A2 所需資格。',
    tags: ['C2 <4 kg', '一般 30 m', '低速模式 5 m']
  },
  a3: {
    title: 'A3：遠離人員與建成區',
    text: 'C2、C3、C4 或 <25 kg 舊型機可依 A3 操作，並須與住宅、商業、工業或休閒區至少保持 150 m；操作範圍內不得危及未參與人員。',
    tags: ['C2/C3/C4', 'Legacy <25 kg', '建成區 150 m']
  }
};

const CONDITIONAL_PLACES = [
  {
    name: 'Skaftafellsjökull',
    zh: '斯卡夫塔山冰川前緣',
    lat: 64.0157,
    lng: -16.9665,
    window: '5/1–9/15：09:00 前或 18:00 後',
    note: '只限冰川前方指定區；Skaftafell 其他區域的休閒空拍禁止。',
    source: 'Vatnajökull National Park · Category III'
  },
  {
    name: 'Jökulsárlón',
    zh: '傑古沙龍冰河湖',
    lat: 64.0784,
    lng: -16.2306,
    window: '7/15–9/21：09:00 前或 18:00 後',
    note: '紅色人潮區始終禁止；注意直升機，無人機必須讓路。',
    source: 'Vatnajökull National Park · Category IV'
  },
  {
    name: 'Dettifoss West',
    zh: '黛提瀑布西側峽谷',
    lat: 65.8148,
    lng: -16.3846,
    window: '5/1–8/31：08:00 前或 18:00 後',
    note: '園界內僅可飛峽谷上方，不得越過西側最北觀景台向北飛。',
    source: 'Vatnajökull National Park · Category V'
  },
  {
    name: 'Þingvellir',
    zh: '辛格瓦勒指定區',
    lat: 64.2559,
    lng: -21.1296,
    window: '核心區：09:00 前或 18:00 後',
    note: 'Leirar 遊客中心至 Þingvallavatn 間適用時段限制；園方建議事先通知。',
    source: 'Þingvellir National Park'
  }
];

let droneMap;
let permanentData = null;
let temporaryData = null;
let userMarker = null;
let accuracyCircle = null;
let tripSpotLayer = null;
let tripSpots = [];
let activeTripFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initTripSpots();
  initCategoryTabs();
  renderPlaces();
  initChecklist();
  initFullscreen();
  document.getElementById('locate-button').addEventListener('click', locateUser);
  if (window.lucide) window.lucide.createIcons();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
});

function initMap() {
  droneMap = L.map('drone-map', { zoomControl: true }).setView([64.95, -18.7], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap · 禁限航資料 © Samgöngustofa'
  }).addTo(droneMap);

  droneMap.createPane('officialRestrictions');
  droneMap.getPane('officialRestrictions').style.zIndex = 410;
  droneMap.createPane('temporaryRestrictions');
  droneMap.getPane('temporaryRestrictions').style.zIndex = 420;
  droneMap.createPane('tripSpots');
  droneMap.getPane('tripSpots').style.zIndex = 650;
  tripSpotLayer = L.layerGroup().addTo(droneMap);

  loadOfficialLayers();
}

async function loadOfficialLayers() {
  const results = await Promise.allSettled([
    fetchGeoJson(DRONE_LAYER_URLS.permanent),
    fetchGeoJson(DRONE_LAYER_URLS.temporary)
  ]);

  if (results[0].status === 'fulfilled') {
    permanentData = results[0].value;
    addRestrictionLayer(permanentData, false);
  }
  if (results[1].status === 'fulfilled') {
    temporaryData = results[1].value;
    addRestrictionLayer(temporaryData, true);
  }

  updateTripSpotOfficialHits();

  const failed = results.filter(result => result.status === 'rejected').length;
  if (failed) {
    setFlightStatus('warning', '官方圖層未完整載入', '請開啟官方 Drónakort 重新確認後再起飛。');
  }
}

async function fetchGeoJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`WFS ${response.status}`);
  const data = await response.json();
  if (data.type !== 'FeatureCollection') throw new Error('Invalid GeoJSON');
  data.features = data.features.map(feature => {
    const zoneGeometry = parseJsonProperty(feature.properties?.geometry);
    return {
      ...feature,
      geometry: zoneGeometry?.horizontalProjection || feature.geometry
    };
  });
  return data;
}

function addRestrictionLayer(data, temporary) {
  const color = temporary ? '#e9a23b' : '#c83f49';
  L.geoJSON(data, {
    pane: temporary ? 'temporaryRestrictions' : 'officialRestrictions',
    style: { color, weight: 1.4, fillColor: color, fillOpacity: temporary ? .32 : .24 },
    onEachFeature: (feature, layer) => {
      const props = feature.properties || {};
      const geometry = parseJsonProperty(props.geometry);
      const height = geometry?.upperLimit != null ? `${geometry.upperLimit} ${geometry.uomDimensions || 'm'} ${geometry.upperVerticalReference || ''}` : '依區域公告';
      layer.bindPopup(`
        <strong>${escapeHtml(props.name || (temporary ? '臨時限制區' : '官方限制區'))}</strong><br>
        ${escapeHtml(props.message || '此區域有特殊無人機限制。')}<br>
        高度上限：${escapeHtml(height)}<br>
        <span class="popup-restriction">${escapeHtml(formatRestriction(props.restriction))}</span>
      `);
    }
  }).addTo(droneMap);
}

function locateUser() {
  const button = document.getElementById('locate-button');
  if (!navigator.geolocation) {
    setFlightStatus('restricted', '此瀏覽器無法定位', '請改用支援 GPS 的 Safari、Chrome 或 Edge，並允許位置權限。');
    return;
  }

  button.disabled = true;
  button.querySelector('span').textContent = '定位中…';
  setFlightStatus('loading', '正在取得 GPS', '高精度定位在戶外通常需要數秒。');

  navigator.geolocation.getCurrentPosition(position => {
    button.disabled = false;
    button.querySelector('span').textContent = '更新我的位置';
    handlePosition(position);
  }, error => {
    button.disabled = false;
    button.querySelector('span').textContent = '重試 GPS 定位';
    const messages = {
      1: '位置權限遭拒，請到瀏覽器或裝置設定允許此網站存取位置。',
      2: '目前無法取得位置，請移到較空曠處或確認定位服務已開啟。',
      3: '定位逾時，請稍後重試。'
    };
    setFlightStatus('restricted', 'GPS 定位失敗', messages[error.code] || '無法取得目前位置。');
  }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 });
}

async function handlePosition(position) {
  const { latitude, longitude, accuracy } = position.coords;
  const latlng = [latitude, longitude];
  const locationIcon = L.divIcon({ className: '', html: '<div class="user-location-marker"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });

  if (userMarker) userMarker.setLatLng(latlng);
  else userMarker = L.marker(latlng, { icon: locationIcon, zIndexOffset: 1000 }).addTo(droneMap).bindPopup('你的 GPS 位置');

  if (accuracyCircle) accuracyCircle.setLatLng(latlng).setRadius(accuracy);
  else accuracyCircle = L.circle(latlng, { radius: accuracy, color: '#1677e8', weight: 1, fillOpacity: .08 }).addTo(droneMap);

  droneMap.setView(latlng, Math.max(droneMap.getZoom(), 13));
  document.getElementById('coordinates').textContent = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  document.getElementById('gps-accuracy').textContent = Math.round(accuracy);

  evaluateOfficialZones(longitude, latitude);
  await fetchLocalWind(latitude, longitude);
}

function evaluateOfficialZones(longitude, latitude) {
  if (!permanentData || !temporaryData) {
    setFlightStatus('warning', '位置已取得，圖層仍在載入', '請稍候再按一次更新；同時使用官方 Drónakort 核對。');
    return;
  }

  const permanentHits = featuresAtPoint(permanentData.features, longitude, latitude);
  const temporaryHits = featuresAtPoint(temporaryData.features, longitude, latitude);
  const hits = [...temporaryHits, ...permanentHits];

  if (hits.length) {
    const names = [...new Set(hits.map(feature => feature.properties?.name).filter(Boolean))];
    setFlightStatus('restricted', '所在位置命中官方限制圖層', names.slice(0, 2).join('、') || '此處有特殊限制；點選地圖區域查看內容。');
    hits.forEach(feature => {
      // 將命中的官方區域帶到畫面；詳細規則仍由 popup 與官方來源呈現。
      L.geoJSON(feature).eachLayer(layer => layer.openPopup?.());
    });
  } else {
    setFlightStatus('warning', '官方圖層未命中限制區', '這不代表已獲准；仍須確認地主、保護區、臨時公告、NOTAM、人群與現場標示。');
  }
}

function featuresAtPoint(features, longitude, latitude) {
  return features.filter(feature => geometryContainsPoint(feature.geometry, longitude, latitude));
}

function geometryContainsPoint(geometry, longitude, latitude) {
  if (!geometry) return false;
  if (geometry.type === 'Polygon') return polygonContainsPoint(geometry.coordinates, longitude, latitude);
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.some(polygon => polygonContainsPoint(polygon, longitude, latitude));
  return false;
}

function polygonContainsPoint(rings, longitude, latitude) {
  if (!rings.length || !ringContainsPoint(rings[0], longitude, latitude)) return false;
  return !rings.slice(1).some(ring => ringContainsPoint(ring, longitude, latitude));
}

function ringContainsPoint(ring, longitude, latitude) {
  let inside = false;
  for (let current = 0, previous = ring.length - 1; current < ring.length; previous = current++) {
    const [currentX, currentY] = ring[current];
    const [previousX, previousY] = ring[previous];
    const crosses = (currentY > latitude) !== (previousY > latitude)
      && longitude < (previousX - currentX) * (latitude - currentY) / (previousY - currentY) + currentX;
    if (crosses) inside = !inside;
  }
  return inside;
}

async function fetchLocalWind(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,weather_code',
    wind_speed_unit: 'ms',
    timezone: 'Atlantic/Reykjavik'
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error(`Weather ${response.status}`);
    const data = await response.json();
    const current = data.current;
    document.getElementById('wind-speed').textContent = Number(current.wind_speed_10m).toFixed(1);
    document.getElementById('wind-gust').textContent = Number(current.wind_gusts_10m).toFixed(1);
    document.getElementById('wind-direction').textContent = degreesToCompass(current.wind_direction_10m);
    document.getElementById('wind-bearing').textContent = `${Math.round(current.wind_direction_10m)}°`;
    document.getElementById('weather-time').textContent = `風況 ${formatIcelandTime(current.time)} 更新`;
  } catch {
    document.getElementById('weather-time').textContent = '風況載入失敗，請查看冰島氣象局';
  }
}

function setFlightStatus(type, title, detail) {
  const element = document.getElementById('flight-status');
  element.className = `flight-status ${type}`;
  element.innerHTML = `<i data-lucide="${type === 'restricted' ? 'octagon-alert' : type === 'loading' ? 'loader-circle' : 'triangle-alert'}"></i><div><span>${escapeHtml(title)}</span><small>${escapeHtml(detail)}</small></div>`;
  if (window.lucide) window.lucide.createIcons();
}

function initCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    renderCategory(tab.dataset.tab);
  }));
  renderCategory('a1');
}

function renderCategory(key) {
  const info = CATEGORY_INFO[key];
  document.getElementById('category-panel').innerHTML = `<h3>${info.title}</h3><p>${info.text}</p><div class="class-tags">${info.tags.map(tag => `<span>${tag}</span>`).join('')}</div>`;
}

function renderPlaces() {
  const container = document.getElementById('place-grid');
  container.innerHTML = CONDITIONAL_PLACES.map((place, index) => `
    <button class="place-card" type="button" data-place="${index}">
      <span class="place-visual"><i data-lucide="${index === 1 ? 'waves' : index === 2 ? 'mountain' : index === 3 ? 'landmark' : 'snowflake'}"></i></span>
      <span class="place-body">
        <span class="place-meta">${place.source}</span>
        <h3>${place.zh}<br><small>${place.name}</small></h3>
        <p><strong>${place.window}</strong><br>${place.note}</p>
        <span class="place-action">在地圖查看 <i data-lucide="crosshair"></i></span>
      </span>
    </button>
  `).join('');

  container.querySelectorAll('.place-card').forEach(button => button.addEventListener('click', () => {
    const place = CONDITIONAL_PLACES[Number(button.dataset.place)];
    droneMap.setView([place.lat, place.lng], 14);
    L.popup().setLatLng([place.lat, place.lng]).setContent(`<strong>${place.zh}</strong><br>${place.window}<br>${place.note}`).openOn(droneMap);
    document.getElementById('map-title').scrollIntoView({ behavior: 'smooth' });
  }));
}

function initChecklist() {
  const storageKey = 'iceland-drone-preflight';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { saved = {}; }
  const checks = [...document.querySelectorAll('#preflight-checks input')];
  checks.forEach(check => {
    check.checked = Boolean(saved[check.dataset.check]);
    check.addEventListener('change', () => {
      saved[check.dataset.check] = check.checked;
      localStorage.setItem(storageKey, JSON.stringify(saved));
      updateChecklist(checks);
    });
  });
  updateChecklist(checks);
}

function updateChecklist(checks) {
  const done = checks.filter(check => check.checked).length;
  document.getElementById('check-progress-bar').style.width = `${done / checks.length * 100}%`;
  document.getElementById('check-progress-text').textContent = `${done} / ${checks.length} 已確認`;
}

function initFullscreen() {
  const shell = document.querySelector('.map-shell');
  const button = document.getElementById('map-fullscreen');
  button.addEventListener('click', async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else if (shell.requestFullscreen) {
      await shell.requestFullscreen();
    } else {
      shell.classList.toggle('map-expanded');
      button.innerHTML = `<i data-lucide="${shell.classList.contains('map-expanded') ? 'minimize' : 'maximize'}"></i>`;
      if (window.lucide) window.lucide.createIcons();
      setTimeout(() => droneMap.invalidateSize(), 50);
    }
  });
  document.addEventListener('fullscreenchange', () => {
    button.innerHTML = `<i data-lucide="${document.fullscreenElement ? 'minimize' : 'maximize'}"></i>`;
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => droneMap.invalidateSize(), 50);
  });
}

function parseJsonProperty(value) {
  if (!value || typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return null; }
}

function formatRestriction(value) {
  const labels = {
    PROHIBITED: '禁止飛行',
    REQ_AUTHORISATION: '需要授權',
    CONDITIONAL: '有條件限制'
  };
  return labels[value] || value || '特殊限制';
}

function degreesToCompass(degrees) {
  const directions = ['北', '東北', '東', '東南', '南', '西南', '西', '西北'];
  return directions[Math.round(Number(degrees) / 45) % 8];
}

function formatIcelandTime(value) {
  if (!value) return '--';
  return value.slice(5).replace('T', ' ');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[character]));
}

function initTripSpots() {
  const days = window.TRIP_DATA || [];
  tripSpots = days.flatMap(day => day.markers
    .filter(marker => TRIP_SPOT_RULES[marker.name])
    .map(marker => ({
      ...marker,
      day: day.day,
      date: day.date,
      baseRule: TRIP_SPOT_RULES[marker.name],
      officialHits: []
    })));

  document.querySelectorAll('.trip-filter').forEach(button => button.addEventListener('click', () => {
    activeTripFilter = button.dataset.filter;
    document.querySelectorAll('.trip-filter').forEach(item => item.classList.toggle('active', item === button));
    renderTripSpots();
  }));
  renderTripSpots();
}

function updateTripSpotOfficialHits() {
  if (!tripSpots.length) return;
  tripSpots.forEach(spot => {
    const permanentHits = permanentData ? featuresAtPoint(permanentData.features, spot.lng, spot.lat) : [];
    const temporaryHits = temporaryData ? featuresAtPoint(temporaryData.features, spot.lng, spot.lat) : [];
    spot.officialHits = [...temporaryHits, ...permanentHits];
  });
  renderTripSpots();
}

function getTripSpotStatus(spot) {
  if (spot.baseRule.status === 'blocked') return 'blocked';
  if (spot.baseRule.status === 'conditional' || spot.officialHits.length) return 'conditional';
  return 'review';
}

function getFilteredTripSpots() {
  if (activeTripFilter === 'all') return tripSpots;
  if (activeTripFilter === 'golden') return tripSpots.filter(spot => spot.baseRule.golden);
  return tripSpots.filter(spot => getTripSpotStatus(spot) === activeTripFilter);
}

function renderTripSpots() {
  if (!tripSpotLayer) return;
  const visible = getFilteredTripSpots();
  tripSpotLayer.clearLayers();

  visible.forEach(spot => {
    const status = getTripSpotStatus(spot);
    const marker = L.marker([spot.lat, spot.lng], {
      pane: 'tripSpots',
      icon: L.divIcon({
        className: 'trip-marker-wrap',
        html: `<div class="trip-marker ${status}" title="Day ${spot.day} ${escapeHtml(spot.name)}"><span>${spot.day}</span></div>`,
        iconSize: [32, 38],
        iconAnchor: [16, 36],
        popupAnchor: [0, -34]
      })
    }).bindPopup(buildTripSpotPopup(spot));
    marker.addTo(tripSpotLayer);
    spot.mapMarker = marker;
  });

  renderTripSummary();
  renderTripSpotList(visible);
}

function buildTripSpotPopup(spot) {
  const status = getTripSpotStatus(spot);
  const labels = { blocked: '休閒空拍禁止', conditional: '有條件／需授權', review: '依一般規則評估' };
  const official = spot.officialHits.length
    ? `<div class="trip-popup-official"><b>即時官方圖層命中：</b>${escapeHtml([...new Set(spot.officialHits.map(hit => hit.properties?.name).filter(Boolean))].join('、'))}</div>`
    : '<div class="trip-popup-clear">目前點位未命中官方 WFS；不代表自動獲准。</div>';
  return `
    <div class="trip-popup">
      <span class="trip-popup-day">Day ${spot.day} · ${escapeHtml(spot.date)}</span>
      <strong>${escapeHtml(spot.name)}</strong>
      <span class="trip-status ${status}">${labels[status]}</span>
      <p>${escapeHtml(spot.baseRule.detail)}</p>
      ${official}
      <a href="${escapeHtml(spot.baseRule.source)}" target="_blank" rel="noopener">查看判定來源 ↗</a>
    </div>`;
}

function renderTripSummary() {
  const counts = tripSpots.reduce((result, spot) => {
    result[getTripSpotStatus(spot)] += 1;
    return result;
  }, { blocked: 0, conditional: 0, review: 0 });
  document.getElementById('trip-summary').innerHTML = `
    <div><strong>${tripSpots.length}</strong><span>行程觀光點</span></div>
    <div class="blocked"><strong>${counts.blocked}</strong><span>休閒禁止</span></div>
    <div class="conditional"><strong>${counts.conditional}</strong><span>有條件／需授權</span></div>
    <div class="review"><strong>${counts.review}</strong><span>一般規則評估</span></div>`;
}

function renderTripSpotList(spots) {
  const labels = { blocked: '禁止', conditional: '有條件', review: '一般規則評估' };
  const grouped = Map.groupBy ? Map.groupBy(spots, spot => spot.day) : spots.reduce((map, spot) => {
    if (!map.has(spot.day)) map.set(spot.day, []);
    map.get(spot.day).push(spot);
    return map;
  }, new Map());

  document.getElementById('trip-spot-list').innerHTML = [...grouped.entries()].map(([day, daySpots]) => `
    <section class="trip-day-group">
      <header><span>DAY ${day}</span><small>${escapeHtml(daySpots[0].date)}</small></header>
      <div>
        ${daySpots.map(spot => {
          const status = getTripSpotStatus(spot);
          const officialBadge = spot.officialHits.length ? '<em>官方圖層命中</em>' : '';
          return `<button class="trip-spot-row" type="button" data-trip-day="${spot.day}" data-trip-name="${escapeHtml(spot.name)}">
            <span class="trip-row-status ${status}">${labels[status]}</span>
            <span class="trip-row-copy"><b>${escapeHtml(spot.name)}</b><small>${escapeHtml(spot.baseRule.detail)}</small>${officialBadge}</span>
            <i data-lucide="crosshair"></i>
          </button>`;
        }).join('')}
      </div>
    </section>`).join('') || '<p class="trip-empty">此篩選沒有景點。</p>';

  document.querySelectorAll('.trip-spot-row').forEach(button => button.addEventListener('click', () => {
    const spot = tripSpots.find(item => item.day === Number(button.dataset.tripDay) && item.name === button.dataset.tripName);
    if (!spot) return;
    droneMap.setView([spot.lat, spot.lng], 14);
    spot.mapMarker?.openPopup();
    document.getElementById('map-title').scrollIntoView({ behavior: 'smooth' });
  }));
  if (window.lucide) window.lucide.createIcons();
}