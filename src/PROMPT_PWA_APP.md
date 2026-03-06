# 📱 Prompt completo para implementar PWA en app.wearehersafe.com

Copia y pega este prompt a tu IA para implementar la funcionalidad PWA completa en tu proyecto **app.wearehersafe.com** (React + Vite).

---

## 🎯 Contexto

Necesito implementar funcionalidad PWA (Progressive Web App) en mi proyecto React + Vite para permitir que los usuarios instalen la app en sus móviles (Android e iOS).

**Requisitos:**
- ✅ **Android:** Mostrar modal con botón que dispara el prompt nativo de instalación
- ✅ **iOS:** Mostrar modal con instrucciones paso a paso (Safari no soporta prompt automático)
- ✅ **Desktop:** Redirigir sin mostrar modal
- ✅ **Botón de instalación:** Añadir un botón "Instalar HerSafe" en la interfaz
- ✅ **Redirección post-instalación:** Después de instalar, redirigir a `/auth`

---

## 📋 Archivos a crear/modificar

### **1. Crear `/public/manifest.json`**

```json
{
  "name": "HerSafe - Tu comunidad segura",
  "short_name": "HerSafe",
  "description": "Plataforma digital para mujeres que combina seguridad, salud y bienestar",
  "start_url": "/auth",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#0365ff",
  "orientation": "portrait-primary",
  "scope": "/",
  "icons": [
    {
      "src": "https://i.imgur.com/8FjoGdH.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "https://i.imgur.com/LOPjDcG.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["health", "lifestyle", "social"],
  "lang": "es",
  "dir": "ltr"
}
```

---

### **2. Crear `/public/sw.js` (Service Worker)**

```javascript
// Service Worker para HerSafe PWA
const CACHE_NAME = 'hersafe-app-v1';
const urlsToCache = [
  '/',
  '/auth',
  '/index.html'
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
```

---

### **3. Modificar `/index.html`**

Añade estas líneas en el `<head>`:

```html
<!-- PWA Meta Tags -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#0365ff">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="HerSafe">
<link rel="apple-touch-icon" href="https://i.imgur.com/LOPjDcG.png">
```

Añade esto **ANTES del cierre de `</body>`** (después de `<div id="root"></div>`):

```html
<!-- Contenedor para modales PWA (fuera de React) -->
<div id="modal-root"></div>

<!-- Registro del Service Worker -->
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registrado:', registration.scope);
        })
        .catch((error) => {
          console.error('❌ Service Worker falló:', error);
        });
    });
  }
</script>
```

---

### **4. Crear `/src/components/PWAContext.tsx`**

```tsx
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAContextType {
  promptInstall: () => Promise<{ outcome: 'accepted' | 'dismissed' }>;
  canInstall: boolean;
  isInstalled: boolean;
  isMobile: boolean;
  platform: 'ios' | 'android' | 'desktop';
  showModal: boolean;
  handleInstallClick: () => void;
  closeModal: () => void;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export function PWAProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('android');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Detectar si ya está instalado
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isNavigatorStandalone = (window.navigator as any).standalone === true;
      return isStandalone || isNavigatorStandalone;
    };

    setIsInstalled(checkIfInstalled());

    // Detectar plataforma
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isMobileDevice = isIOS || isAndroid || window.innerWidth <= 768;

    setIsMobile(isMobileDevice);

    if (isIOS) {
      setPlatform('ios');
    } else if (isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    console.log('🔍 PWA: Platform detection', {
      userAgent,
      isIOS,
      isAndroid,
      isMobileDevice,
      platform: isIOS ? 'ios' : isAndroid ? 'android' : 'desktop'
    });

    // Capturar el evento beforeinstallprompt (solo en Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log('📱 PWA: beforeinstallprompt event captured');
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detectar cuando la app se instala
    const handleAppInstalled = () => {
      console.log('✅ PWA: App installed successfully');
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) {
      console.log('⚠️ PWA: No deferred prompt available');
      return { outcome: 'dismissed' as const };
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log(`📱 PWA: User choice - ${choiceResult.outcome}`);
      
      setDeferredPrompt(null);
      
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setShowModal(false);
      }
      
      return choiceResult;
    } catch (error) {
      console.error('❌ PWA: Error prompting install:', error);
      return { outcome: 'dismissed' as const };
    }
  };

  const handleInstallClick = () => {
    console.log('🔍 PWA: handleInstallClick called', { isMobile, isInstalled, platform });
    
    // Si ya está instalado, no hacer nada
    if (isInstalled) {
      console.log('ℹ️ PWA: App already installed');
      return;
    }
    
    // Si NO es móvil, no mostrar modal (no tiene sentido instalar en desktop)
    if (!isMobile) {
      console.log('ℹ️ PWA: Desktop detected - no install prompt');
      return;
    }
    
    // En móvil (iOS y Android), mostrar modal
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <PWAContext.Provider
      value={{
        promptInstall,
        canInstall: !isInstalled && (platform === 'android' ? !!deferredPrompt : platform === 'ios'),
        isInstalled,
        isMobile,
        platform,
        showModal,
        handleInstallClick,
        closeModal
      }}
    >
      {children}
    </PWAContext.Provider>
  );
}

export function usePWAInstall() {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWAInstall must be used within PWAProvider');
  }
  return context;
}
```

