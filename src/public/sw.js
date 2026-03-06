// Service Worker para HerSafe PWA
const CACHE_NAME = 'hersafe-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/instructores'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('✅ Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('❌ Service Worker: Cache failed', error);
      })
  );
  
  // Activar inmediatamente
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Tomar control inmediato
  return self.clients.claim();
});

// Estrategia de caché: Network First (priorizar red, fallback a caché)
self.addEventListener('fetch', (event) => {
  // Solo cachear solicitudes GET
  if (event.request.method !== 'GET') return;
  
  // Ignorar solicitudes a dominios externos específicos
  const url = new URL(event.request.url);
  if (
    url.origin.includes('wearehersafe.com') === false &&
    url.origin !== location.origin
  ) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, clonarla y guardarla en caché
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar desde caché
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              console.log('📦 Service Worker: Serving from cache', event.request.url);
              return cachedResponse;
            }
            // Si no está en caché y es una navegación, devolver la página principal
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

console.log('✅ Service Worker: Loaded');
