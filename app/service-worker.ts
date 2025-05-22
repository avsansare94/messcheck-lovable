/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = "messcheck-v1"

// Add list of files to cache here.
const urlsToCache = [
  "/",
  "/home",
  "/explore",
  "/my-mess",
  "/profile",
  "/login",
  "/onboarding",
  "/add-mess",
  "/manifest.json",
  "/offline",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response
        }
        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
      })
      .catch(() => {
        // If both cache and network fail, show offline page
        if (event.request.mode === "navigate") {
          return caches.match("/offline")
        }
        return new Response("Network error happened", {
          status: 408,
          headers: { "Content-Type": "text/plain" },
        })
      }),
  )
})

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
          return null
        }),
      )
    }),
  )
})

// Handle push notifications
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {}
  const title = data.title || "MessCheck"
  const options = {
    body: data.body || "New notification from MessCheck",
    icon: "/icon-192.png",
    badge: "/badge-icon.png",
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) {
            return client.focus()
          }
        }
        if (clients.openWindow) {
          return clients.openWindow("/")
        }
      }),
  )
})
