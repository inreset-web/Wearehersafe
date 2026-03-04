# 📁 Estructura Final del Proyecto HerSafe

## ✅ Estructura Correcta Después de `setup.bat`

```
wearehersafe/
│
├── 📂 src/                          ← Todo el código React aquí
│   ├── App.tsx                      ← Componente principal
│   ├── main.tsx                     ← Punto de entrada (creado por setup.bat)
│   ├── routes.ts                    ← Configuración de rutas
│   │
│   ├── 📂 components/               ← Todos los componentes
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── PWAContext.tsx           ← Contexto PWA
│   │   ├── PWAInstallModal.tsx      ← Modal de instalación
│   │   ├── FormSection.tsx
│   │   ├── InstructorsLandingFixed.tsx
│   │   ├── PrivacyPage.tsx
│   │   ├── TermsPage.tsx
│   │   ├── SEO.tsx
│   │   └── ... (más componentes)
│   │
│   ├── 📂 styles/                   ← Estilos CSS
│   │   └── globals.css              ← Estilos globales
│   │
│   └── 📂 public/                   ⭐ CRÍTICO: Archivos PWA aquí
│       ├── manifest.json            ← Configuración PWA
│       ├── sw.js                    ← Service Worker
│       ├── instructores.html        ← Página de instructores
│       ├── _headers                 ← Headers de Vercel
│       └── _redirects               ← Redirecciones de Vercel
│
├── 📄 index.html                    ← HTML raíz (fuera de src/)
├── 📄 package.json                  ← Dependencias del proyecto
├── 📄 vite.config.ts                ← Configuración de Vite
├── 📄 vercel.json                   ← Configuración de Vercel
├── 📄 tsconfig.json                 ← Configuración TypeScript
├── 📄 .gitignore                    ← Archivos ignorados por Git
│
├── 📂 build/                        ← Carpeta generada después de compilar
│   ├── index.html                   ← HTML compilado
│   ├── manifest.json                ⭐ DEBE ESTAR AQUÍ
│   ├── sw.js                        ⭐ DEBE ESTAR AQUÍ
│   ├── instructores.html            ⭐ DEBE ESTAR AQUÍ
│   ├── _headers                     ⭐ DEBE ESTAR AQUÍ
│   ├── _redirects                   ⭐ DEBE ESTAR AQUÍ
│   └── 📂 assets/
│       ├── index-[hash].js          ← JavaScript compilado
│       ├── index-[hash].css         ← CSS compilado
│       └── ...                      ← Imágenes y otros assets
│
├── 📄 robots.txt                    ← SEO: Instrucciones para bots
├── 📄 sitemap.xml                   ← SEO: Mapa del sitio
│
└── 📄 README.md                     ← Documentación completa
└── 📄 GUIA_DEPLOY_VERCEL.md         ← Guía de despliegue
└── 📄 COMANDOS_RAPIDOS.md           ← Comandos útiles
└── 📄 setup.bat                     ← Script automático de configuración
```

---

## 🔍 Archivos Críticos para PWA

### ⭐ DEBEN estar en `build/` después de compilar:

| Archivo | Ubicación Original | Destino Final | Propósito |
|---------|-------------------|---------------|-----------|
| `manifest.json` | `src/public/manifest.json` | `build/manifest.json` | Configuración PWA (nombre, iconos, colores) |
| `sw.js` | `src/public/sw.js` | `build/sw.js` | Service Worker (caché offline) |
| `instructores.html` | `src/public/instructores.html` | `build/instructores.html` | Página de instructores |
| `_headers` | `src/public/_headers` | `build/_headers` | Configuración de headers HTTP |
| `_redirects` | `src/public/_redirects` | `build/_redirects` | Redirecciones (ruta `/instructores`) |

---

## 🎯 Qué Hace `setup.bat`

```
[1/7] Crear carpetas: src/, src/components/, src/styles/, src/public/
[2/7] Crear src/main.tsx (punto de entrada de React)
[3/7] Mover App.tsx, routes.ts, components/, styles/ a src/
[4/7] Copiar manifest.json, sw.js, etc. de public/ a src/public/
[5/7] Instalar dependencias (npm install)
[6/7] Compilar proyecto (npm run build)
[7/7] Verificar y copiar archivos PWA a build/ si faltan
```

---

## ✅ Verificación Post-Compilación

### 1. Verificar estructura de `build/`:
```cmd
dir build
```

**Debe mostrar:**
```
build/
├── index.html
├── manifest.json         ⭐ DEBE APARECER
├── sw.js                 ⭐ DEBE APARECER
├── instructores.html     ⭐ DEBE APARECER
├── _headers              ⭐ DEBE APARECER
├── _redirects            ⭐ DEBE APARECER
└── assets/
```

### 2. Si faltan archivos, ejecutar:
```cmd
copy src\public\manifest.json build\
copy src\public\sw.js build\
copy src\public\instructores.html build\
copy src\public\_headers build\
copy src\public\_redirects build\
```

---

## 📤 Desplegar en Vercel

### Paso 1: Compilar
```cmd
npm run build
```

### Paso 2: Verificar
```cmd
dir build\manifest.json
dir build\sw.js
```

### Paso 3: Desplegar
1. Ve a https://vercel.com
2. Arrastra la carpeta `build/` completa
3. Espera 30-60 segundos
4. ¡Listo!

---

## 🌐 Después del Deploy - Verificar

### URLs a probar:
```
https://tu-proyecto.vercel.app/
https://tu-proyecto.vercel.app/manifest.json
https://tu-proyecto.vercel.app/sw.js
https://tu-proyecto.vercel.app/instructores
```

### Probar PWA en móvil:
- **iOS (Safari):** Presionar "UNIRME" → Ver instrucciones → Añadir manualmente
- **Android (Chrome):** Presionar "UNIRME" → Botón "Añadir" → Instala automáticamente

---

## ❓ FAQ

### ¿Por qué `public/` está dentro de `src/`?
Por tu estructura local. Vite normalmente busca `public/` en la raíz, pero `vite.config.ts` está configurado para buscar en `src/public/`.

### ¿Qué pasa si descargo de nuevo desde Figma Make?
Ejecuta `setup.bat` cada vez que descargues. Reorganizará automáticamente la estructura.

### ¿Puedo usar otra estructura?
Sí, pero deberás ajustar `vite.config.ts` y las rutas de importación en `main.tsx`.

---

¡Todo listo para desplegar tu PWA de HerSafe en Vercel! 🚀
