// XZenPress Service Worker - Versão HTTPS Segura
const CACHE_NAME = 'xzenpress-v2.3.1';
const STATIC_CACHE = 'xzenpress-static-v2.3.1';
const DYNAMIC_CACHE = 'xzenpress-dynamic-v2.3.1';

// Verificar se está em ambiente HTTPS
const isHTTPS = self.location.protocol === 'https:' || 
               self.location.hostname === 'localhost' || 
               self.location.hostname === '127.0.0.1';

// Assets estáticos para cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Logo Xzenpress oficial.png',
  '/sounds/ocean.mp3',
  '/sounds/rain.mp3'
];

// URLs de API para cache dinâmico
const API_URLS = [
  '/api/',
  'https://api.stripe.com/',
  'https://www.google-analytics.com/'
];

// Instalar Service Worker apenas em HTTPS
self.addEventListener('install', (event) => {
  console.log('🔧 XZenPress SW: Instalando...');
  
  if (!isHTTPS) {
    console.warn('⚠️ Service Worker requer HTTPS. Pulando instalação.');
    return;
  }
  
  event.waitUntil(
    Promise.all([
      // Cache estático
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('📦 Cacheando assets estáticos...');
        return cache.addAll(STATIC_ASSETS.map(url => {
          return new Request(url, { cache: 'reload' });
        }));
      }),
      
      // Cache dinâmico vazio
      caches.open(DYNAMIC_CACHE)
    ]).then(() => {
      console.log('✅ XZenPress SW: Instalação completa');
      return self.skipWaiting();
    }).catch((error) => {
      console.error('❌ Erro na instalação do SW:', error);
    })
  );
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 XZenPress SW: Ativando...');
  
  if (!isHTTPS) {
    console.warn('⚠️ Service Worker requer HTTPS. Pulando ativação.');
    return;
  }
  
  event.waitUntil(
    Promise.all([
      // Limpar caches antigos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== CACHE_NAME) {
              console.log('🗑️ Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Assumir controle de todas as abas
      self.clients.claim()
    ]).then(() => {
      console.log('✅ XZenPress SW: Ativação completa');
    })
  );
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  // Só processar em HTTPS
  if (!isHTTPS) {
    return;
  }
  
  const request = event.request;
  const url = new URL(request.url);
  
  // Ignorar requisições não-HTTP
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Estratégia de cache baseada no tipo de recurso
  if (request.method === 'GET') {
    event.respondWith(handleGetRequest(request, url));
  }
});

async function handleGetRequest(request, url) {
  try {
    // 1. Assets estáticos - Cache First
    if (STATIC_ASSETS.some(asset => url.pathname === asset || url.pathname.endsWith(asset))) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // 2. APIs - Network First
    if (API_URLS.some(apiUrl => url.href.includes(apiUrl))) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }
    
    // 3. Imagens e assets - Cache First com fallback
    if (request.destination === 'image' || 
        url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // 4. Scripts e estilos - Stale While Revalidate
    if (request.destination === 'script' || 
        request.destination === 'style' ||
        url.pathname.match(/\.(js|css)$/)) {
      return await staleWhileRevalidate(request, STATIC_CACHE);
    }
    
    // 5. Navegação - Network First com fallback para index.html
    if (request.mode === 'navigate') {
      return await networkFirstWithFallback(request);
    }
    
    // 6. Outros recursos - Network First
    return await networkFirst(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.error('❌ Erro no fetch SW:', error);
    
    // Fallback para navegação
    if (request.mode === 'navigate') {
      const cachedResponse = await caches.match('/index.html');
      return cachedResponse || new Response('Offline', { status: 503 });
    }
    
    return new Response('Recurso indisponível', { status: 503 });
  }
}

// Estratégia Cache First
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok && networkResponse.status < 400) {
      const cache = await caches.open(cacheName);
      // Verificar se a response pode ser clonada e não foi consumida
      if (networkResponse.body && !networkResponse.bodyUsed) {
        try {
          const responseClone = networkResponse.clone();
          cache.put(request, responseClone);
        } catch (cloneError) {
          console.warn('⚠️ Não foi possível cachear:', request.url, cloneError);
        }
      }
    }
    return networkResponse;
  } catch (error) {
    console.warn('⚠️ Falha na rede para:', request.url);
    throw error;
  }
}

// Estratégia Network First
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok && networkResponse.status < 400) {
      const cache = await caches.open(cacheName);
      // Verificar se a response pode ser clonada e não foi consumida
      if (networkResponse.body && !networkResponse.bodyUsed) {
        try {
          const responseClone = networkResponse.clone();
          cache.put(request, responseClone);
        } catch (cloneError) {
          console.warn('⚠️ Não foi possível cachear:', request.url, cloneError);
        }
      }
    }
    return networkResponse;
  } catch (error) {
    console.warn('⚠️ Falha na rede, buscando cache para:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const networkResponsePromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok && networkResponse.status < 400) {
      const cache = await caches.open(cacheName);
      // Verificar se a response pode ser clonada e não foi consumida
      if (networkResponse.body && !networkResponse.bodyUsed) {
        try {
          const responseClone = networkResponse.clone();
          cache.put(request, responseClone);
        } catch (cloneError) {
          console.warn('⚠️ Não foi possível cachear:', request.url, cloneError);
        }
      }
    }
    return networkResponse;
  }).catch(() => {
    // Ignorar erros de rede silenciosamente
  });
  
  return cachedResponse || await networkResponsePromise;
}

// Network First com fallback para SPA
async function networkFirstWithFallback(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.warn('⚠️ Falha na navegação, usando fallback SPA');
    const cachedResponse = await caches.match('/index.html');
    return cachedResponse || new Response('App offline', { 
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Mensagens do Service Worker
self.addEventListener('message', (event) => {
  if (!isHTTPS) {
    return;
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Notificações Push (futuro)
self.addEventListener('push', (event) => {
  if (!isHTTPS) {
    return;
  }
  
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação do XZenPress',
    icon: '/Logo Xzenpress oficial.png',
    badge: '/Logo Xzenpress oficial.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Abrir App',
        icon: '/Logo Xzenpress oficial.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/Logo Xzenpress oficial.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('XZenPress', options)
  );
});

// Clique em notificações
self.addEventListener('notificationclick', (event) => {
  if (!isHTTPS) {
    return;
  }
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('🌟 XZenPress Service Worker carregado - Versão:', CACHE_NAME);