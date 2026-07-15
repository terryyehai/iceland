/* ===== data.js — 16 天行程單一資料來源（由原 day 頁自動抽取） ===== */
window.TRIP_DATA = [
  {
    "day": 1,
    "title": "啟程：飛往冰島",
    "theme": "啟程：飛往冰島 ✈️",
    "date": "8月1日（週六）",
    "meta": "8月1日（週六）・✈️ 出發",
    "color": "#2563eb",
    "map": {
      "lat": 25.07,
      "lng": 121.23,
      "zoom": 4
    },
    "markers": [
      {
        "name": "TPE 機場",
        "lat": 25.079,
        "lng": 121.234,
        "c": "#ef4444"
      }
    ],
    "spots": [
      {
        "time": "🛫 18:10",
        "title": "搭乘 CI923 飛往香港 (HKG)",
        "desc": "從台北 (TPE) 出發，展開冰島之旅！",
        "nav": "https://www.google.com/maps/search/?api=1&query=%E6%90%AD%E4%B9%98%20CI923%20%E9%A3%9B%E5%BE%80%E9%A6%99%E6%B8%AF%20(HKG)%20Iceland",
        "tags": [
          "✈️ 出發",
          "🇹🇼 台北"
        ],
        "speak": "從台北 (TPE) 出發，展開冰島之旅！"
      },
      {
        "time": "🛬 20:05",
        "title": "抵達香港轉機",
        "desc": "抵達香港。",
        "nav": "https://www.google.com/maps/search/?api=1&query=%E6%8A%B5%E9%81%94%E9%A6%99%E6%B8%AF%E8%BD%89%E6%A9%9F%20Iceland",
        "tags": [
          "🇭🇰 香港"
        ],
        "speak": "抵達香港。"
      },
      {
        "time": "🛫 23:25",
        "title": "搭乘 LH797 飛往法蘭克福 (FRA)",
        "desc": "搭乘漢莎航空前往歐洲樞紐法蘭克福，在機上好好休息。",
        "nav": "https://www.google.com/maps/search/?api=1&query=%E6%90%AD%E4%B9%98%20LH797%20%E9%A3%9B%E5%BE%80%E6%B3%95%E8%98%AD%E5%85%8B%E7%A6%8F%20(FRA)%20Iceland",
        "tags": [
          "✈️ 長途飛行"
        ],
        "speak": "搭乘漢莎航空前往歐洲樞紐法蘭克福，在機上好好休息。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "機上休息",
      "desc": "✈️ 飛往歐洲<br>🛏️ 第 1 晚"
    },
    "tips": [
      "請確認護照效期大於 6 個月，且已攜帶行程單。",
      "機上冷氣可能較強，建議隨身攜帶薄外套。"
    ],
    "prev": null,
    "next": {
      "href": "day2.html",
      "label": "Day 2 · 抵達冰島與夢幻藍湖"
    }
  },
  {
    "day": 2,
    "title": "抵達冰島與夢幻藍湖",
    "theme": "抵達冰島與夢幻藍湖 💎",
    "date": "8月2日（週日）",
    "meta": "8月2日（週日）・🇮🇸 抵達",
    "color": "#f59e0b",
    "map": {
      "lat": 64.02,
      "lng": -22,
      "zoom": 9
    },
    "markers": [
      {
        "name": "KEF 機場",
        "lat": 63.985,
        "lng": -22.606,
        "c": "#ef4444"
      },
      {
        "name": "藍湖 Blue Lagoon",
        "lat": 63.8804,
        "lng": -22.4495,
        "c": "#06b6d4"
      },
      {
        "name": "Krónan Mosfellsbær",
        "lat": 64.1655,
        "lng": -21.6952,
        "c": "#f59e0b"
      },
      {
        "name": "Brekkutangi 民宿",
        "lat": 64.1672,
        "lng": -21.7005,
        "c": "#10b981"
      }
    ],
    "spots": [
      {
        "time": "🛬 06:55",
        "title": "抵達法蘭克福 (FRA) 轉機",
        "desc": "抵達法蘭克福，準備轉乘前往冰島的班機。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Frankfurt%20Airport%20FRA%20Iceland",
        "tags": [
          "🇩🇪 德國",
          "☕ 早餐"
        ],
        "speak": "抵達法蘭克福，準備轉乘前往冰島的班機。"
      },
      {
        "time": "🛫 11:10",
        "title": "搭乘 LH844 飛往冰島 (KEF)",
        "desc": "飛往世界的盡頭。",
        "nav": "https://www.google.com/maps/search/?api=1&query=LH844%20Frankfurt%20to%20Keflavik%20Iceland",
        "tags": [
          "✈️ 冰島航班"
        ],
        "speak": "飛往世界的盡頭。"
      },
      {
        "time": "🛬 12:55",
        "title": "降落 KEF 機場・租車接駁巴士",
        "desc": "辦理入境、提領行李後走出航廈，搭乘免費租車接駁巴士前往 Lotus 租車辦公室（車程約 3-5 分鐘）。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Keflavik%20Airport%20Rental%20Car%20Shuttle%20Iceland",
        "tags": [
          "🇮🇸 抵達冰島",
          "🚌 接駁"
        ],
        "speak": "LH844 班機降落 KEF，辦理入境提領行李後，走出航廈搭乘印有租車公司 Logo 的免費接駁巴士，前往 Lotus 租車辦公室，車程約 3-5 分鐘。"
      },
      {
        "time": "🚗 14:00",
        "title": "Lotus 取車手續（兩部 SUV）",
        "desc": "兩位主駕駛同時在不同櫃檯辦理取車，檢查車身外觀、拍照存證、清點保險，隨後在門前專屬大型免費停車場整裝出發。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Lotus%20Car%20Rental%20Flugvellir%206%20Iceland",
        "tags": [
          "🚗 取車",
          "🆓 免費停車"
        ],
        "speak": "兩部 SUV 建議兵分兩路同時辦理取車，仔細檢查車身外觀並拍照存證，辦妥後在專屬免費停車場調整座椅與導航。"
      },
      {
        "time": "♨️ 15:00",
        "title": "夢幻洗塵：藍湖溫泉（15:00-18:00）",
        "desc": "建議預約 15:00 或 15:30 場次，泡進乳藍色溫泉一秒回血，敷矽泥面膜、喝免費飲品，結束後洗個熱水澡徹底充電。步行約 5 分鐘的黑熔岩步道即達主建築。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Blue%20Lagoon%20Iceland",
        "tags": [
          "💎 藍湖",
          "💆 泥膜"
        ],
        "speak": "沿 41 號轉 43 號公路穿越黑熔岩地約 20-25 分鐘抵達。剛下飛機的僵硬身體一秒回血，記得敷白矽泥面膜、喝免費飲品拍第一張大合照。"
      },
      {
        "time": "🛒 19:00",
        "title": "Krónan Mosfellsbær 超市大補給",
        "desc": "週日 Bónus 提早 18:00 打烊，Krónan 照常營業到 21:00 且生鮮更齊全。必買 Skyr 優格、吐司、火腿雞蛋、零食水果與飲用水。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Kronan%20Mosfellsbaer%20Bjarkarholti%20Iceland",
        "tags": [
          "🛒 採買",
          "🥛 Skyr"
        ],
        "speak": "週日 Bónus 提早關門，但 Krónan Mosfellsbær 營業到 21:00。必買 Skyr 優格、吐司火腿雞蛋與零食水果，作為環島首日補給。"
      },
      {
        "time": "🍽️ 19:45",
        "title": "晚餐：BLIK Bistro & Grill",
        "desc": "海濱高爾夫球會所內的隱藏版 Bistro，落地窗遠眺大西洋與夕陽。推薦烤羊肉小漢堡、現煎鮮魚與牛肉漢堡，備有大型免費停車場。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Blik%20Bistro%20Aedarhofdi%2036%20Mosfellsbaer%20Iceland",
        "tags": [
          "🍽️ 晚餐",
          "🌅 海景"
        ],
        "speak": "本地評價極高的高爾夫球會會所餐廳，落地窗可遠眺大西洋與夕陽，推薦烤羊肉小漢堡與現煎鮮魚。"
      },
      {
        "time": "🏨 21:15",
        "title": "Check-in：Brekkutangi 民宿",
        "desc": "開車 3-5 分鐘抵達，卸下行李、冷藏食品入冰箱。可直接停在私人前院車道，或合法免費順向停在路邊，治安非常安全。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Brekkutangi%20Mosfellsbaer%20Iceland",
        "tags": [
          "🏨 Check-in",
          "🅿️ 免費車道"
        ],
        "speak": "開車 3-5 分鐘抵達民宿，卸下行李並將冷藏食品放進冰箱，可直接停在私人車道或順向停在路邊。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Brekkutangi 民宿（Mosfellsbær）",
      "desc": "📍 Mosfellsbær 安靜住宅區<br>🛏️ 第 2 晚<br>🅿️ 私人車道或路邊免費停車"
    },
    "tips": [
      "藍湖門票務必提前 3-6 個月預約 17:00 前後熱門時段，晚訂容易被搶空。",
      "兩部 SUV 可分工：一車泡湯、一車留市區逛街，傍晚在餐廳會合，發揮雙車彈性。",
      "租車、藍湖、超市、餐廳與民宿沿途停車全部免費，安心停放即可。"
    ],
    "prev": "day1.html",
    "next": {
      "href": "day3.html",
      "label": "Day 3 · 黃金圈與絲浮拉浮潛"
    }
  },
  {
    "day": 3,
    "title": "黃金圈與絲浮拉浮潛",
    "theme": "黃金圈與絲浮拉浮潛 🤿",
    "date": "8月3日（週一）",
    "meta": "8月3日（週一）・🏛️ 世界遺產",
    "color": "#10b981",
    "map": {
      "lat": 64.15,
      "lng": -20.6,
      "zoom": 8
    },
    "markers": [
      {
        "name": "辛格韋德利 Silfra",
        "lat": 64.2559,
        "lng": -21.1129,
        "c": "#10b981"
      },
      {
        "name": "Efstidalur II",
        "lat": 64.2925,
        "lng": -20.3875,
        "c": "#f59e0b"
      },
      {
        "name": "Geysir",
        "lat": 64.3145,
        "lng": -20.3021,
        "c": "#f59e0b"
      },
      {
        "name": "Gullfoss",
        "lat": 64.3271,
        "lng": -20.1199,
        "c": "#2563eb"
      },
      {
        "name": "Kerið",
        "lat": 64.0417,
        "lng": -20.8862,
        "c": "#ef4444"
      },
      {
        "name": "Vatnsholt",
        "lat": 63.8802,
        "lng": -20.7884,
        "c": "#8b5cf6"
      }
    ],
    "spots": [
      {
        "time": "🚗 08:15",
        "title": "出發前往辛格韋德利 P5 停車場",
        "desc": "從 Mosfellsbær 直接切入 36 號公路，不經市區路況極佳，約 35-40 分鐘抵達 Silfra 浮潛集合點 P5 停車場。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Thingvellir%20P5%20Parking%20Iceland",
        "tags": [
          "🏛️ 世界遺產",
          "🚗 自駕"
        ],
        "speak": "從 Mosfellsbær 走 36 號公路，不經市區，車程約 35-40 分鐘抵達 P5 停車場。"
      },
      {
        "time": "🤿 09:15",
        "title": "Silfra 絲浮拉裂縫大板塊浮潛",
        "desc": "Arctic Adventures 嚮導帶領穿上乾式潛水衣，漂浮於北美與歐亞板塊之間，體驗能見度破百公尺的冰川融水，活動長度約 3 小時。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Silfra%20Fissure%20Snorkeling%20Iceland",
        "tags": [
          "🤿 板塊浮潛",
          "🌍 板塊裂縫"
        ],
        "speak": "穿上乾式潛水衣，漂浮在北美與歐亞板塊間，體驗能見度破百公尺的冰川融水。活動長度 3 小時。"
      },
      {
        "time": "🚶 12:15",
        "title": "辛格韋德利國家公園深度漫步",
        "desc": "浮潛結束喝杯熱可可，沿 Almannagjá 峽谷健行到 Öxarárfoss 瀑布，經 Lögberg 法律石與 Þingvallakirkja 小教堂，來回約 3.5-4 公里，停留 1.5 小時。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Almannagja%20Thingvellir%20Iceland",
        "tags": [
          "🥾 健行",
          "🌊 瀑布"
        ],
        "speak": "沿 Almannagjá 峽谷健行到 Öxarárfoss 瀑布，來回約 3.5-4 公里，停留 1.5 小時。"
      },
      {
        "time": "🍽️ 13:45",
        "title": "午餐：Efstidalur II 酪農場餐廳",
        "desc": "穀倉改建的景觀餐廳，一邊看著牛群一邊享用農場牛肉漢堡，餐後別忘了點一球現做鮮乳義式冰淇淋。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Efstidalur%20II%20Iceland",
        "tags": [
          "🍔 農場漢堡",
          "🍦 鮮乳冰淇淋"
        ],
        "speak": "一邊看牛群一邊吃農場漢堡與極致鮮乳冰淇淋，避開中午觀光團尖峰。"
      },
      {
        "time": "⛲ 15:20",
        "title": "Geysir 間歇泉地熱區",
        "desc": "觀賞每隔 5-10 分鐘劇烈噴發 20-30 公尺高的 Strokkur 間歇泉，停留 45 分鐘可捕捉 3-4 次噴發瞬間。停車 1,000 ISK / 輛，門票免費。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Geysir%20Iceland",
        "tags": [
          "⛲ 間歇泉",
          "📸 打卡"
        ],
        "speak": "Strokkur 間歇泉每 5-10 分鐘噴發一次，停留 45 分鐘可看 3-4 次噴發。"
      },
      {
        "time": "🌊 16:20",
        "title": "黃金瀑布 Gullfoss",
        "desc": "沿無障礙步道走到觀景台，俯瞰雙層冰川瀑布奔騰入峽谷，傍晚 5 點左右光線最美、最易出現彩虹。上層停車場完全免費。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Gullfoss%20Iceland",
        "tags": [
          "🌊 瀑布",
          "🌈 彩虹"
        ],
        "speak": "無障礙步道走到觀景台，俯瞰雙層冰川瀑布，傍晚光線最容易出現彩虹。"
      },
      {
        "time": "🌋 17:15",
        "title": "夕陽序曲：Kerið 火口湖",
        "desc": "擁有 6,500 年歷史的火山口湖，鮮豔火山紅岩壁鑲嵌著藍綠色湖水，此時遊覽團已散去可悠閒繞行。門票 700 ISK/人，停車免費。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Kerid%20Crater%20Iceland",
        "tags": [
          "🌋 火山口湖"
        ],
        "speak": "6500 年歷史的火山紅岩壁包圍藍綠色湖水，此時遊覽車已散去非常悠閒。"
      },
      {
        "time": "🛒 18:45",
        "title": "Selfoss 市區：生活雜貨大補給",
        "desc": "開車 15 分鐘進 Selfoss 市區，Bónus 與 Krónan 就開在斜對面，45 分鐘採買接下來幾天自駕所需的食物、水果與早餐物資。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Selfoss%20Supermarket%20Iceland",
        "tags": [
          "🛒 採買"
        ],
        "speak": "利用 45 分鐘採買接下來公路自駕所需的食物與早餐物資。"
      },
      {
        "time": "🍽️ 19:45",
        "title": "晚餐：Riverside Restaurant（Selfoss）",
        "desc": "位於 Hotel Selfoss 內，窗外緊鄰奧爾富斯河，推薦低溫慢燉羊排、煎北極紅點鮭與北歐海鮮湯，人均約 5,500-8,500 ISK。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Riverside%20Restaurant%20Hotel%20Selfoss%20Iceland",
        "tags": [
          "🍽️ 晚餐",
          "🐟 紅點鮭"
        ],
        "speak": "窗外緊鄰奧爾富斯河，提供低溫慢燉羊排與北極紅點鮭。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Vatnsholt 田野度假別墅",
      "desc": "📍 Selfoss 東側鄉間<br>🛏️ 第 3 晚<br>🚗 距 Selfoss 車程約 12-15 分鐘"
    },
    "tips": [
      "Silfra 浮潛為預約制，09:15 前務必抵達 P5 停車場報到，停車費一般 SUV 1,000 ISK/輛。",
      "Gullfoss 瀑布霧氣大，記得穿防水外套；Geysir、Kerið 皆可用信用卡或 Parka App 繳停車費。",
      "離開 Selfoss 前請先加滿油，進入東邊鄉間小路後加油站較不密集。"
    ],
    "prev": "day2.html",
    "next": {
      "href": "day4.html",
      "label": "Day 4 · 南岸瀑布與冰川探索"
    }
  },
  {
    "day": 4,
    "title": "南岸瀑布與冰川探索",
    "theme": "南岸瀑布與冰川探索 🖤",
    "date": "8月4日（週二）",
    "meta": "8月4日（週二）・✈️ 飛機殘骸",
    "color": "#1e293b",
    "map": {
      "lat": 63.55,
      "lng": -19.5,
      "zoom": 9
    },
    "markers": [
      {
        "name": "Seljalandsfoss",
        "lat": 63.6156,
        "lng": -19.9886,
        "c": "#10b981"
      },
      {
        "name": "Skógafoss",
        "lat": 63.5321,
        "lng": -19.5113,
        "c": "#2563eb"
      },
      {
        "name": "Sólheimajökull",
        "lat": 63.5333,
        "lng": -19.3667,
        "c": "#06b6d4"
      },
      {
        "name": "飛機殘骸",
        "lat": 63.4587,
        "lng": -19.3654,
        "c": "#64748b"
      },
      {
        "name": "Dyrhólaey",
        "lat": 63.4023,
        "lng": -19.1252,
        "c": "#1e293b"
      },
      {
        "name": "Hvolsvöllur",
        "lat": 63.7526,
        "lng": -20.2261,
        "c": "#f59e0b"
      }
    ],
    "spots": [
      {
        "time": "🚶 08:30",
        "title": "Seljalandsfoss 塞里雅蘭瀑布（1.5h）",
        "desc": "著名的水濂洞瀑布，可以走到瀑布後方欣賞。步道較濕滑，建議穿著防水外套。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Seljalandsfoss%20Iceland",
        "tags": [
          "🌊 瀑布",
          "📸 打卡"
        ],
        "speak": "著名的水濂洞瀑布，可以走到瀑布後方，步道較濕滑建議穿防水外套。"
      },
      {
        "time": "🚶 10:30",
        "title": "Skógafoss 斯科加爾瀑布（1h）",
        "desc": "壯闊的彩虹瀑布，可爬上階梯從高處俯瞰全景。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Skogafoss%20Iceland",
        "tags": [
          "🌈 瀑布"
        ],
        "speak": "壯闊的彩虹瀑布，可爬階梯從高處俯瞰。"
      },
      {
        "time": "🧊 11:45",
        "title": "Sólheimajökull 索爾黑馬冰川（1.5h）",
        "desc": "從瀑布開車約 15 分鐘抵達。即使不參加深度健行導覽，也能沿步道走到冰舌前緣，近距離觀察冰川與冰蝕湖的藍白奇觀。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Solheimajokull%20Glacier%20Iceland",
        "tags": [
          "🏔️ 冰川",
          "🥾 步道"
        ],
        "speak": "沿著步道走到冰舌前緣，近距離觀察冰川與冰蝕湖的藍白奇觀。"
      },
      {
        "time": "✈️ 14:30",
        "title": "Sólheimasandur 飛機殘骸（2.5h）",
        "desc": "冰島最具代表性的荒涼美景之一。強烈建議搭乘接駁巴士往返（約 15-20 分鐘），單程步行需 45-60 分鐘。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Solheimasandur%20Plane%20Wreck%20Iceland",
        "tags": [
          "✈️ 飛機殘骸",
          "🚌 接駁巴士"
        ],
        "speak": "冰島最具代表性的荒涼美景之一，強烈建議搭乘接駁巴士往返以節省體力。"
      },
      {
        "time": "🐧 17:30",
        "title": "Dyrhólaey 燈塔與海蝕洞（1h）",
        "desc": "從高處俯瞰黑沙灘與大西洋，8 月份這裡也有極高機率看到 Puffin（海鸚）。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Dyrholaey%20Iceland",
        "tags": [
          "🐧 Puffin",
          "⛰️ 懸崖"
        ],
        "speak": "從高處俯瞰黑沙灘與大西洋，8 月份有極高機率看到 Puffin 海鸚。"
      },
      {
        "time": "🏨 19:00",
        "title": "抵達 Syðri-Rot 住宿（Hvolsvöllur）",
        "desc": "從 Dyrhólaey 往回開約 50 分鐘即可到達，方便隔天一早前往 Landeyjahöfn 港口搭船去西人島。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Hvolsvollur%20Iceland",
        "tags": [
          "🏨 Check-in"
        ],
        "speak": "住宿點位於 Hvolsvöllur 附近，方便隔天前往西人島搭船。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Syðri-Rot 民宿（Hvolsvöllur 附近）",
      "desc": "📍 Hvolsvöllur 周邊<br>🛏️ 第 4 晚（連住 2 晚）<br>💡 方便隔天搭船前往西人島"
    },
    "tips": [
      "建議 08:30 準時出發，能避開第一波大型遊覽車團體，各景點都更悠閒。",
      "飛機殘骸建議搭接駁巴士往返，節省體力給隔天的西人島行程。"
    ],
    "prev": "day3.html",
    "next": {
      "href": "day5.html",
      "label": "Day 5 · 西人島海陸探險"
    }
  },
  {
    "day": 5,
    "title": "西人島海陸探險",
    "theme": "西人島海陸探險 🐧",
    "date": "8月5日（週三）",
    "meta": "8月5日（週三）・⛵ 既輪登島",
    "color": "#06b6d4",
    "map": {
      "lat": 63.6,
      "lng": -20,
      "zoom": 9
    },
    "markers": [
      {
        "name": "Landeyjahöfn",
        "lat": 63.5333,
        "lng": -20.1667,
        "c": "#2563eb"
      },
      {
        "name": "Heimaey 港口",
        "lat": 63.4427,
        "lng": -20.2734,
        "c": "#06b6d4"
      },
      {
        "name": "Eldheimar",
        "lat": 63.435,
        "lng": -20.276,
        "c": "#ef4444"
      },
      {
        "name": "Stórhöfði",
        "lat": 63.3997,
        "lng": -20.2886,
        "c": "#8b5cf6"
      },
      {
        "name": "Hvolsvöllur",
        "lat": 63.7526,
        "lng": -20.2261,
        "c": "#f59e0b"
      }
    ],
    "spots": [
      {
        "time": "🚗 08:45",
        "title": "前往 Landeyjahöfn 渡輪碼頭",
        "desc": "沿 1 號轉 254 號公路開往港口，兩部 SUV 需提早 45 分鐘依序排隊駛入渡輪底艙。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Landeyjahofn%20Ferry%20Port%20Iceland",
        "tags": [
          "⛴️ 渡輪",
          "🚗 車隊"
        ],
        "speak": "沿 1 號公路轉 254 號公路前往港口，兩部 SUV 需提早 45 分鐘排隊登船。"
      },
      {
        "time": "⛴️ 10:00",
        "title": "渡輪啟航：開往西人島 Heimaey",
        "desc": "航程約 45 分鐘，把車停妥後上甲板休息，晴天時可回望南岸大冰川與西人島宏偉的火山斷崖。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Heimaey%20Harbour%20Iceland",
        "tags": [
          "⛴️ 航行",
          "🌋 火山斷崖"
        ],
        "speak": "航程約 45 分鐘，晴天時可回望南岸大冰川，看著西人島火山斷崖逐漸放大。"
      },
      {
        "time": "🚤 11:30",
        "title": "RIB 衝鋒快艇探險（2h）",
        "desc": "11:30 碼頭報到，換上厚實防風防水連身保暖衣，以極近的上帝視角穿梭海蝕洞間，仰望巨大的象鼻岩 Elephant Rock。",
        "nav": "https://www.google.com/maps/search/?api=1&query=RIB%20Boat%20Tour%20Vestmannaeyjar%20Iceland",
        "tags": [
          "🚤 快艇",
          "🐘 象鼻岩"
        ],
        "speak": "換上防風防水連身保暖衣出海，以上帝視角穿梭海蝕洞，仰望巨大的象鼻岩。"
      },
      {
        "time": "🍽️ 14:00",
        "title": "午餐：Tanginn（1.5h）",
        "desc": "就在港口邊，走路 2 分鐘就到。招牌魚湯（Fish Soup）在島上非常有名，也有大份量漢堡與三明治，出餐快適合補充體力。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Tanginn%20Restaurant%20Vestmannaeyjar%20Iceland",
        "tags": [
          "🐟 魚湯",
          "🍔 漢堡"
        ],
        "speak": "就在快艇上岸碼頭旁，魚湯與大份量漢堡三明治極適合補充體力。"
      },
      {
        "time": "🌋 15:30",
        "title": "Eldfell 火山與 Eldheimar 龐貝博物館（2h）",
        "desc": "此時海鸚都在外海捕魚，正好開車探索 1973 年爆發的 Eldfell 火山錐，或參觀令人動容的火山龐貝博物館 Eldheimar。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Eldheimar%20Museum%20Vestmannaeyjar%20Iceland",
        "tags": [
          "🌋 火山",
          "🏛️ 博物館"
        ],
        "speak": "欣賞 1973 年爆發的焦紅色火山地貌，參觀被火山灰掩埋的真實房屋。"
      },
      {
        "time": "🐧 17:45",
        "title": "Stórhöfði 岬角：海鸚大回巢（1.5h）",
        "desc": "傍晚是最佳生態時段，無數海鸚媽媽陸續飛回崖邊餵食幼鳥，可躲進木造觀鳥屋近距離捕捉牠們叼滿小魚的萌樣。此處風勢強勁，請務必保暖。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Storhofdi%20Puffin%20Viewing%20Iceland",
        "tags": [
          "🐧 海鸚",
          "🌬️ 強風"
        ],
        "speak": "無數海鸚媽媽陸續飛回崖邊餵食幼鳥，可躲進木造觀鳥屋近距離捕捉萌樣。"
      },
      {
        "time": "🍽️ 19:30",
        "title": "晚餐：Slippurinn（1.5h）",
        "desc": "舊船廠改建的島上頂級美食地標，將當季新鮮漁獲與海島野生香草結合，記得提早網上訂位。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Slippurinn%20Restaurant%20Vestmannaeyjar%20Iceland",
        "tags": [
          "🍽️ 精緻料理",
          "📅 需訂位"
        ],
        "speak": "舊船廠改建的餐廳，將當季新鮮漁獲與海島野生香草結合，是島上頂級美食地標。"
      },
      {
        "time": "⛴️ 21:00",
        "title": "回程渡輪・返抵 Syðri-Rot 住處",
        "desc": "車隊排隊登上晚班渡輪，航程約 45 分鐘返回 Landeyjahöfn，再開車 25-30 分鐘安全返抵同一住處。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Hvolsvollur%20Iceland",
        "tags": [
          "⛴️ 夜航",
          "🏨 返程"
        ],
        "speak": "搭乘晚班渡輪返回 Landeyjahöfn，再開車 25-30 分鐘返抵住處。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Syðri-Rot 民宿（Hvolsvöllur 附近）",
      "desc": "📍 Hvolsvöllur 周邊<br>🛏️ 第 5 晚（連住第 2 晚）"
    },
    "tips": [
      "兩部 SUV 需提早 45 分鐘到港口報到排隊登船，去程與回程皆同。",
      "Stórhöfði 即使 8 月也風勢強勁又寒冷，請攜帶毛帽與防風外套。",
      "Slippurinn 晚餐熱門，請提前數週上官網訂位。"
    ],
    "prev": "day4.html",
    "next": {
      "href": "day6.html",
      "label": "Day 6 · 黑沙灘騎馬與雙冰河湖"
    }
  },
  {
    "day": 6,
    "title": "黑沙灘騎馬與雙冰河湖",
    "theme": "黑沙灘騎馬與雙冰河湖 🐎",
    "date": "8月6日（週四）",
    "meta": "8月6日（週四）・🦞 龍虽小鎮",
    "color": "#8b5cf6",
    "map": {
      "lat": 64.1,
      "lng": -16.8,
      "zoom": 8
    },
    "markers": [
      {
        "name": "Vík 騎馬場",
        "lat": 63.4186,
        "lng": -19.006,
        "c": "#f59e0b"
      },
      {
        "name": "Fjaðrárgljúfur",
        "lat": 63.7722,
        "lng": -18.1719,
        "c": "#10b981"
      },
      {
        "name": "Fjallsárlón",
        "lat": 64.0114,
        "lng": -16.3813,
        "c": "#06b6d4"
      },
      {
        "name": "Jökulsárlón",
        "lat": 64.0784,
        "lng": -16.2298,
        "c": "#2563eb"
      },
      {
        "name": "Höfn",
        "lat": 64.2539,
        "lng": -15.2082,
        "c": "#ef4444"
      }
    ],
    "spots": [
      {
        "time": "🚗 07:45",
        "title": "出發：長征東南部前往維克 Vík",
        "desc": "兩輛 SUV 迎著晨光出發，沿 1 號公路一路向東切往維克小鎮，車程約 55 分鐘，途經斯科加瀑布周邊路況筆直開闊。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Vik%20Iceland",
        "tags": [
          "🚗 自駕"
        ],
        "speak": "沿 1 號公路一路向東切往維克小鎮，車程約 55 分鐘。"
      },
      {
        "time": "🐴 09:00",
        "title": "黑沙灘野性騎馬體驗（1h）",
        "desc": "在維克鎮附近馬場集合，騎上步伐平穩的純種冰島馬，踏上玄武岩黑沙灘，伴著大西洋白浪與遠處雷尼斯岩柱漫步。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Vik%20Horse%20Riding%20Black%20Sand%20Beach%20Iceland",
        "tags": [
          "🐴 冰島馬",
          "🏖️ 黑沙灘"
        ],
        "speak": "騎上冰島馬踏上玄武岩黑沙灘，伴著大西洋白浪與遠處的雷尼斯岩柱漫步。"
      },
      {
        "time": "🏞️ 11:30",
        "title": "午餐與 Fjaðrárgljúfur 羽毛峽谷（2h）",
        "desc": "先在 Kirkjubæjarklaustur 的 Systrakaffi 享用羊肉漢堡，再切入 206 號公路探訪擁有兩百萬年歷史、深 100 公尺的羽毛峽谷，沿步道往返約 30-45 分鐘。停車 1,000 ISK/輛，門票免費。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Fjadrargljufur%20Canyon%20Iceland",
        "tags": [
          "🏞️ 峽谷",
          "🍔 午餐"
        ],
        "speak": "兩百萬年歷史、深 100 公尺的巨大峽谷，沿步道走到觀景台約 30-45 分鐘來回。"
      },
      {
        "time": "🧊 14:55",
        "title": "Fjallsárlón 小冰河湖（45min）",
        "desc": "冰河湖的「靜謐姊妹」，冰川主體離岸邊很近、視覺震撼卻遊客少 80%。免費停車場步行 3-5 分鐘即達觀景小丘。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Fjallsarlon%20Glacier%20Lagoon%20Iceland",
        "tags": [
          "🧊 冰河湖",
          "🆓 免費停車"
        ],
        "speak": "從免費停車場步行 3-5 分鐘爬上小丘，就能俯瞰整個冰河湖，遊客較少更加靜謐。"
      },
      {
        "time": "💎 15:50",
        "title": "Jökulsárlón 冰河湖與鑽石海灘（50min）",
        "desc": "先到對面 Diamond Beach 看被海浪沖上黑沙灘、晶瑩剔透的巨冰，再走回湖畔看幽藍冰山靜靜漂浮，停車費全區通用 1,000 ISK/輛。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Jokulsarlon%20Diamond%20Beach%20Iceland",
        "tags": [
          "💎 鑽石沙灘",
          "🧊 冰河湖"
        ],
        "speak": "先去對面黑沙灘看如鑽石般晶瑩的巨冰，再走回湖畔看幽藍冰山漂浮。"
      },
      {
        "time": "🚤 16:40",
        "title": "冰河湖船遊（1h 15min）",
        "desc": "16:40 櫃檯報到，17:10 準時登船，搭乘專用船隻穿梭在絕美藍光的千年冰山之間，甚至有機會觸摸並品嚐萬年冰川冰。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Jokulsarlon%20Boat%20Tour%20Iceland",
        "tags": [
          "🚤 遊船",
          "🧊 千年冰山"
        ],
        "speak": "搭乘專用船隻駛入冰河湖中心，穿梭在絕美藍光的千年冰山之間，甚至能觸摸並品嚐萬年冰川冰。"
      },
      {
        "time": "🦞 19:30",
        "title": "向 Höfn 龍蝦鎮前進・晚餐 Pakkhús",
        "desc": "車程約 1 小時抵達赫本 Höfn，享用招牌鐵板小龍蝦（Langoustine），肉質緊實鮮甜搭配大蒜奶油，這趟自駕最難忘的一餐。之後入住 Höfn 住處。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Pakkhus%20Restaurant%20Hofn%20Iceland",
        "tags": [
          "🦞 龍蝦",
          "🏨 Check-in"
        ],
        "speak": "抵達赫本後享用招牌鐵板小龍蝦，肉質緊實鮮甜，搭配大蒜奶油。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Höfn 赫本小鎮住宿",
      "desc": "📍 龍蝦之都<br>🛏️ 第 6 晚（連住 2 晚）"
    },
    "tips": [
      "先看 Fjallsárlón 再看 Jökulsárlón，可避免走回頭路，視覺層次也更豐富。",
      "冰河湖船遊 17:10 準時登船，請提早報到；停車費全區通用不需重複繳費。",
      "Pakkhús 不接受預約，抵達小鎮可先派一位隊友去現場登記候位。"
    ],
    "prev": "day5.html",
    "next": {
      "href": "day7.html",
      "label": "Day 7 · 蝙蝠山與冰川裂縫健行"
    }
  },
  {
    "day": 7,
    "title": "蝙蝠山與冰川裂縫健行",
    "theme": "蝙蝠山與冰川裂縫健行 🧊",
    "date": "8月7日（週五）",
    "meta": "8月7日（週五）・🥾 冰川健行",
    "color": "#3b82f6",
    "map": {
      "lat": 64.15,
      "lng": -16,
      "zoom": 9
    },
    "markers": [
      {
        "name": "Vestrahorn",
        "lat": 64.2497,
        "lng": -14.9743,
        "c": "#f59e0b"
      },
      {
        "name": "Skaftafell",
        "lat": 64.0169,
        "lng": -16.9666,
        "c": "#3b82f6"
      },
      {
        "name": "Höfn",
        "lat": 64.2539,
        "lng": -15.2082,
        "c": "#ef4444"
      }
    ],
    "spots": [
      {
        "time": "🌄 08:00",
        "title": "Vestrahorn 蝙蝠山與維京村落（1h 15min）",
        "desc": "從赫本出發約 15 分鐘，抵達 Viking Cafe 購票。清晨風力最小、海面最平靜，黑沙灘積水最容易折射出天空之鏡倒影，也可順路參觀維京人村落片場。門票約 1,000-1,200 ISK/人。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Vestrahorn%20Viking%20Cafe%20Iceland",
        "tags": [
          "🪞 天空之鏡",
          "🏔️ 蝙蝠山"
        ],
        "speak": "清晨風力最小、海面最平靜，潮水退去後黑沙灘容易折射出完美倒影。"
      },
      {
        "time": "🚗 09:30",
        "title": "大長征：Vestrahorn → Skaftafell（2h）",
        "desc": "兩部 SUV 駛回 1 號公路向西大長征，途中再次經過冰河湖區域，一邊開車一邊欣賞右手邊宏偉的瓦特納冰舌。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Skaftafell%20National%20Park%20Iceland",
        "tags": [
          "🚗 長途自駕"
        ],
        "speak": "沿 1 號公路一路向西，車程約 2 小時，再次經過冰河湖區域。"
      },
      {
        "time": "🍽️ 11:30",
        "title": "午餐蓄能：Skaftafell 國家公園",
        "desc": "抵達主停車場，為應付下午 4 小時高強度健行，推薦 Glacier Goodies 餐車的現炸魚薯條或大漢堡，吃飽再出發。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Skaftafell%20Visitor%20Center%20Iceland",
        "tags": [
          "🍟 魚薯條",
          "🅿️ 主停車場"
        ],
        "speak": "在遊客中心外的餐車購買熱騰騰的現炸魚薯條或大漢堡，為下午健行儲備體力。"
      },
      {
        "time": "🥾 13:10",
        "title": "冰川裂縫迷宮深度健行（4h）",
        "desc": "13:10 集合報到，嚮導發放冰爪、冰斧與安全吊帶（登山鞋不夠硬可現場租借約 1,000-1,500 ISK）。搭接駁車踏上萬年冰雪世界，深入核心裂縫迷宮，穿梭幽藍冰牆與魔幻冰洞。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Skaftafell%20Glacier%20Hiking%20Iceland",
        "tags": [
          "🧊 冰川健行",
          "🥾 冰爪"
        ],
        "speak": "搭接駁車踏上萬年冰雪世界，深入核心裂縫迷宮，穿梭幽藍冰牆、冰脊與魔幻冰洞。"
      },
      {
        "time": "🦐 19:30",
        "title": "返回赫本・晚餐 Humarhöfnin / Íshúsið",
        "desc": "下山整裝喝杯熱咖啡拉伸雙腿，開車約 1 小時 45 分鐘返回赫本，享用蒜香小龍蝦披薩與濃郁龍蝦湯，犒賞挑戰冰川成功的自己。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Humarhofnin%20Hofn%20Iceland",
        "tags": [
          "🍕 龍蝦披薩",
          "🏨 返回住處"
        ],
        "speak": "車程約 1 小時 45 分鐘返回赫本，享用蒜香小龍蝦披薩犒賞挑戰冰川成功的自己。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Höfn 赫本小鎮住宿",
      "desc": "📍 龍蝦之都<br>🛏️ 第 7 晚（連住第 2 晚）"
    },
    "tips": [
      "冰川健行必須穿硬底高筒登山鞋，若沒有可現場租借，切勿穿牛仔褲（濕了會失溫）。",
      "冰川強烈反射紫外線，請務必攜帶墨鏡、厚手套與保暖毛帽。",
      "Vestrahorn 門票需在 Viking Cafe 櫃檯購買 QR Code 實體票券，開車進沙灘閘口需下車掃描。"
    ],
    "prev": "day6.html",
    "next": {
      "href": "day8.html",
      "label": "Day 8 · 東部峽灣長征與彩虹小鎮"
    }
  },
  {
    "day": 8,
    "title": "東部峽灣長征與彩虹小鎮",
    "theme": "東部峽灣長征與彩虹小鎮 🌈",
    "date": "8月8日（週六）",
    "meta": "8月8日（週六）・⛰️ 亨吉瀑布",
    "color": "#ef4444",
    "map": {
      "lat": 65.1,
      "lng": -14.6,
      "zoom": 8
    },
    "markers": [
      {
        "name": "Djúpivogur",
        "lat": 64.6538,
        "lng": -14.2775,
        "c": "#f59e0b"
      },
      {
        "name": "Egilsstaðir",
        "lat": 65.2646,
        "lng": -14.3948,
        "c": "#ef4444"
      },
      {
        "name": "Hengifoss",
        "lat": 65.0714,
        "lng": -14.9767,
        "c": "#10b981"
      },
      {
        "name": "Seyðisfjörður",
        "lat": 65.2646,
        "lng": -13.974,
        "c": "#2563eb"
      }
    ],
    "spots": [
      {
        "time": "� 08:30",
        "title": "長征啟航：道別赫本，駛入東部峽灣",
        "desc": "兩部 SUV 沿 1 號公路向北前進，右手邊是浩瀚大西洋、左手邊是陡峭黑色山壁，沿途盡是冰河倒切峽灣地形。",
        "nav": "https://www.google.com/maps/search/?api=1&query=East%20Fjords%20Route%201%20Iceland",
        "tags": [
          "🚗 長途自駕",
          "⛰️ 峽灣"
        ],
        "speak": "沿 1 號公路向北前進，右手邊是大西洋，左手邊是陡峭黑色山壁。"
      },
      {
        "time": "🥚 09:45",
        "title": "中途舒展：Djúpivogur 神山小鎮（20min）",
        "desc": "下車活動筋骨，遠眺有「神山」之稱的金字塔形山峰 Búlandstindur，港口旁有著名的裝置藝術「34 顆巨型鳥蛋」可拍團體照。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Djupivogur%20Iceland",
        "tags": [
          "🥚 鳥蛋藝術",
          "⛰️ 神山"
        ],
        "speak": "遠眺神山 Búlandstindur，港口旁有著名的 34 顆巨型鳥蛋裝置藝術。"
      },
      {
        "time": "🍽️ 12:05",
        "title": "午餐充電：Egilsstaðir 大鎮蓄能",
        "desc": "抵達東部最重要的樞紐城鎮，推薦 Salt Café & Bistro 或 Askur Pizzeria 的柴燒披薩，順便在 N1 加油站把油箱加滿。請避開 939 號 Öxi 碎石山路，繼續走 1 號公路最安全。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Egilsstadir%20Iceland",
        "tags": [
          "🍕 披薩",
          "⛽ 加油"
        ],
        "speak": "東部最重要的樞紐城鎮，推薦享用披薩、漢堡與熱湯，並順便加滿油。"
      },
      {
        "time": "🥾 13:50",
        "title": "Hengifoss 亨吉瀑布：玄武岩紅條紋（2.5h）",
        "desc": "沿拉加爾湖開往 931 號公路，來回約 4.6 公里、爬升約 300 公尺的碎石步道，途經柱狀玄武岩包圍的 Litlanesfoss，終點是全冰島第三高、擁有紅土岩層夾心的 Hengifoss。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Hengifoss%20Iceland",
        "tags": [
          "🥾 高強度健行",
          "🌊 瀑布"
        ],
        "speak": "來回約 4.6 公里持續上坡的碎石步道，途經被玄武岩包圍的小瀑布 Litlanesfoss。"
      },
      {
        "time": "🎬 16:20",
        "title": "翻越高原：93 號公路電影場景",
        "desc": "切入 93 號公路翻越 Fjarðarheiði 高山高原，正是《白日夢冒險王》主角滑滑板的經典場景，沿途經過巨大的 Gufufoss 蒸氣瀑布。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Fjardarheidi%20Mountain%20Road%20Iceland",
        "tags": [
          "🎬 電影場景",
          "🌫️ 高原"
        ],
        "speak": "白日夢冒險王滑板場景，沿途經過 Gufufoss 蒸氣瀑布俯瞰整個峽灣小鎮。"
      },
      {
        "time": "🌈 17:15",
        "title": "Seyðisfjörður：彩虹階梯與藍色教堂（2h）",
        "desc": "將車停在小鎮中心，漫步在全冰島最知名的彩虹街道 Rainbow Street，盡頭是上鏡率極高的粉藍色木造教堂，濃郁藝術氣息值得悠閒散步逛店。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Seydisfjordur%20Rainbow%20Street%20Iceland",
        "tags": [
          "🌈 彩虹街",
          "⛪ 藍色教堂"
        ],
        "speak": "全冰島最知名的彩虹街道，盡頭是上鏡率極高的粉藍色木造教堂。"
      },
      {
        "time": "🍽️ 19:15",
        "title": "小鎮晚餐：Skaftfell Bistro",
        "desc": "現烤薄脆披薩與在地精釀啤酒極受好評，晚餐後再次翻越 93 號山路回到 Egilsstaðir 盆地，前往湖畔森林度假別墅 Úlfsstaðaskógur 13 住宿。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Skaftfell%20Bistro%20Seydisfjordur%20Iceland",
        "tags": [
          "🍕 意式晚餐",
          "🌲 森林木屋"
        ],
        "speak": "現烤薄脆披薩與在地精釀啤酒極受好評，晚餐後翻山返回森林住處。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Úlfsstaðaskógur 13 森林木屋",
      "desc": "📍 Egilsstaðir 湖畔森林保護區<br>🛏️ 第 8 晚<br>🅿️ 私人前院可並排停放兩部 SUV"
    },
    "tips": [
      "切勿貪快走 939 號 Öxi 碎石山路，租車保險通常不含底盤與輪胎碎石損傷。",
      "93 號高山公路易起濃霧，請開啟霧燈、拉大車距，跟隨黃色反光桿慢行。",
      "Hengifoss 中後段為紅土碎石斜坡，請穿抓地力強的登山鞋，備妥登山杖更佳。"
    ],
    "prev": "day7.html",
    "next": {
      "href": "day9.html",
      "label": "Day 9 · 玄武岩峽谷與黛提瀑布"
    }
  },
  {
    "day": 9,
    "title": "玄武岩峽谷與黛提瀑布",
    "theme": "玄武岩峽谷與黛提瀑布 🏞️",
    "date": "8月9日（週日）",
    "meta": "8月9日（週日）・♨️ 米湖溫泉",
    "color": "#14b8a6",
    "map": {
      "lat": 65.5,
      "lng": -16.2,
      "zoom": 8
    },
    "markers": [
      {
        "name": "Stuðlagil",
        "lat": 65.3312,
        "lng": -15.3247,
        "c": "#8b5cf6"
      },
      {
        "name": "Dettifoss",
        "lat": 65.8148,
        "lng": -16.3841,
        "c": "#2563eb"
      },
      {
        "name": "Hverir",
        "lat": 65.6402,
        "lng": -16.8065,
        "c": "#ef4444"
      },
      {
        "name": "Mývatn 飯店",
        "lat": 65.6395,
        "lng": -16.9723,
        "c": "#0ea5e9"
      }
    ],
    "spots": [
      {
        "time": "🚗 08:30",
        "title": "出發前往 Stuðlagil 峽谷（East Side Parking）",
        "desc": "自埃伊爾斯塔濟出發走 1 號公路轉 923 號公路，車程約 1 小時。務必導航至東岸停車場 Klambrasel，才能走下谷底親自觸摸玄武岩柱。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Studlagil%20Canyon%20East%20Side%20Parking%20Iceland",
        "tags": [
          "🏔️ 玄武岩峽谷",
          "🚗 自駕"
        ],
        "speak": "導航至東岸停車場 Klambrasel，才能走下谷底親自觸摸玄武岩柱。"
      },
      {
        "time": "🥾 09:30",
        "title": "探索 Stuðlagil 峽谷底健行（2h）",
        "desc": "從東岸停車場徒步出發，單程約 2.5 公里（平坦好走 30-40 分鐘）。抵達谷底後可在壯麗的六角玄武岩群間攀爬拍照，8 月河水呈夢幻藍綠色。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Studlagil%20Canyon%20Iceland",
        "tags": [
          "🥾 健行",
          "💚 藍綠河水"
        ],
        "speak": "單程健行約 2.5 公里，抵達谷底可在六角玄武岩群間攀爬拍照，河水呈夢幻藍綠色。"
      },
      {
        "time": "🍽️ 11:30",
        "title": "途經路邊瀑布與高原午餐（1.5h）",
        "desc": "返回 1 號公路西行，途中經過路邊 Rjúkandi 瀑布可停下拍照。高原路段餐廳稀少，建議在沿途的 Guesthouse Skjöldólfsstaðir 用簡單午餐，或自備輕食野餐。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Rjukandi%20Waterfall%20Iceland",
        "tags": [
          "🌊 路邊瀑布",
          "🍱 野餐"
        ],
        "speak": "途經 Rjúkandi 瀑布，隨後在沿途稀少的餐廳或自備輕食野餐。"
      },
      {
        "time": "🌊 14:15",
        "title": "Dettifoss & Selfoss 雙瀑布震撼（1.5h）",
        "desc": "切入 862 號柏油路直達西側停車場，步行約 15 分鐘感受歐洲水量最大瀑布的磅礴氣勢；沿步道往上游走約 1 公里，可抵達優雅如絲帶的 Selfoss 賽爾瀑布。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Dettifoss%20West%20Side%20Iceland",
        "tags": [
          "🌊 大瀑布",
          "💦 水氣大"
        ],
        "speak": "歐洲水量最大的瀑布，萬馬奔騰的磅礴氣勢，水氣極大記得穿防水外套。"
      },
      {
        "time": "🌋 16:30",
        "title": "漫步火星地表：Hverir（45min）",
        "desc": "沿 862 號公路返回 1 號公路往米湖方向，大地被地熱礦物質染成黃紅灰色，順著步道環繞沸騰泥漿與噴氣孔，拍出外星科幻感大片。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Hverir%20Iceland",
        "tags": [
          "🌋 外星地貌",
          "💨 硫磺蒸氣"
        ],
        "speak": "沸騰泥漿地表與濃郁硫磺蒸氣宛如外星世界，沿步道環繞噴氣孔拍照。"
      },
      {
        "time": "♨️ 17:15",
        "title": "抵達米湖飯店・晚間溫泉與晚餐",
        "desc": "辦理 Check-in 後，建議提早預約 19:30 或 20:00 的米湖溫泉（Mývatn Nature Baths），距飯店僅 10 分鐘車程；晚餐可選 Vogafjós 牛棚餐廳、Gamli Bærinn 或 Daddi's Pizza。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Myvatn%20Nature%20Baths%20Iceland",
        "tags": [
          "♨️ 米湖溫泉",
          "🏨 Check-in"
        ],
        "speak": "Check-in 後建議預約 19:30 或 20:00 的米湖溫泉，一邊看夕陽一邊洗去疲勞。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Mývatn - Berjaya Iceland Hotel",
      "desc": "📍 米湖畔<br>🛏️ 第 9 晚（連住 2 晚）"
    },
    "tips": [
      "Dettifoss 水氣鋪天蓋地，Stuðlagil 谷底風速大，請將防水防風外套放在隨手可拿處。",
      "米湖溫泉泡湯前須全裸淋浴，銀飾入池前務必取下以免氧化變黑。",
      "米湖熱門餐廳建議提早 1-2 週訂位，尤其是 Vogafjós 牛棚餐廳。"
    ],
    "prev": "day8.html",
    "next": {
      "href": "day10.html",
      "label": "Day 10 · 雙瀑布與米湖地質精華"
    }
  },
  {
    "day": 10,
    "title": "雙瀑布與米湖地質精華",
    "theme": "雙瀑布與米湖地質精華 🌋",
    "date": "8月10日（週一）",
    "meta": "8月10日（週一）・🌑 偽火山口",
    "color": "#64748b",
    "map": {
      "lat": 65.6,
      "lng": -16.9,
      "zoom": 10
    },
    "markers": [
      {
        "name": "Goðafoss",
        "lat": 65.6826,
        "lng": -17.5502,
        "c": "#2563eb"
      },
      {
        "name": "Aldeyjarfoss",
        "lat": 65.3705,
        "lng": -17.3819,
        "c": "#8b5cf6"
      },
      {
        "name": "Dimmuborgir",
        "lat": 65.5836,
        "lng": -16.899,
        "c": "#ef4444"
      },
      {
        "name": "Hverfjall",
        "lat": 65.6047,
        "lng": -16.859,
        "c": "#64748b"
      }
    ],
    "spots": [
      {
        "time": "🌊 08:30",
        "title": "神之瀑布 Goðafoss（1.5h）",
        "desc": "寬達 30 公尺、高 12 公尺的圓弧形巨型瀑布，兩側皆有鋪設步道，清晨易見跨越瀑布的彩虹，地形平緩好走。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Godafoss%20Iceland",
        "tags": [
          "🌊 瀑布",
          "🌈 彩虹"
        ],
        "speak": "寬達 30 公尺的圓弧形巨型瀑布，公元 1000 年冰島改信基督教時法律石雕像投入其中因而得名。"
      },
      {
        "time": "🏔️ 10:15",
        "title": "Aldeyjarfoss 高地玄武岩瀑布（2.5h）",
        "desc": "沿 842 號公路銜接 F26 高地公路，沿途多顛簸碎石正好展現 SUV 越野性能。純白冰川水衝入圓形深潭，四周密集對稱的黑色玄武岩柱是攝影必訪秘境。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Aldeyjarfoss%20Iceland",
        "tags": [
          "🏔️ 玄武岩",
          "🚙 越野路段"
        ],
        "speak": "純白冰川水從 20 公尺高處對準圓形深潭直衝而下，被密集對稱的黑色玄武岩柱包圍。"
      },
      {
        "time": "🍽️ 12:45",
        "title": "返回米湖區域與湖畔午餐（2.25h）",
        "desc": "從高地雙瀑布折返約 1 小時 15 分鐘，於湖畔南側餐廳（Kaffi Borgir 或 Vogafjós）享用溫室料理或煙燻鱒魚，為下午健行補充體力。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Kaffi%20Borgir%20Myvatn%20Iceland",
        "tags": [
          "🍽️ 湖畔午餐"
        ],
        "speak": "推薦 Kaffi Borgir 或 Vogafjós，享用在地溫室料理或煙燻鱒魚欣賞湖景。"
      },
      {
        "time": "🌑 15:00",
        "title": "Skútustaðagígar 偽火山口群（45min）",
        "desc": "熾熱熔岩流經濕地湖泊時地下水汽化爆炸形成的獨特圓丘地貌，環形步道可漫步邊緣脊線，也是水鴨候鳥的繁衍天堂。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Skutustadagigar%20Pseudocraters%20Iceland",
        "tags": [
          "🌑 偽火山口",
          "🦆 賞鳥"
        ],
        "speak": "外觀酷似太空隕石坑的圓丘群，環形步道可漫步在火山口邊緣脊線俯瞰米湖。"
      },
      {
        "time": "🏰 16:00",
        "title": "Dimmuborgir 黑色城堡熔岩迷宮（1h）",
        "desc": "約 2300 年前火山噴發形成的熔岩湖塌陷後留下的奇岩異石迷宮，多條 15-60 分鐘不等的健行步道，形似大教堂的天然拱門岩石是必看重點。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Dimmuborgir%20Iceland",
        "tags": [
          "🏰 熔岩迷宮"
        ],
        "speak": "由奇岩異石組成的熔岩地質迷宮，多條 15-60 分鐘不等的健行步道，天然拱門岩石是必看重點。"
      },
      {
        "time": "💧 17:15",
        "title": "Grjótagjá 地裂幽藍溫泉（30min）",
        "desc": "地表裂縫下泛著寶石般幽藍光澤的溫泉洞穴（現已禁止入內泡湯），外側可見清晰的板塊張裂地縫，附近還有 Stóragjá 溶洞可順道一探。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Grjotagja%20Cave%20Iceland",
        "tags": [
          "💧 地裂洞穴",
          "🌍 板塊地縫"
        ],
        "speak": "地表裂縫下的幽藍溫泉洞穴，已禁止入內泡湯但景致依舊迷人，也可見板塊張裂地縫。"
      },
      {
        "time": "🌑 18:00",
        "title": "Hverfjall 純黑假火山（1.5h，彈性行程）",
        "desc": "2500 年歷史、直徑 1 公里的巨型凝灰岩火山口，攀爬碎石步道約 20 分鐘可登頂 360 度俯瞰米湖。體力不足時可彈性改為前往米湖溫泉放鬆。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Hverfjall%20Crater%20Iceland",
        "tags": [
          "🌑 假火山",
          "♨️ 溫泉備案"
        ],
        "speak": "直徑 1 公里、深 140 公尺的巨型凝灰岩火山口，登頂可 360 度俯瞰米湖全景。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Mývatn - Berjaya Iceland Hotel",
      "desc": "📍 米湖畔<br>🛏️ 第 10 晚（連住第 2 晚）"
    },
    "tips": [
      "F26 高地路段多碎石顛簸，請減速慢行，注意底盤與輪胎安全。",
      "Grjótagjá 溫泉洞穴目前禁止下水，僅供觀賞拍照。",
      "今日健行點多，體力吃緊時可省略 Hverfjall，改去米湖溫泉放鬆。"
    ],
    "prev": "day9.html",
    "next": {
      "href": "day11.html",
      "label": "Day 11 · 胡薩維克賞鯨與懸崖溫泉"
    }
  },
  {
    "day": 11,
    "title": "胡薩維克賞鯨與懸崖溫泉",
    "theme": "胡薩維克賞鯨與懸崖溫泉 🐋",
    "date": "8月11日（週二）",
    "meta": "8月11日（週二）・♨️ GeoSea",
    "color": "#8b5cf6",
    "map": {
      "lat": 65.85,
      "lng": -17.3,
      "zoom": 9
    },
    "markers": [
      {
        "name": "Húsavík",
        "lat": 66.0449,
        "lng": -17.3389,
        "c": "#8b5cf6"
      },
      {
        "name": "GeoSea",
        "lat": 66.0398,
        "lng": -17.33,
        "c": "#06b6d4"
      },
      {
        "name": "Akureyri",
        "lat": 65.6835,
        "lng": -18.0878,
        "c": "#f59e0b"
      }
    ],
    "spots": [
      {
        "time": "🚗 09:30",
        "title": "自駕前往胡薩維克 Húsavík",
        "desc": "從米湖或阿克雷里出發，兩部 SUV 一前一後前行，沿路欣賞北部遼闊的峽灣與火山地貌，車程約 45-60 分鐘。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Husavik%20Iceland",
        "tags": [
          "🚗 自駕"
        ],
        "speak": "兩部 SUV 一前一後出發，沿路欣賞北部遼闊的峽灣或火山地貌，車程約 45-60 分鐘。"
      },
      {
        "time": "🐋 10:30",
        "title": "胡薩維克鯨魚博物館（1h）",
        "desc": "出海前的最佳知識暖身，館內有全冰島唯一的藍鯨完整骨骼標本，看完後出海賞鯨會更有感。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Husavik%20Whale%20Museum%20Iceland",
        "tags": [
          "🐋 鯨魚博物館"
        ],
        "speak": "全冰島唯一的藍鯨完整骨骼標本，是出海賞鯨前的最佳知識暖身。"
      },
      {
        "time": "🍽️ 11:30",
        "title": "午餐：Gamli Baukur（1h 15min）",
        "desc": "港口正前方的漂流木木屋餐廳，充滿航海與維京風情。推薦當日港口鮮魚、經典炸魚薯條與海鮮濃湯，人均約 5,000-7,500 ISK。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Gamli%20Baukur%20Husavik%20Iceland",
        "tags": [
          "🐟 港口鮮魚",
          "🍟 炸魚薯條"
        ],
        "speak": "港口旁的漂流木木屋餐廳，出海賞鯨前一定要吃飽，推薦當日鮮魚與炸魚薯條。"
      },
      {
        "time": "🐋 13:15",
        "title": "傳統橡木船賞鯨之旅（3h）",
        "desc": "12:45 碼頭報到並穿上防風防水連身保暖衣，駛入 Skjálfandi 海灣。8 月是座頭鯨與大翅鯨活躍的季節，幸運的話能看到牠們躍出海面。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Husavik%20Whale%20Watching%20Iceland",
        "tags": [
          "🐋 賞鯨",
          "🥶 保暖衣"
        ],
        "speak": "駛入 Skjálfandi 海灣，8 月是座頭鯨活躍季節，幸運的話能看到牠們躍出海面。"
      },
      {
        "time": "♨️ 16:30",
        "title": "GeoSea 地熱海水溫泉（2h）",
        "desc": "開車 3 分鐘直達，剛從海上吹完 3 小時海風，立刻浸入懸崖邊的溫暖海水溫泉，極致享受。建議提早上網預約 16:30 或 17:00 場次。",
        "nav": "https://www.google.com/maps/search/?api=1&query=GeoSea%20Husavik%20Iceland",
        "tags": [
          "♨️ 懸崖溫泉",
          "🌊 海景"
        ],
        "speak": "開車 3 分鐘直達，剛從寒冷海上吹完風，立刻浸入懸崖邊的溫暖海水溫泉。"
      },
      {
        "time": "🍽️ 19:00",
        "title": "慶功晚餐：Naustið（1.5h）",
        "desc": "鮮黃色外牆的家族經營小木屋，必點傳奇海鮮湯（融入椰奶、咖哩與辣椒），人均約 7,000-9,500 ISK。餐後開車返回住處。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Naustid%20Husavik%20Iceland",
        "tags": [
          "🍲 海鮮湯",
          "🏨 返回住處"
        ],
        "speak": "全胡薩維克評價極高的海鮮料理，必點傳奇海鮮湯，帶著南洋風味微辣辛香。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "阿克雷里市區住宿",
      "desc": "📍 北部首都<br>🛏️ 第 11 晚<br>⛽ 出發油箱請加滿，隔天長征需油量充足"
    },
    "tips": [
      "港口對面有大型免費停車場，兩部 SUV 很好停。",
      "GeoSea 熱門，確定賞鯨時間後請立刻上網預約場次，名額很快額滿。",
      "出海風浪大且寒冷，記得穿上主辦方提供的防風防水連身保暖衣。"
    ],
    "prev": "day10.html",
    "next": {
      "href": "day12.html",
      "label": "Day 12 · 犀牛岩與世紀日全蝕"
    }
  },
  {
    "day": 12,
    "title": "犀牛岩與世紀日全蝕",
    "theme": "犀牛岩與世紀日全蝕 🌑",
    "date": "8月12日（週三）",
    "meta": "8月12日（週三）・♨️ Sky Lagoon",
    "color": "#1e1b4b",
    "map": {
      "lat": 65,
      "lng": -21,
      "zoom": 7
    },
    "markers": [
      {
        "name": "Hvítserkur",
        "lat": 65.6062,
        "lng": -20.6392,
        "c": "#8b5cf6"
      },
      {
        "name": "Borgarnes",
        "lat": 64.5386,
        "lng": -21.9026,
        "c": "#f59e0b"
      },
      {
        "name": "Kópavogur 住處",
        "lat": 64.1077,
        "lng": -21.9042,
        "c": "#ef4444"
      },
      {
        "name": "Sky Lagoon",
        "lat": 64.0784,
        "lng": -21.9502,
        "c": "#06b6d4"
      }
    ],
    "spots": [
      {
        "time": "� 07:00",
        "title": "晨光出發，跨越北境熔岩荒野（2.5h）",
        "desc": "07:00 準時發動車子，沿 1 號公路向西奔馳，轉入 711 號碎石路請減速慢行防碎石彈飛。導航目的地 Hvítserkur Parking。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Hvitserkur%20Parking%20Iceland",
        "tags": [
          "🚗 長途自駕"
        ],
        "speak": "沿 1 號公路轉入 711 號碎石路，兩部車保持安全車距，車程約 2.5 小時。"
      },
      {
        "time": "🦏 09:30",
        "title": "秘境奇岩：Hvítserkur 犀牛岩（40min）",
        "desc": "高達 15 公尺的巨大玄武岩海蝕柱矗立在黑沙灘上，外形極像低頭喝水的犀牛。若逢退潮可沿步道走到腳下拍照，此處也是野生海豹熱門棲息地。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Hvitserkur%20Rock%20Iceland",
        "tags": [
          "🦏 奇岩",
          "🦭 海豹"
        ],
        "speak": "高達 15 公尺的玄武岩海蝕柱，外形極像正在低頭喝水的巨型犀牛，退潮時可走到腳下拍照。"
      },
      {
        "time": "🌭 10:40",
        "title": "趕路大作戰：博爾加內斯快速午餐（3h）",
        "desc": "沿 1 號公路南下，約 13:10 抵達博爾加內斯。為搶時間不吃排餐，建議在 N1 休息站買熱狗堡、三明治迅速在車上解決，隨後穿過鯨魚峽灣海底隧道直奔 Kópavogur。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Borgarnes%20N1%20Iceland",
        "tags": [
          "🌭 快速午餐",
          "🚗 長征"
        ],
        "speak": "為了搶時間不吃排餐，在 N1 休息站買熱狗堡或三明治在車上解決。"
      },
      {
        "time": "🏡 14:30",
        "title": "抵達 Kópavogur 住處與裝備整備",
        "desc": "抵達 Marbakkabraut 9 辦理 Check-in、卸下行李。日蝕發生時氣溫會驟降 3-5°C，請檢查日蝕眼鏡、穿上防風保暖衣物並備好攝影腳架。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Marbakkabraut%209%20Kopavogur%20Iceland",
        "tags": [
          "🏨 Check-in",
          "🕶️ 日蝕眼鏡"
        ],
        "speak": "辦理 Check-in，檢查日蝕眼鏡、穿上防風保暖衣物，準備好攝影腳架。"
      },
      {
        "time": "🛰️ 15:30",
        "title": "前往「無遮蔽」日全蝕完美觀賞點",
        "desc": "車程僅 5 分鐘的 Borgarholt 丘陵（Kópavogskirkja 教堂山），是雷克雅維克地區最完美的觀賞點，360 度無建築遮擋，面向西南偏西方仰角約 25 度觀賞月影席捲而來。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Kopavogskirkja%20Iceland",
        "tags": [
          "🛰️ 最佳觀測點",
          "⛪ 教堂山"
        ],
        "speak": "Borgarholt 丘陵上的 Kópavogskirkja 教堂山，360 度無死角視野。"
      },
      {
        "time": "🌑 16:42",
        "title": "2026 世紀日全蝕震撼觀賞（關鍵時刻）",
        "desc": "16:42 初虧、17:40 環境驟變風力增強、17:48:12 食既（大地陷入黑暗，可摘下日蝕眼鏡直視太陽冕）、17:49:10 食甚、17:50:08 生光請立刻戴回日蝕眼鏡、18:47 復圓謝幕。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Kopavogskirkja%20Iceland",
        "tags": [
          "🌑 日全蝕",
          "✨ 太陽冕"
        ],
        "speak": "16:42 初虧開始，17:48:12 食既太陽被完全遮蔽，可摘下日蝕眼鏡肉眼直視太陽冕，18:47 復圓。"
      },
      {
        "time": "♨️ 19:15",
        "title": "慶祝之夜：Sky Lagoon 無邊際溫泉",
        "desc": "看完日蝕後開車 5 分鐘回民宿拿泳衣，前往距離僅 5 分鐘的 Sky Lagoon，體驗著名的「7 步火山療癒法」，池畔可喝杯慶功香檳或啤酒，備有專屬超大免費停車場。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Sky%20Lagoon%20Iceland",
        "tags": [
          "♨️ 無邊際溫泉",
          "🥂 慶功"
        ],
        "speak": "望著剛發生日蝕的大西洋海面，享受著名的 7 步火山療癒法，可在池畔喝杯慶功香檳。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Marbakkabraut 9, Kópavogur",
      "desc": "📍 Kópavogur 海景民宿<br>🛏️ 第 12 晚（連住 4 晚）"
    },
    "tips": [
      "出發前一晚務必把油箱加滿，07:00 必須準時發車以掌握全部行程時間。",
      "日全蝕僅在 17:48-17:50 全黑期間可摘下日蝕眼鏡肉眼直視，其餘時間務必配戴。",
      "手機拍攝日全蝕請使用三腳架固定，全黑期間可拿掉減光片讓夜間模式拍出日冕。"
    ],
    "prev": "day11.html",
    "next": {
      "href": "day13.html",
      "label": "Day 13 · 斯奈山半島海豹與懸崖健行"
    }
  },
  {
    "day": 13,
    "title": "斯奈山半島海豹與懸崖健行",
    "theme": "斯奈山半島海豹與懸崖健行 🤭",
    "date": "8月13日（週四）",
    "meta": "8月13日（週四）・⛰️ 教堂山",
    "color": "#0ea5e9",
    "map": {
      "lat": 64.85,
      "lng": -23.3,
      "zoom": 8
    },
    "markers": [
      {
        "name": "Ytri Tunga 海豹灘",
        "lat": 64.8047,
        "lng": -23.3948,
        "c": "#0ea5e9"
      },
      {
        "name": "Arnarstapi",
        "lat": 64.7717,
        "lng": -23.6256,
        "c": "#10b981"
      },
      {
        "name": "Djúpalónssandur",
        "lat": 64.7639,
        "lng": -23.9089,
        "c": "#1e293b"
      },
      {
        "name": "Kirkjufell",
        "lat": 64.9425,
        "lng": -23.3072,
        "c": "#f59e0b"
      },
      {
        "name": "Kópavogur 住處",
        "lat": 64.1077,
        "lng": -21.9042,
        "c": "#ef4444"
      }
    ],
    "spots": [
      {
        "time": "� 08:00",
        "title": "晨光出發，直奔海豹沙灘（2h 15min）",
        "desc": "兩部 SUV 準時從 Kópavogur 出發，北上通過鯨魚峽灣海底隧道，經博爾加內斯轉入 54 號公路正式駛向斯奈山半島，清晨出發能避開通勤車潮。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Ytri%20Tunga%20Beach%20Iceland",
        "tags": [
          "🚗 長途自駕"
        ],
        "speak": "兩部 SUV 準時從柯帕沃格出發，北上通過鯨魚峽灣海底隧道，經博爾加內斯轉入 54 號公路。"
      },
      {
        "time": "🦭 10:15",
        "title": "Ytri Tunga 金沙灘：野生海豹（1h 15min）",
        "desc": "冰島罕見的金色沙灘，全冰島最著名的野生海豹聚集地。退潮時港海豹與灰海豹喜歡躺在礁岩上曬太陽，請與海豹保持至少 50 公尺安全距離，礁岩濕滑請小心行走。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Ytri%20Tunga%20Iceland",
        "tags": [
          "🦭 野生海豹",
          "🏖️ 金沙灘"
        ],
        "speak": "冰島罕見的金色沙灘，也是最著名的野生海豹聚集地，退潮時牠們喜歡躺在礁岩上曬太陽。"
      },
      {
        "time": "⛪ 11:30",
        "title": "Búðakirkja 荒野黑教堂（30min）",
        "desc": "轉入一小段碎石路即可抵達，純黑色木造教堂矗立在荒涼火山熔岩地中，與背後雪山、前方大海對比強烈，是孤寂美感十足的拍照聖地。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Budakirkja%20Black%20Church%20Iceland",
        "tags": [
          "⛪ 黑教堂",
          "📸 打卡"
        ],
        "speak": "純黑色木造教堂矗立在荒涼火山熔岩地中，與背後雪山、前方大海對比強烈。"
      },
      {
        "time": "🍽️ 12:15",
        "title": "Arnarstapi 午餐與雙車接駁調度（1h）",
        "desc": "推薦 Arnarstapi Center 或路邊 Fish & Chips 餐車。雙車接駁密技：兩位主駕駛先把兩輛車都開到 Hellnar，A 車停放後共乘 B 車回 Arnarstapi，健行終點才有車接駁，不用走回頭路。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Arnarstapi%20Iceland",
        "tags": [
          "🍟 炸魚薯條",
          "🚗 雙車接駁"
        ],
        "speak": "推薦 Arnarstapi Center 或路邊炸魚薯條餐車，餐後將一部車先開到終點 Hellnar。"
      },
      {
        "time": "🥾 13:35",
        "title": "核心高潮：Arnarstapi → Hellnar 海岸懸崖健行（1.5h）",
        "desc": "公認斯奈山半島最精華的靈魂步道。先參觀巨大的 Bárður 巨人神像與 Gatklettur 拱門石，沿途一邊是玄武岩海蝕崖與成千上萬築巢海鳥，另一邊是無垠大西洋。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Arnarstapi%20Hellnar%20Coastal%20Trail%20Iceland",
        "tags": [
          "🥾 海岸健行",
          "🗿 巨人神像"
        ],
        "speak": "斯奈山半島最精華的步道，途經 Bárður 巨人神像與 Gatklettur 拱門石，一邊是玄武岩海蝕崖一邊是大西洋。"
      },
      {
        "time": "☕ 15:00",
        "title": "Hellnar：懸崖老咖啡廳與車輛會合（30min）",
        "desc": "坐在懸崖邊風味十足的 Fjöruhúsið 咖啡廳喝碗熱騰騰的傳統魚湯，兩位主駕駛順道開車回去把 A 車接來會合，全團繼續向西。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Fjoruhusid%20Hellnar%20Iceland",
        "tags": [
          "🐟 傳統魚湯",
          "🚗 車輛會合"
        ],
        "speak": "坐在 Fjöruhúsið 咖啡廳喝碗傳統魚湯，主駕駛順道把兩部車開回來會合。"
      },
      {
        "time": "💪 15:30",
        "title": "Djúpalónssandur 黑沙灘與力量之石（50min）",
        "desc": "繞過斯奈菲爾冰川火山進入國家公園，黑色卵石沙灘上散落著 1948 年英國拖網漁船殘骸。入口四顆「力量之石」最重達 154 公斤，可挑戰古代漁民測力遊戲。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Djupalonssandur%20Iceland",
        "tags": [
          "🏖️ 黑沙灘",
          "💪 力量石"
        ],
        "speak": "黑色卵石沙灘散落著英國拖網漁船殘骸，四顆力量之石可挑戰古代漁民的測力遊戲。"
      },
      {
        "time": "📸 16:40",
        "title": "Ingjaldshólskirkja「測視力紅房子」（40min）",
        "desc": "Hellissandur 小鎮附近的紅白相間教堂。拍照密技：不要開到門口，在通往教堂的筆直碎石路起點用長焦拉遠取景，前景是筆直道路，後方是紅白教堂與雪山。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Ingjaldsholskirkja%20Iceland",
        "tags": [
          "⛪ 網美教堂",
          "📸 長焦取景"
        ],
        "speak": "紅白相間教堂，最佳拍照機位在通往教堂的筆直碎石路起點，用長焦拉遠拍攝。"
      },
      {
        "time": "🌅 17:20",
        "title": "Kirkjufell 教堂山與瀑布：黃金謝幕（40min）",
        "desc": "抵達 Grundarfjörður，傍晚 17:30-18:30 是一天最柔和的黃金時刻。導航至 Kirkjufellsfoss 停車場，順步道走到瀑布上方，三道瀑布為前景與錐形草帽山同框，經典冰島明信片角度。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Kirkjufellsfoss%20Iceland",
        "tags": [
          "⛰️ 教堂山",
          "🌅 黃金時刻"
        ],
        "speak": "傍晚黃金時刻，三道瀑布流水為前景，與錐形草帽山同框拍出經典明信片角度。"
      },
      {
        "time": "🚗 18:30",
        "title": "踏上歸途，返抵 Kópavogur（2h 45min）",
        "desc": "沿 54 號與 1 號公路長途南下，8 月晚上九點多天色仍亮。途中可在 Mosfellsbær 的 Krónan（週四營業至 21:00）或市區 24 小時 Hagkaup 補給晚餐食材，累了記得在 Borgarnes 換手駕駛。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Marbakkabraut%209%20Kopavogur%20Iceland",
        "tags": [
          "🚗 長途返程",
          "🛒 超市補給"
        ],
        "speak": "沿 54 號與 1 號公路長途南下，8 月晚上九點多天色仍亮，途中可在 Mosfellsbær 補給晚餐食材。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Marbakkabraut 9, Kópavogur",
      "desc": "📍 Kópavogur 海景民宿<br>🛏️ 第 13 晚（連住第 3 晚）"
    },
    "tips": [
      "觀賞野生海豹請保持至少 50 公尺安全距離，不要大聲喧嘩驚擾牠們。",
      "半島西端風力強勁，請採防風防水三層穿法，並穿抓地力強的防水登山鞋。",
      "雙車接駁技巧可省去健行走回頭路，記得先把一部車開到 Hellnar。"
    ],
    "prev": "day12.html",
    "next": {
      "href": "day14.html",
      "label": "Day 14 · 雷克雅維克城市漫遊"
    }
  },
  {
    "day": 14,
    "title": "雷克雅維克城市漫遊",
    "theme": "雷克雅維克城市漫遊 🎨",
    "date": "8月14日（週五）",
    "meta": "8月14日（週五）・⛪ 哈爾格林姆教堂",
    "color": "#ec4899",
    "map": {
      "lat": 64.145,
      "lng": -21.93,
      "zoom": 13
    },
    "markers": [
      {
        "name": "哈爾格林姆教堂",
        "lat": 64.1417,
        "lng": -21.9266,
        "c": "#2563eb"
      },
      {
        "name": "Harpa",
        "lat": 64.15,
        "lng": -21.933,
        "c": "#f59e0b"
      },
      {
        "name": "太陽航海者",
        "lat": 64.1483,
        "lng": -21.9219,
        "c": "#10b981"
      },
      {
        "name": "托寧湖",
        "lat": 64.1466,
        "lng": -21.9407,
        "c": "#06b6d4"
      },
      {
        "name": "Perlan",
        "lat": 64.129,
        "lng": -21.9137,
        "c": "#ec4899"
      }
    ],
    "spots": [
      {
        "time": "🚗 09:00",
        "title": "出發：晨間兜風・教堂周邊停車",
        "desc": "從 Kópavogur 的 Marbakkabraut 9 出發，車程約 10-15 分鐘。建議導航至哈爾格林姆教堂周邊 P2 停車區，停妥後可一路向下步行非常省力。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Hallgrimskirkja%20Parking%20Reykjavik%20Iceland",
        "tags": [
          "🚗 市區停車",
          "🅿️ P2 區"
        ],
        "speak": "從 Kópavogur 開車切入環狀主幹道，車程僅約 10-15 分鐘。"
      },
      {
        "time": "⛪ 09:30",
        "title": "哈爾格林姆教堂 Hallgrímskirkja（1.5h）",
        "desc": "冰島最著名的玄武岩管風琴風格教堂，外觀拍照後強烈推薦買票搭電梯直達 73 公尺高鐘塔，將彩色積木屋與遠方海景盡收眼底。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Hallgrimskirkja%20Iceland",
        "tags": [
          "⛪ 地標",
          "🏙️ 鐘塔鳥瞰"
        ],
        "speak": "冰島最著名的玄武岩管風琴風格教堂，可買票搭電梯直達 73 公尺高鐘塔俯瞰全城。"
      },
      {
        "time": "🌈 11:00",
        "title": "彩虹街與主街散策（1.5h）",
        "desc": "從教堂正門順著 Skólavörðustígur 彩虹街一路向下，逛設計師小店與獨立書店，轉入 Laugavegur 主街可挑選 66°North 戶外服飾與紀念品。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Skolavordustigur%20Reykjavik%20Iceland",
        "tags": [
          "🌈 彩虹街",
          "🛍️ 購物"
        ],
        "speak": "從教堂沿彩虹街一路向下，逛設計師小店與獨立書店，轉入 Laugavegur 主街購物。"
      },
      {
        "time": "🌭 12:30",
        "title": "午餐：冰島人的日常美味（1.5h）",
        "desc": "步行至舊港口一帶，排隊品嚐全歐洲最出名的 Bæjarins Beztu Pylsur 羊肉熱狗堡（點餐說 Eina með öllu，配料全加）；或到 Svarta Kaffið 喝大麵包盛裝的濃湯。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Baejarins%20Beztu%20Pylsur%20Iceland",
        "tags": [
          "🌭 熱狗堡",
          "🍲 麵包湯"
        ],
        "speak": "排隊品嚐 Bæjarins Beztu Pylsur 羊肉熱狗堡，點餐記得說 Eina með öllu。"
      },
      {
        "time": "⛵ 14:00",
        "title": "海濱藝術線：太陽航海者 & Harpa（1.5h）",
        "desc": "沿海濱步道與鋼雕藝術品 Sun Voyager 合影，隨後走入 Harpa 音樂廳，上萬塊幾何玻璃在午後光影下十分魔幻，內部免費開放參觀，也能喝杯咖啡。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Harpa%20Concert%20Hall%20Iceland",
        "tags": [
          "⛵ 太陽航海者",
          "🎵 Harpa"
        ],
        "speak": "海濱鋼雕藝術品合影，再走入上萬塊幾何玻璃組成的 Harpa 音樂廳。"
      },
      {
        "time": "🦢 15:30",
        "title": "托寧湖與市政廳浮雕（2h）",
        "desc": "散步到「鴨子湖」Tjörnin，天鵝與野鴨成群氣氛悠閒。走進市政廳一樓的巨大冰島 3D 立體地形模型，指認這十幾天走過的峽灣與冰川特別有成就感。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Tjornin%20Lake%20Reykjavik%20Iceland",
        "tags": [
          "🦢 托寧湖",
          "🗺️ 3D 地形模型"
        ],
        "speak": "天鵝與野鴨成群的鴨子湖，市政廳一樓展有巨大的冰島 3D 立體地形模型。"
      },
      {
        "time": "🍽️ 17:30",
        "title": "冰島最後一晚的晚餐（2h）",
        "desc": "在市區享用精緻海鮮饗宴，推薦 Messinn 的鑄鐵鍋現煎北極紅點鮭，肉質極度細緻；或選擇老牌 Fish Company 魚類料理。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Messinn%20Reykjavik%20Iceland",
        "tags": [
          "🐟 紅點鮭",
          "🍽️ 精緻晚餐"
        ],
        "speak": "推薦 Messinn 的鑄鐵鍋現煎北極紅點鮭，或老牌 Fish Company 魚類料理。"
      },
      {
        "time": "🌇 19:30",
        "title": "珍珠樓 Perlan：飽覽黃昏夜景（1.5h）",
        "desc": "散步回教堂處取車，開車前往郊區丘陵上的 Perlan，頂樓 360 度觀景台是俯瞰大雷克雅維克區的最佳視角，8 月中旬傍晚正好趕上漫長的冰島夕陽。返回 Kópavogur 住處約 10 分鐘車程。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Perlan%20Reykjavik%20Iceland",
        "tags": [
          "🌇 觀景台",
          "🏨 返回住處"
        ],
        "speak": "郊區丘陵上的 360 度觀景台，8 月中旬傍晚正好趕上漫長的冰島夕陽。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "Marbakkabraut 9, Kópavogur",
      "desc": "📍 Kópavogur 海景民宿<br>🛏️ 第 14 晚（連住最後一晚）<br>💼 整理戰利品與行李，準備明日退房"
    },
    "tips": [
      "市區路邊停車全面數位化，停好車後請用 Parka App 定位繳費，離開時務必按「結束停車」。",
      "P1（主街周邊）最貴，P2（教堂周邊）性價比最高，P4 週末多半免費。",
      "海濱與教堂塔頂風勢強勁，建議「防風外套＋內層輕便」洋蔥式穿法。"
    ],
    "prev": "day13.html",
    "next": {
      "href": "day15.html",
      "label": "Day 15 · 告別：啟程返台"
    }
  },
  {
    "day": 15,
    "title": "告別：啟程返台",
    "theme": "告別：啟程返台 🛫",
    "date": "8月15日（週六）",
    "meta": "8月15日（週六）・🏨 退房",
    "color": "#ef4444",
    "map": {
      "lat": 63.98,
      "lng": -22.6,
      "zoom": 11
    },
    "markers": [
      {
        "name": "KEF 機場",
        "lat": 63.985,
        "lng": -22.606,
        "c": "#ef4444"
      }
    ],
    "spots": [
      {
        "time": "🏨 08:00",
        "title": "早餐、行李打包與退房（Kópavogur）",
        "desc": "在 Kópavogur 住處享用環島最後一頓早餐，護膚品、海鹽、酒類等液體物品務必放入託運行李。巡視房間與車輛確認無遺留物品後辦理自主退房。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Marbakkabraut%209%20Kopavogur%20Iceland",
        "tags": [
          "🏨 退房",
          "🧳 打包"
        ],
        "speak": "在 Kópavogur 住處享用最後一頓早餐，液體伴手禮務必放入託運行李。"
      },
      {
        "time": "🚗 09:45",
        "title": "準時出發：自駕駛往凱夫拉維克",
        "desc": "兩部車準時出發，沿 41 號公路（Reykjanesbraut）向西南行駛，車程約 40 分鐘，途中先至機場外圍 24 小時自助加油站把油箱加滿並保留收據。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Reykjanesbraut%2041%20Iceland",
        "tags": [
          "🚗 自駕",
          "⛽ 滿油還車"
        ],
        "speak": "沿 41 號公路向西南行駛，車程約 40 分鐘，兩部車保持車距。"
      },
      {
        "time": "🚗 10:45",
        "title": "Lotus Car Rental 還車手續",
        "desc": "將車停放在指定還車區域卸下行李，工作人員檢查車身外觀、內裝與油箱狀態，確認無誤後拿到還車確認單，搭免費接駁巴士前往 KEF 出境大廳。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Lotus%20Car%20Rental%20Iceland",
        "tags": [
          "🚗 還車",
          "🚌 接駁巴士"
        ],
        "speak": "工作人員現場檢查車身外觀與油箱狀態，確認無誤後拿到還車確認單，搭接駁車前往航廈。"
      },
      {
        "time": "🛂 11:35",
        "title": "機場自助報到、託運與安檢（黃金 2 小時）",
        "desc": "在自助報到機掃描護照列印 LH845 登機證與行李標籤，前往自助行李託運櫃檯掃碼送出行李，隨後立刻前往安檢閘口排隊通關。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Keflavik%20Airport%20Check-in%20Iceland",
        "tags": [
          "🛂 報到",
          "🧳 行李託運"
        ],
        "speak": "掃描護照列印登機證，行李託運後立刻前往安檢閘口通關，把握黃金 2 小時。"
      },
      {
        "time": "🛍️ 13:20",
        "title": "機場免稅店最後巡禮",
        "desc": "通過安檢後利用最後 20 分鐘在免稅店採購冰島巧克力、極光郵票或本地特色點心，13:40 準時前往登機門排隊。",
        "nav": "https://www.google.com/maps/search/?api=1&query=Keflavik%20Airport%20Duty%20Free%20Iceland",
        "tags": [
          "🛍️ 免稅",
          "🍫 巧克力"
        ],
        "speak": "利用最後 20 分鐘購買冰島巧克力、極光郵票或本地特色點心。"
      },
      {
        "time": "🛫 14:20",
        "title": "班機 LH845 起飛",
        "desc": "帶著滿滿回憶與照片，飛離冰島 KEF，前往法蘭克福 FRA。",
        "nav": "https://www.google.com/maps/search/?api=1&query=%E7%8F%AD%E6%A9%9F%20LH845%20%E8%B5%B7%E9%A3%9B%20Iceland",
        "tags": [
          "✈️ 再見冰島"
        ],
        "speak": "帶著滿滿回憶與照片，飛離冰島 KEF，前往法蘭克福 FRA。"
      },
      {
        "time": "🛬 19:50",
        "title": "抵達法蘭克福轉機",
        "desc": "⚠️ 轉機時間僅 1 小時 50 分鐘，為避免安檢排隊，請下機後立刻尋找下個航班 LH796 的登機門。",
        "nav": "https://www.google.com/maps/search/?api=1&query=%E6%8A%B5%E9%81%94%E6%B3%95%E8%98%AD%E5%85%8B%E7%A6%8F%E8%BD%89%E6%A9%9F%20Iceland",
        "tags": [
          "🇩🇪 法蘭克福",
          "🏃 快速轉機"
        ],
        "speak": "⚠️ 轉機時間僅 1 小時 50 分鐘，為避免安檢排隊，請下機後立刻尋找下個航班 LH796 的登機門。"
      },
      {
        "time": "🛫 21:40",
        "title": "搭班機 LH796 飛往香港",
        "desc": "搭乘夜航班返回亞洲。",
        "nav": "https://www.google.com/maps/search/?api=1&query=%E6%90%AD%E7%8F%AD%E6%A9%9F%20LH796%20%E9%A3%9B%E5%BE%80%E9%A6%99%E6%B8%AF%20Iceland",
        "tags": [
          "✈️ 長途飛行"
        ],
        "speak": "搭乘夜航班返回亞洲。"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "機上休息",
      "desc": "✈️ 飛往香港<br>🛏️ 第 15 晚"
    },
    "tips": [
      "法蘭克福轉機時間較為緊湊，若前段班機延遲，請立刻通知地勤協助。"
    ],
    "prev": "day14.html",
    "next": {
      "href": "day16.html",
      "label": "Day 16 · 抵達台北"
    }
  },
  {
    "day": 16,
    "title": "抵達溫暖的家",
    "theme": "抵達溫暖的家 🏡",
    "date": "8月16日（週日）",
    "meta": "8月16日（週日）・🇭🇰 香港轉機",
    "color": "#10b981",
    "map": {
      "lat": 25.07,
      "lng": 121.23,
      "zoom": 5
    },
    "markers": [
      {
        "name": "TPE 機場",
        "lat": 25.079,
        "lng": 121.234,
        "c": "#10b981"
      }
    ],
    "spots": [
      {
        "time": "🛬 15:45",
        "title": "抵達香港轉機",
        "desc": "⚠️ 抵達香港 HKG，轉機時間僅 1 小時 45 分鐘，請留意轉機標示快速移動至下個登機門。",
        "nav": "https://www.google.com/maps/search/?api=1&query=%E6%8A%B5%E9%81%94%E9%A6%99%E6%B8%AF%E8%BD%89%E6%A9%9F%20Iceland",
        "tags": [
          "🇭🇰 香港轉機",
          "🏃 緊湊"
        ],
        "speak": "⚠️ 抵達香港 HKG，轉機時間僅 1 小時 45 分鐘，請留意轉機標示快速移動至下個登機門。"
      },
      {
        "time": "🛫 17:30",
        "title": "搭乘 CI916 飛往台北",
        "desc": "最後一段航程，搭乘中華航空回台。",
        "nav": "https://www.google.com/maps/search/?api=1&query=%E6%90%AD%E4%B9%98%20CI916%20%E9%A3%9B%E5%BE%80%E5%8F%B0%E5%8C%97%20Iceland",
        "tags": [
          "✈️ 回程"
        ],
        "speak": "最後一段航程，搭乘中華航空回台。"
      },
      {
        "time": "🛬 19:25",
        "title": "抵達台北 (TPE)",
        "desc": "順利抵達台灣，領取行李，結束這趟精彩的 16 天冰島大環島之旅！🎉",
        "nav": "https://www.google.com/maps/search/?api=1&query=%E6%8A%B5%E9%81%94%E5%8F%B0%E5%8C%97%20(TPE)%20Iceland",
        "tags": [
          "🇹🇼 抵達台灣"
        ],
        "speak": "順利抵達台灣，領取行李，結束這趟精彩的 16 天冰島大環島之旅！🎉"
      }
    ],
    "hotel": {
      "icon": "🏨",
      "name": "— 無住宿 —",
      "desc": "🏡 溫暖的家"
    },
    "tips": [
      "回家盡快整理相片與遊記，與大家分享你在冰島看見的極光與黑沙灘！"
    ],
    "prev": "day15.html",
    "next": null
  }
];