---

### **5. Crear `/src/components/PWAInstallModal.tsx`**

```tsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Download, Share } from "lucide-react";
import { usePWAInstall } from "./PWAContext";

// Obtener o crear el contenedor modal-root
let modalRoot: HTMLElement | null = null;

function getModalRoot() {
  if (!modalRoot) {
    modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'modal-root';
      document.body.appendChild(modalRoot);
    }
  }
  return modalRoot;
}

export function PWAInstallModal() {
  const { showModal, closeModal, promptInstall } = usePWAInstall();
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('android');
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Detectar plataforma
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isIOS) {
      setPlatform('ios');
    } else if (isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }
  }, []);

  const handleInstallClick = () => {
    console.log('🔍 Modal: handleInstallClick called', { platform });
    
    if (platform === 'ios') {
      // En iOS: Mostrar instrucciones en el modal
      setShowInstructions(true);
    } else if (platform === 'android') {
      console.log('🔍 Modal: Calling promptInstall for Android');
      
      // Disparar prompt nativo de Android
      const result = promptInstall();
      
      // Log del resultado
      result.then((choice) => {
        console.log('🔍 Modal: Install prompt result:', choice);
      });
      
      // Cerrar el modal después de disparar el prompt
      setTimeout(() => {
        closeModal();
      }, 300);
    }
  };

  // Resetear al cerrar
  useEffect(() => {
    if (!showModal) {
      setShowInstructions(false);
    }
  }, [showModal]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (showModal) {
      const savedScrollY = window.scrollY;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      const timeoutId = setTimeout(() => {
        const preventScroll = (e: Event) => e.preventDefault();
        const preventKeys = (e: KeyboardEvent) => {
          const scrollKeys = ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'];
          if (scrollKeys.includes(e.code)) e.preventDefault();
        };
        
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        window.addEventListener('keydown', preventKeys, { passive: false });
        
        (window as any).__pwaScrollCleanup = { preventScroll, preventKeys };
      }, 400);
      
      return () => {
        clearTimeout(timeoutId);
        const cleanup = (window as any).__pwaScrollCleanup;
        if (cleanup) {
          window.removeEventListener('wheel', cleanup.preventScroll);
          window.removeEventListener('touchmove', cleanup.preventScroll);
          window.removeEventListener('keydown', cleanup.preventKeys);
          delete (window as any).__pwaScrollCleanup;
        }
        window.scrollTo(0, savedScrollY);
      };
    }
  }, [showModal]);

  if (!showModal) return null;

  const modalContent = (
    <div
      style={{
        pointerEvents: 'auto',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999999,
      }}
    >
      {/* Overlay oscuro */}
      <div
        onClick={closeModal}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal centrado */}
      <div
        style={{
          position: 'relative',
          width: 'calc(100% - 32px)',
          maxWidth: '420px',
          maxHeight: '90dvh',
          backgroundColor: '#0365ff',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          zIndex: 2,
          overflow: 'auto',
        }}
      >
        {/* Botón cerrar X */}
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            color: 'rgba(255, 255, 255, 0.8)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            transition: 'color 0.2s',
          }}
          aria-label="Cerrar"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        {!showInstructions ? (
          // Vista inicial
          <div style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
            {/* Título */}
            <h2 
              style={{ 
                color: 'white',
                fontSize: 'clamp(22px, 5.5vw, 26px)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 700,
                lineHeight: '1.2'
              }}
            >
              {platform === 'ios' 
                ? 'Añade HerSafe a tu iPhone' 
                : 'Lleva HerSafe contigo'
              }
            </h2>

            {/* Descripción */}
            <p 
              style={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: 'clamp(15px, 4vw, 17px)',
                marginBottom: '32px',
                lineHeight: '1.5',
              }}
            >
              {platform === 'ios'
                ? 'Sigue estas instrucciones para añadir HerSafe a tu pantalla de inicio'
                : 'Accede a tu comunidad con un solo toque desde tu pantalla de inicio'
              }
            </p>

            {/* Botones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Botón principal */}
              <button
                onClick={handleInstallClick}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  backgroundColor: 'white',
                  color: '#0365ff',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: 'clamp(15px, 4vw, 16px)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                }}
              >
                <Download size={20} strokeWidth={2.5} />
                Añadir a mi móvil
              </button>

              {/* Botón secundario */}
              <button
                onClick={closeModal}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: 'clamp(15px, 4vw, 16px)',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                }}
              >
                Ahora no
              </button>
            </div>
          </div>
        ) : (
          // Vista de instrucciones iOS (5 pasos)
          <div style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
            <h2 
              style={{ 
                color: 'white',
                fontSize: 'clamp(22px, 5.5vw, 26px)',
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 700
              }}
            >
              Cómo instalar en iPhone
            </h2>

            {/* 5 Pasos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px', textAlign: 'left' }}>
              {/* PASO 1 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  flexShrink: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '14px',
                }}>
                  1
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: 'clamp(16px, 4vw, 18px)', flex: 1 }}>
                  <p style={{ margin: 0, lineHeight: '1.5' }}>
                    Toca los <strong style={{ color: 'white' }}>tres puntitos (...)</strong> en la barra de Safari
                  </p>
                </div>
              </div>

              {/* PASO 2 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  flexShrink: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '14px',
                }}>
                  2
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: 'clamp(16px, 4vw, 18px)', flex: 1 }}>
                  <p style={{ margin: 0, lineHeight: '1.5' }}>
                    Selecciona el botón <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: '6px', margin: '0 4px', verticalAlign: 'middle' }}><Share size={14} /></span> <strong style={{ color: 'white' }}>Compartir</strong>
                  </p>
                </div>
              </div>

              {/* PASO 3 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  flexShrink: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '14px',
                }}>
                  3
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: 'clamp(16px, 4vw, 18px)', flex: 1 }}>
                  <p style={{ margin: 0, lineHeight: '1.5' }}>
                    Desplázate y toca <strong style={{ color: 'white' }}>Más (...)</strong> para ver todas las opciones
                  </p>
                </div>
              </div>

              {/* PASO 4 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  flexShrink: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '14px',
                }}>
                  4
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: 'clamp(16px, 4vw, 18px)', flex: 1 }}>
                  <p style={{ margin: 0, lineHeight: '1.5' }}>
                    Selecciona <strong style={{ color: 'white' }}>"Añadir a la pantalla de inicio"</strong>
                  </p>
                </div>
              </div>

              {/* PASO 5 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  flexShrink: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '14px',
                }}>
                  5
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: 'clamp(16px, 4vw, 18px)', flex: 1 }}>
                  <p style={{ margin: 0, lineHeight: '1.5' }}>
                    Confirma con <strong style={{ color: 'white' }}>"Añadir"</strong> y ¡listo!
                  </p>
                </div>
              </div>
            </div>

            {/* Botón entendido */}
            <button
              onClick={closeModal}
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: 'white',
                color: '#0365ff',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: 'clamp(15px, 4vw, 16px)',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
              }}
            >
              ENTENDIDO
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, getModalRoot());
}
```

