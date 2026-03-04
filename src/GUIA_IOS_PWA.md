# 📱 Guía Completa: PWA de HerSafe en iOS

## ✅ Cómo Funciona en iPhone/iPad

### 1. Detección Automática de iOS
```typescript
// El código detecta automáticamente si es iOS
const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
```

### 2. Flujo de Instalación en iOS

```
Usuario abre: https://wearehersafe.com
              ↓
Presiona: "UNIRME" / "ACCEDE A HERSAFE" / "DESCUBRE HERSAFE"
              ↓
Modal azul aparece con:
  - Logo de HerSafe
  - Título: "Lleva HerSafe contigo"
  - Botón: "AÑADIR A MI MÓVIL"
              ↓
Usuario presiona "AÑADIR A MI MÓVIL"
              ↓
Segunda pantalla con instrucciones:
  1️⃣ Toca el botón Compartir 🔗 (barra inferior)
  2️⃣ Selecciona "Añadir a la pantalla de inicio"
  3️⃣ Confirma con "Añadir"
              ↓
Usuario sigue los pasos manualmente en Safari
              ↓
Icono de HerSafe aparece en pantalla de inicio
              ↓
Usuario toca el icono
              ↓
Abre en modo standalone (sin barra de Safari)
              ↓
Redirige a: https://app.wearehersafe.com/auth
```

---

## 🔧 Configuración Técnica

### 1. Manifest.json
```json
{
  "name": "HerSafe - Comunidad de Mujeres",
  "short_name": "HerSafe",
  "start_url": "https://app.wearehersafe.com/auth",
  "display": "standalone",
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
  ]
}
```

### 2. Meta Tags en index.html
```html
<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json" />

<!-- PWA iOS -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="HerSafe" />
<link rel="apple-touch-icon" href="https://i.imgur.com/8FjoGdH.png" />
```

### 3. Componente PWAContext.tsx
Maneja la lógica de detección y comportamiento:
```typescript
// Detecta iOS
const isIOS = /iphone|ipad|ipod/.test(userAgent);

// En iOS, muestra modal con instrucciones
if (isMobile && !isInstalled && isIOS) {
  setShowModal(true);
}
```

### 4. Componente PWAInstallModal.tsx
Renderiza el modal con instrucciones específicas para iOS.

---

## 🎨 Diseño del Modal en iOS

### Vista 1: Invitación a Instalar
```
┌─────────────────────────────────┐
│              ✕                  │
│                                 │
│         [Logo HerSafe]          │
│                                 │
│   Lleva HerSafe contigo         │
│                                 │
│   Accede a tu comunidad con     │
│   un solo toque desde tu        │
│   pantalla de inicio            │
│                                 │
│   ┌─────────────────────────┐   │
│   │ 📥 AÑADIR A MI MÓVIL   │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │      AHORA NO           │   │
│   └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

### Vista 2: Instrucciones (después de presionar botón)
```
┌─────────────────────────────────┐
│              ✕                  │
│                                 │
│   CÓMO INSTALAR EN IPHONE       │
│                                 │
│   1️⃣ Toca el botón [🔗]         │
│      en la barra inferior       │
│                                 │
│   2️⃣ Desplázate y selecciona    │
│      "Añadir a la pantalla      │
│      de inicio"                 │
│                                 │
│   3️⃣ Confirma con "Añadir"      │
│      y ¡listo!                  │
│                                 │
│   ┌─────────────────────────┐   │
│   │  [🔗] → [📥] → Añadir   │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │      ENTENDIDO          │   │
│   └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

---

## 🐛 Troubleshooting iOS

### ❌ Problema 1: El modal no aparece

**Síntomas:**
- Usuario presiona "UNIRME" pero no pasa nada
- No aparece el modal azul

**Causas posibles:**
1. JavaScript deshabilitado
2. Error en PWAContext
3. Portal `#modal-root` no existe

**Solución:**
```javascript
// Verificar en consola de Safari (Mac)
// 1. Abrir Safari en Mac
// 2. Develop → Conectar iPhone → Show JavaScript Console
// 3. Buscar errores en rojo

// Si dice "modal-root not found":
// Verificar que index.html tenga:
<div id="modal-root"></div>
```

---

### ❌ Problema 2: El icono se ve genérico (Safari logo)

**Síntomas:**
- Después de instalar, el icono no es el de HerSafe
- Se ve el logo de Safari o una captura de pantalla

**Causas posibles:**
1. La URL de Imgur está bloqueada
2. El icono no carga en el navegador

**Solución:**
```bash
# 1. Abrir en Safari de iPhone:
https://i.imgur.com/8FjoGdH.png

# 2. ¿Se ve la imagen? → Sí: Problema en manifest.json
#                      → No: URL bloqueada, subir a otro hosting

# 3. Verificar manifest.json:
https://wearehersafe.com/manifest.json

# 4. Debe mostrar el JSON con las URLs de Imgur
```

