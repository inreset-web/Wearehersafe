# 🚀 Flujo Completo PWA - HerSafe

## 📱 Flujo en Android Chrome

### **Escenario 1: Usuario instala la PWA**

```
1. Usuario abre → https://wearehersafe.com (landing)
   ↓
2. Presiona botón → "UNIRME" o "ACCEDE A HERSAFE"
   ↓
3. Modal aparece → "AÑADIR A MI MÓVIL"
   ↓
4. Usuario presiona → "AÑADIR A MI MÓVIL"
   ↓
5. Prompt nativo → "Añadir HerSafe a la pantalla de inicio"
   ↓
6. Usuario confirma → App instalada ✅
   ↓
7. Evento 'appinstalled' → Redirige después de 1 segundo
   ↓
8. Usuario llega a → https://app.wearehersafe.com/auth
```

**Código responsable:**
```typescript
// /components/PWAContext.tsx (líneas 71-74)
window.addEventListener('appinstalled', () => {
  setTimeout(() => {
    window.location.href = 'https://app.wearehersafe.com/auth';
  }, 1000);
});
```

---

### **Escenario 2: Usuario abre la app instalada desde su pantalla de inicio**

```
1. Usuario toca ícono → HerSafe (en pantalla de inicio)
   ↓
2. manifest.json define → start_url: "/"
   ↓
3. App se abre en → https://wearehersafe.com (landing)
   ↓
4. App.tsx detecta → modo standalone (display-mode: standalone)
   ↓
5. useEffect ejecuta → Redirección inmediata
   ↓
6. Usuario llega a → https://app.wearehersafe.com/auth
```

**Código responsable:**
```typescript
// /App.tsx (líneas 55-64)
useEffect(() => {
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true; // iOS

  if (isStandalone) {
    console.log("📱 PWA detectada en modo standalone → Redirigiendo a app...");
    window.location.href = "https://app.wearehersafe.com/auth";
  }
}, []);
```

---

## 🍎 Flujo en iOS Safari

### **Escenario: Usuario añade a pantalla de inicio (manual)**

```
1. Usuario abre → https://wearehersafe.com (landing)
   ↓
2. Presiona botón → "UNIRME" o "ACCEDE A HERSAFE"
   ↓
3. Modal aparece → Instrucciones de instalación manual
   ↓
4. Usuario sigue pasos → "Compartir" → "Añadir a pantalla de inicio"
   ↓
5. App instalada → Ícono en pantalla de inicio ✅
   ↓
6. Usuario toca ícono → App se abre en modo standalone
   ↓
7. App.tsx detecta → (window.navigator as any).standalone === true
   ↓
8. useEffect ejecuta → Redirección inmediata
   ↓
9. Usuario llega a → https://app.wearehersafe.com/auth
```

**Código responsable:**
```typescript
// /App.tsx - Mismo código que Android
useEffect(() => {
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true; // ← Detecta iOS

  if (isStandalone) {
    window.location.href = "https://app.wearehersafe.com/auth";
  }
}, []);
```

---

## 💻 Flujo en Desktop

### **Escenario: Usuario en navegador de escritorio**

```
1. Usuario abre → https://wearehersafe.com (landing)
   ↓
2. Presiona botón → "UNIRME" o "ACCEDE A HERSAFE"
   ↓
3. PWAContext detecta → No es móvil
   ↓
4. NO muestra modal → Redirige directo a la app
   ↓
5. Usuario llega a → https://app.wearehersafe.com/auth (en nueva pestaña)
```

**Código responsable:**
```typescript
// /components/Header.tsx (ejemplo)
<button 
  onClick={() => {
    window.open("https://app.wearehersafe.com/auth", "_blank");
  }}
>
  ACCEDE A HERSAFE
</button>
```

---

## ✅ Resumen: El usuario SIEMPRE llega a la app

| Dispositivo | Acción | Resultado Final |
|------------|--------|-----------------|
| 📱 Android | Instala PWA → Abre inmediatamente | → `app.wearehersafe.com/auth` |
| 📱 Android | Abre ícono instalado | → `app.wearehersafe.com/auth` |
| 🍎 iOS | Añade a pantalla → Abre ícono | → `app.wearehersafe.com/auth` |
| 💻 Desktop | Click en botón | → `app.wearehersafe.com/auth` |

**Ningún usuario se queda en la landing después de instalar** ✅

---

## 🔧 Por qué `start_url: "/"` y no la URL completa

**Problema anterior:**
```json
"start_url": "https://app.wearehersafe.com/auth"
```
❌ Chrome bloqueaba `beforeinstallprompt` por cross-origin

**Solución actual:**
```json
"start_url": "/"
```
✅ Chrome permite instalación (mismo origen)
✅ Redirección manual en App.tsx → Usuario llega a la app de todos modos

---

## 🧪 Cómo probar

### **Prueba 1: Instalación**
1. Abre `wearehersafe.com` en Android Chrome
2. Presiona "UNIRME"
3. Modal aparece → "AÑADIR A MI MÓVIL"
4. Instala
5. **Verifica:** ¿Redirige a `app.wearehersafe.com/auth`? ✅

### **Prueba 2: Abrir app instalada**
1. Toca el ícono "HerSafe" en tu pantalla de inicio
2. **Verifica:** ¿Se abre directamente `app.wearehersafe.com/auth`? ✅
3. **NO debe:** Mostrar la landing page

### **Prueba 3: Logs de consola**
Abre Chrome DevTools → Console:
```
📱 PWA detectada en modo standalone → Redirigiendo a app...
```
Si ves este log → La redirección está funcionando ✅

---

¡El flujo está completo y optimizado! 🎉
