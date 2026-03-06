# HerSafe - Landing Page

Plataforma digital dirigida a mujeres que combina seguridad, salud y bienestar.

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Compilar para producción
npm run build
```

## 📁 Estructura del Proyecto

```
hersafe-landing/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   └── styles/
├── public/
│   ├── manifest.json       # Configuración PWA
│   ├── sw.js              # Service Worker
│   └── instructores.html
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json            # Configuración Vercel
├── robots.txt
└── sitemap.xml
```

## 🔧 Tecnologías

- **React** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS v4** - Estilos
- **Motion (Framer Motion)** - Animaciones
- **React Router** - Navegación
- **PWA** - Progressive Web App

## 🎨 Diseño

- **Fondo:** Negro (`#000000`)
- **Color principal:** Azul (`#0365ff`)
- **Color secundario:** Naranja (`#ff9e03`)
- **Tipografías:**
  - Logo: Balhattan
  - Títulos: Barlow Condensed
  - Textos: Darker Grotesque

## 📱 PWA (Progressive Web App)

El proyecto incluye funcionalidad PWA completa:

- **iOS**: Muestra modal con instrucciones de instalación manual
- **Android**: Modal con botón de instalación automática
- **Desktop**: Redirige directamente a `app.wearehersafe.com/auth`

### Archivos PWA importantes:

- `/public/manifest.json` - Configuración de la PWA
- `/public/sw.js` - Service Worker para caché offline
- `/components/PWAContext.tsx` - Contexto global de instalación
- `/components/PWAInstallModal.tsx` - Modal de instalación

## 🌐 Deploy en Vercel

### Vía GitHub (Recomendado)

1. Sube el código a GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Conecta el repositorio en Vercel
3. Vercel detectará automáticamente `vercel.json`
4. Deploy automático en cada `git push`

### Configuración (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build"
}
```

Vercel ejecutará:
```bash
npm install
npm run build
# Despliega la carpeta build/
```

## 📧 Formularios

Los formularios envían a:
- **Email principal**: colaboraciones.wearehersafe@gmail.com
- **EmailOctopus** (con fallback)

## ✅ Verificación Post-Deploy

Después de desplegar, verifica:

1. **Manifest**: `https://wearehersafe.com/manifest.json`
2. **Service Worker**: `https://wearehersafe.com/sw.js`
3. **PWA en móvil**: Presiona "UNIRME" → Debe aparecer modal

## 🔗 URLs

- **Landing Principal**: `https://wearehersafe.com`
- **Landing Instructores**: `https://wearehersafe.com/instructores`
- **App Principal**: `https://app.wearehersafe.com/auth`

---

**Desarrollado para HerSafe** 🛡️
