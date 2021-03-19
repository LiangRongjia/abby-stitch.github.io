const swVersion = "abby's v17"
const cacheName = swVersion
const contentToCacheWhenInstall = []
const cacheWhitelist = [cacheName]
const urlsDoNotCache = ['chrome-extension://']

// install -> 写缓存
self.addEventListener('install', (e) => {
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName)
            await cache.addAll(contentToCacheWhenInstall)
        })()
    )
})

// fetch -> 读缓存 || 继续 fecth
self.addEventListener('fetch', (e) => {
    e.respondWith(
        (async () => {
            const responseInCache = await caches.match(e.request)
            if (responseInCache) {
                return responseInCache
            }
            else {
                const response = await fetch(e.request)
                if (urlsDoNotCache.every(url => !e.request.url.includes(url))) {
                    const cache = await caches.open(cacheName)
                    cache.put(e.request, response.clone())
                }
                return response
            }
        })()
    )
})

// 激活 -> 清除上代缓存
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(keyList.map(key =>
                cacheWhitelist.indexOf(key) === -1 && caches.delete(key)
            ))
        )
    )
})