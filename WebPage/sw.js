const CACHE_NAME = 'travel-plan-v1';
const ASSETS = [];

// 安裝時快取核心檔案
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// 啟動時清理舊快取
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            })
        )).then(() => self.clients.claim())
    );
});

// 攔截請求：採用 Stale-While-Revalidate 策略 (若有快取先用快取，背景再抓取最新版本)
self.addEventListener('fetch', event => {
    // 略過非 GET 請求或 chrome-extension 等跨域不相容請求
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            const fetchPromise = fetch(event.request).then(networkResponse => {
                // 如果抓取成功，更新快取
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(error => {
                // 離線且無快取時的處理 (可以回傳靜態離線頁面，此處維持現狀)
                console.warn('Offline fetch failed:', event.request.url);
            });

            // 如果有快取就直接回傳 (提升載入速度與支援離線)，同時背景發送 fetch 請求更新快取
            return cachedResponse || fetchPromise;
        })
    );
});
