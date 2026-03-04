# 📱 PWA - Instalación desde móviles - HerSafe

## ✅ Cambios completados

He implementado la funcionalidad PWA (Progressive Web App) para que todos los botones de acceso a la app ("UNIRME", "ACCEDE A HERSAFE", "DESCUBRE HERSAFE") en móviles muestren un modal de instalación antes de redirigir.

**✅ NUEVO:** El modal ahora aparece centrado en la pantalla visible (fixed positioning) sin necesidad de hacer scroll.

### Archivos creados:

1. **/components/PWAContext.tsx** - Context Provider global para manejar PWA (reemplaza usePWAInstall.tsx)
2. **/components/PWAInstallModal.tsx** - Modal con diseño HerSafe y logo real del header
3. **/public/manifest.json** - Manifest PWA con información de la app
4. **/public/sw.js** - Service Worker para funcionalidad offline básica

### Archivos modificados:

1. **/index.html** - Añadido manifest, meta tags iOS, y registro del Service Worker
2. **/App.tsx** - Integrado PWAProvider y PWAInstallModal globalmente
3. **/components/HeroSection.tsx** - Botón "UNIRME" usa handleUnirmeClick
4. **/components/BenefitsSection.tsx** - Botones "ACCEDE A HERSAFE" y "DESCUBRE HERSAFE" usan handleUnirmeClick

## 🎯 Cómo funciona

### En móviles (iOS y Android):
1. Usuario hace clic en "UNIRME", "ACCEDE A HERSAFE" o "DESCUBRE HERSAFE"
2. Se muestra un modal azul (#0365ff) con el logo real de HerSafe **centrado en la pantalla visible**
3. Usuario puede elegir:
   - **"AÑADIR A MI MÓVIL"**: 
     - Android: Muestra prompt nativo de instalación
     - iOS: Muestra instrucciones paso a paso
   - **"AHORA NO"**: Redirige a app.wearehersafe.com (comportamiento actual)
   - **X (cerrar)**: Cierra el modal y permanece en la landing

### En desktop:
- Comportamiento normal: abre app.wearehersafe.com directamente

## 📋 IMPORTANTE: Subir iconos PWA al servidor

### Pasos para completar la instalación:

1. **Exportar el logo** que me enviaste (el isotipo azul de HerSafe) en dos tamaños:
   - `pwa-icon-192.png` → 192x192 píxeles
   - `pwa-icon-512.png` → 512x512 píxeles

2. **Subir los archivos** a la carpeta `/public/` en tu servidor IONOS
   - La ruta debe ser: `public/pwa-icon-192.png`
   - Y: `public/pwa-icon-512.png`

3. **Verificar** que los archivos sean accesibles en:
   - `https://wearehersafe.com/pwa-icon-192.png`
   - `https://wearehersafe.com/pwa-icon-512.png`

El `manifest.json` ya está configurado para usar estas rutas.

## 🧪 Cómo probar

### En Android:
1. Abre wearehersafe.com desde Chrome en Android
2. Haz clic en "UNIRME"
3. Verás el modal azul
4. Al hacer clic en "AÑADIR A MI MÓVIL", verás el prompt nativo de Chrome
5. Acepta y verás el icono de HerSafe en tu pantalla de inicio

### En iPhone/iPad:
1. Abre wearehersafe.com desde Safari en iOS
2. Haz clic en "UNIRME"
3. Verás el modal azul
4. Al hacer clic en "AÑADIR A MI MÓVIL", verás instrucciones paso a paso
5. Sigue las instrucciones para añadir el icono manualmente

## 🎨 Diseño del modal

El modal usa el diseño y colores de HerSafe:
- Fondo azul #0365ff
- Tipografías: Balhattan (logo), Barlow Condensed (títulos), Darker Grotesque (texto)
- Animaciones suaves con motion/react
- Responsive y táctil

## 🔧 Personalización futura

Si quieres cambiar textos del modal, edita:
- `/components/PWAInstallModal.tsx` - líneas 110-120 (título y descripción)

Si quieres cambiar la detección (solo mostrar en segundas visitas, etc):
- `/components/PWAContext.tsx` - función `handleUnirmeClick()`

## ⚙️ Funcionalidades técnicas implementadas

✅ Detección automática de plataforma (iOS/Android/Desktop)
✅ Captura del evento beforeinstallprompt (Android)
✅ Instrucciones visuales para iOS
✅ Detección de app ya instalada (no muestra modal de nuevo)
✅ Service Worker para funcionalidad offline básica
✅ Manifest PWA completo
✅ Meta tags específicos para iOS
✅ Modal con botón X para cerrar
✅ Botón "Ahora no" que redirige a la app
✅ Integración perfecta con el diseño existente

## 📱 Soporte de navegadores

- ✅ Chrome Android (soporte completo)
- ✅ Safari iOS (con instrucciones manuales)
- ✅ Samsung Internet (soporte completo)
- ✅ Firefox Android (soporte parcial)
- ✅ Edge móvil (soporte completo)

## 📞 Contacto

Si necesitas ayuda para crear los iconos o tienes dudas sobre la implementación, avísame!