---

### **6. Modificar `/src/App.tsx`**

Wrap tu app con el PWAProvider:

```tsx
import { PWAProvider } from './components/PWAContext';
import { PWAInstallModal } from './components/PWAInstallModal';

function App() {
  return (
    <PWAProvider>
      {/* Tu contenido actual de la app */}
      <YourAppContent />
      
      {/* Modal PWA (se renderiza en #modal-root) */}
      <PWAInstallModal />
    </PWAProvider>
  );
}

export default App;
```

---

### **7. Crear botón de instalación (ejemplo)**

En cualquier componente donde quieras mostrar el botón de instalación:

```tsx
import { usePWAInstall } from './components/PWAContext';
import { Download } from 'lucide-react';

function YourComponent() {
  const { handleInstallClick, canInstall, isInstalled } = usePWAInstall();

  // No mostrar el botón si ya está instalada
  if (isInstalled) return null;

  // Solo mostrar en móviles donde se puede instalar
  if (!canInstall) return null;

  return (
    <button
      onClick={handleInstallClick}
      style={{
        padding: '12px 24px',
        backgroundColor: '#0365ff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Download size={20} />
      Instalar HerSafe
    </button>
  );
}
```

---

### **8. (Opcional) Crear `vercel.json` para asegurar que Vercel sirva correctamente los archivos**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "framework": null,
  "installCommand": "npm install",
  "headers": [
    {
      "source": "/manifest.json",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/manifest+json"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/javascript"
        },
        {
          "key": "Cache-Control",
          "value": "no-cache"
        }
      ]
    }
  ]
}
```

---

## 📦 Instalar dependencias (si no las tienes)

```bash
npm install lucide-react
```

---

## 🧪 Probar en local

1. **Instala HTTPS local** (las PWAs requieren HTTPS):
   ```bash
   npm install -D @vitejs/plugin-basic-ssl
   ```

2. **Modifica `vite.config.ts`:**
   ```ts
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import basicSsl from '@vitejs/plugin-basic-ssl'

   export default defineConfig({
     plugins: [react(), basicSsl()],
     server: {
       https: true
     }
   })
   ```

3. **Ejecuta el servidor:**
   ```bash
   npm run dev
   ```

4. **Abre en Chrome:**
   - Ve a `https://localhost:5173` (o el puerto que use Vite)
   - Acepta el certificado autofirmado
   - Presiona F12 → Application → Manifest (verifica que se cargue)
   - Presiona F12 → Application → Service Workers (verifica que esté activo)

