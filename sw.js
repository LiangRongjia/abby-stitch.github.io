const swVersion = "abby's v2"
const cacheName = swVersion
const contentToCacheWhenInstall = []
const cacheWhitelist = [cacheName]

// install -> 写缓存
self.addEventListener('install', (e) => {
    console.log('[Service Worker] 安装')
    e.waitUntil((async () => {
        console.log('[Service Worker] 缓存文件')
        const cache = await caches.open(cacheName)
        await cache.addAll(contentToCacheWhenInstall)
    })())
});

// fetch -> 读缓存 || 继续 fecth
self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const responseInCache = await caches.match(e.request)
        if (responseInCache) {
            console.log(`[Service Worker] 取缓存: ${e.request.url}`)
            return responseInCache
        } else {
            console.log(`[Service Worker] 发送请求: ${e.request.url}`)
            const response = await fetch(e.request)
            const cache = await caches.open(cacheName)
            cache.put(e.request, response.clone())
            return response
        }
    })())
})

// 激活 -> 上代缓存
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(keyList.map(key =>
                cacheWhitelist.indexOf(key) === -1 && caches.delete(key)
            ))
        )
    );
});