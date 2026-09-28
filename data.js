const itineraryData = [
  {
    day: "Day 1-2",
    date: "2026/10/8 (四)",
    title: "啟程星月國度 ｜ 漫步番紅花城",
    bgImage: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80",
    temp: "10-18°C",
    flight: "【去程】土航 TK025 ｜ 台北 21:50 - 伊斯坦堡 05:10\n【國內】土航 TK2108 ｜ 伊斯坦堡 08:00 - 安卡拉 09:15",
    alert: "若遇市長官邸關閉，將改參觀洞穴人家房舍替代。今日長程巴士供應免費 Wi-Fi。",
    points: [
      { name: "市長官邸", desc: "造訪典型鄂圖曼風格的三層木造大宅與典雅中庭，見證古城歲月流轉。" },
      { name: "鵝卵石古鎮", desc: "悠閒漫步沙夫蘭波爾起伏巷弄，尋訪古法手工銅製品與傳統糕點鋪。" },
      { name: "希德爾立克山丘", desc: "登臨番紅花城絕佳觀景台，俯瞰被列入世界遺產的古色古香山城全景。" }
    ],
    gridImages: [
      "https://images.unsplash.com/photo-1574545789139-3ebf3747eb4d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1601625463688-662f83196884?auto=format&fit=crop&w=400&q=80"
    ],
    mustBuyEat: "紅銅器、鄂圖曼軟糖\nGüveç陶甕風味餐",
    mealsSleep: "午: 鄂圖曼 Güveç 風味餐\n晚: 旅館土式套餐\n宿: HILTON GARDEN INN SAFRANBOLU",
    outfit: "早晚偏涼，山城鵝卵石路多，穿厚底防滑球鞋，備防風外套。",
    tips: "古城石板路略滑，拉行李箱時請留意滾輪。"
  },
  {
    day: "Day 3",
    date: "2026/10/10 (六)",
    title: "首都安卡拉紀行 ｜ 奇幻卡巴德基亞之夜",
    bgImage: "https://images.unsplash.com/photo-1627918544976-905e940e4fbc?auto=format&fit=crop&w=800&q=80",
    temp: "8-19°C",
    flight: "",
    alert: "今日午後長途驅車前往卡巴德基亞（約4小時）。",
    points: [
      { name: "阿塔圖爾克紀念館", desc: "參觀融匯古今現代建築傑作，向土耳其國父凱末爾致敬的莊嚴陵寢。" },
      { name: "凱末爾博物館", desc: "珍藏國父生前親筆信函、肖像與隨身歷史物件，感受人民深厚的愛戴。" },
      { name: "土耳其之夜", desc: "晚間於天然岩穴旅館欣賞傳統民俗舞蹈與肚皮舞秀，無限暢飲獅子奶酒。" }
    ],
    gridImages: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1588716301323-5e8d6f3e1a0c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=400&q=80"
    ],
    mustBuyEat: "天然果乾、熱氣球紀念品\n傳統香料烤雞翅、獅子奶酒",
    mealsSleep: "午: 香料烤翅風味餐\n晚: 旅館自助式\n宿: KALSEDON CAVE HOTEL",
    outfit: "高原日夜溫差極大，夜間外出請穿著保暖針織衫或輕羽絨外套。",
    tips: "獅子奶酒酒精濃度高且後勁強，建議酌量飲用；岩穴旅館格局略有差異。"
  },
  {
    day: "Day 4",
    date: "2026/10/11 (日)",
    title: "奇岩仙境深入探索 ｜ 基督徒地下城傳奇",
    bgImage: "https://images.unsplash.com/photo-1643194834460-e85d95b528b1?auto=format&fit=crop&w=800&q=80",
    temp: "6-18°C",
    flight: "",
    alert: "地下城極窄需彎腰前行，幽閉恐懼或行動不便者請自行評估。",
    points: [
      { name: "哥樂美露天博物館", desc: "探訪開鑿於奇特地貌的洞窟修道院，讚嘆托卡裏教堂拜占庭壁畫。" },
      { name: "精靈煙囪奇景", desc: "乘車巡禮蘑菇谷、駱駝岩、烏其莎城堡與鴿子谷。" },
      { name: "基督徒地下城", desc: "鑽入深埋地底的避難迷宮，驚嘆垂直循環通氣孔與兩噸重石門。" },
      { name: "傳統工藝巡禮", desc: "參觀百年地毯編織教學、珠寶工藝，品嚐道地咖啡。" }
    ],
    gridImages: [
      "https://images.unsplash.com/photo-1628126079986-e822df3b9e4d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1681729056230-01183204de55?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1589924513164-3be88b48f98d?auto=format&fit=crop&w=400&q=80"
    ],
    mustBuyEat: "綠松石、手工地毯\n傳統烤羊肉、土耳其冰淇淋",
    mealsSleep: "午: 傳統烤羊肉風味餐\n晚: 旅館自助式\n宿: KALSEDON CAVE HOTEL",
    outfit: "清晨若搭熱氣球需備毛帽與防風手套；白天洋蔥式穿搭。",
    tips: "參觀地毯坊無意願微笑道別即可；下午茶與冰淇淋為特別招待。"
  }
];