---

## ✅ Checklist final

- [ ] `/public/manifest.json` creado
- [ ] `/public/sw.js` creado
- [ ] `/index.html` modificado con meta tags y script del service worker
- [ ] `/src/components/PWAContext.tsx` creado
- [ ] `/src/components/PWAInstallModal.tsx` creado
- [ ] `/src/App.tsx` modificado con `<PWAProvider>` y `<PWAInstallModal>`
- [ ] Botón de instalación añadido en tu UI
- [ ] Probado en **local con HTTPS**
- [ ] Probado en **producción (Vercel)** con Android
- [ ] Probado en **producción (Vercel)** con iOS

---

## 🚀 Deploy a Vercel

1. **Haz commit y push a GitHub:**
   ```bash
   git add .
   git commit -m "feat: add PWA functionality"
   git push origin main
   ```

2. **Vercel detectará los cambios automáticamente** y desplegará

3. **Prueba en tu móvil:**
   - Abre `https://app.wearehersafe.com` en Chrome (Android) o Safari (iOS)
   - Presiona el botón "Instalar HerSafe"
   - **Android:** Verás el prompt nativo
   - **iOS:** Verás las instrucciones paso a paso

---

## 📱 Resultado esperado

### **Android:**
1. Click en "Instalar HerSafe" → Modal aparece
2. Click en "AÑADIR A MI MÓVIL" → Prompt nativo de Chrome
3. Click en "Instalar" → App se instala
4. Ícono aparece en pantalla de inicio
5. Al abrir la app → Redirige a `/auth`

### **iOS:**
1. Click en "Instalar HerSafe" → Modal aparece
2. Click en "AÑADIR A MI MÓVIL" → Instrucciones de 5 pasos
3. Sigue los pasos manualmente en Safari
4. Ícono aparece en pantalla de inicio
5. Al abrir la app → Redirige a `/auth`

---

## 🆘 Troubleshooting

### **❌ "No aparece el prompt de instalación en Android"**
- Verifica que estés en **HTTPS**
- Verifica que el **Service Worker** esté registrado (F12 → Application → Service Workers)
- Verifica que el **Manifest** se cargue correctamente (F12 → Application → Manifest)
- Si ya instalaste la app antes, **desinstálala** y prueba de nuevo

### **❌ "Service Worker no se registra"**
- Verifica que `/public/sw.js` exista
- Verifica que la consola no muestre errores
- Limpia caché: F12 → Application → Clear storage

### **❌ "Modal no aparece"**
- Verifica que `<div id="modal-root"></div>` exista en `/index.html`
- Verifica que `<PWAInstallModal />` esté dentro de `<PWAProvider>`

---

¡Listo! Con este prompt tienes todo lo necesario para implementar la PWA completa en `app.wearehersafe.com` 🎉