**Alternativa - Usar iconos locales:**
```json
// En manifest.json, cambiar:
"icons": [
  {
    "src": "/icon-192.png",
    "sizes": "192x192"
  }
]

// Y subir icon-192.png a build/
```

---

### ❌ Problema 3: Después de instalar, no redirige a la app

**Síntomas:**
- Usuario instala correctamente
- Al abrir, se queda en la landing page

**Causa:**
El `start_url` en `manifest.json` está mal configurado

**Solución:**
```json
// Verificar en src/public/manifest.json:
{
  "start_url": "https://app.wearehersafe.com/auth"
}

// Debe apuntar a tu app, NO a la landing
```

---

### ❌ Problema 4: El modal aparece pero las instrucciones están en blanco

**Síntomas:**
- Modal azul aparece
- Al presionar "AÑADIR A MI MÓVIL", la segunda pantalla está vacía

**Causa:**
Error en el estado `showInstructions` de PWAInstallModal

**Solución:**
```typescript
// Verificar en PWAInstallModal.tsx:
const [showInstructions, setShowInstructions] = useState(false);

// Al hacer clic en el botón:
if (platform === 'ios') {
  setShowInstructions(true); // Debe cambiar a true
}
```

---

### ❌ Problema 5: El modal aparece abajo y no se ve

**Síntomas:**
- Usuario presiona "UNIRME" (que está abajo en la página)
- Modal aparece pero fuera de la vista

**Causa:**
El modal se renderiza en la posición actual del scroll

**Solución:**
Ya implementado en el código:
```typescript
// PWAInstallModal.tsx hace scroll automático al top:
window.scrollTo({ top: 0, behavior: 'smooth' });

// Y al cerrar, regresa a la posición original:
window.scrollTo(0, savedScrollY);
```

---

### ❌ Problema 6: iOS no reconoce el manifest.json

**Síntomas:**
- El manifest carga en el navegador
- Pero iOS no lo detecta

**Causa:**
iOS Safari no soporta manifest.json completamente, por eso usamos meta tags

**Solución:**
Verificar que `index.html` tenga:
```html
<link rel="apple-touch-icon" href="https://i.imgur.com/8FjoGdH.png" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="HerSafe" />
```

---

## 🧪 Testing en iOS

### Opción 1: iPhone/iPad Real
1. Conectar iPhone a Mac
2. Safari en Mac → Develop → iPhone → Mostrar consola
3. Abrir `https://wearehersafe.com` en iPhone
4. Presionar "UNIRME"
5. Ver logs en consola del Mac

### Opción 2: Simulador de iOS (Mac)
1. Abrir Xcode
2. Xcode → Open Developer Tool → Simulator
3. Abrir Safari en simulador
4. Ir a `https://wearehersafe.com`
5. ⚠️ **NOTA:** El simulador NO soporta instalación real

### Opción 3: BrowserStack (Cloud)
1. Ir a https://www.browserstack.com
2. Seleccionar dispositivo iOS real
3. Probar en Safari

---

## 📋 Checklist Final iOS

Antes de considerar que funciona en iOS, verifica:

- [ ] `manifest.json` carga en `https://wearehersafe.com/manifest.json`
- [ ] Iconos de Imgur cargan correctamente en Safari iOS
- [ ] Meta tag `apple-touch-icon` está en `index.html`
- [ ] Al presionar "UNIRME", el modal azul aparece
- [ ] Al presionar "AÑADIR A MI MÓVIL", aparecen las instrucciones
- [ ] Las instrucciones están en español y son claras
- [ ] El modal hace scroll al top automáticamente
- [ ] Al cerrar el modal, regresa a la posición original
- [ ] Después de instalar manualmente, el icono de HerSafe aparece
- [ ] Al abrir desde el icono, redirige a `app.wearehersafe.com/auth`
- [ ] Se abre en modo standalone (sin barra de Safari)

---

## 🎯 Diferencias iOS vs Android

| Característica | iOS | Android |
|----------------|-----|---------|
| **Instalación** | Manual (usuario sigue instrucciones) | Automática (prompt nativo) |
| **Evento beforeinstallprompt** | ❌ No soportado | ✅ Soportado |
| **Manifest.json** | ⚠️ Parcialmente soportado | ✅ Totalmente soportado |
| **Meta tags específicos** | ✅ Necesarios (`apple-*`) | ❌ No necesarios |
| **Service Worker** | ✅ Soportado | ✅ Soportado |
| **Modo standalone** | ✅ Soportado | ✅ Soportado |
| **Icono dinámico** | ⚠️ Requiere `apple-touch-icon` | ✅ Usa manifest.json |

---

## 🔗 Referencias Útiles

- **Apple PWA Guide:** https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
- **Can I Use - Service Worker:** https://caniuse.com/serviceworkers
- **PWA Builder:** https://www.pwabuilder.com
- **Web.dev PWA Guide:** https://web.dev/progressive-web-apps/

---

¡Tu PWA de HerSafe está lista para iOS! 🍎✨
