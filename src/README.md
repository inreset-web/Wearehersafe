# HerSafe - Landing Page

## 📁 Estructura de proyecto requerida

Para que el proyecto funcione correctamente en tu máquina local, debe tener esta estructura:

```
wearehersafe/
├── src/
│   ├── App.tsx                 (archivo principal de React)
│   ├── main.tsx                (punto de entrada)
│   ├── components/             (todos los componentes)
│   ├── styles/
│   │   └── globals.css
│   ├── routes.ts               (si usas React Router)
│   └── public/                 ⚠️ IMPORTANTE: carpeta pública dentro de src
│       ├── manifest.json       (configuración PWA)
│       ├── sw.js               (service worker)
│       ├── instructores.html   (página de instructores)
│       ├── _headers            (configuración Vercel)
│       └── _redirects          (redirecciones Vercel)
├── index.html                  (en la raíz del proyecto)
├── package.json
├── vite.config.ts
├── vercel.json
├── robots.txt
├── sitemap.xml
└── README.md
```

## ⚙️ Pasos para configurar tu proyecto local

### 1. Descargar desde Figma Make

Descarga todos los archivos desde Figma Make.

### 2. Organizar la estructura manualmente

Crea la carpeta `src/` en la raíz y mueve los archivos siguiendo la estructura de arriba:

```cmd
# Crear estructura
mkdir src
mkdir src\public
mkdir src\components
mkdir src\styles

# Mover archivos (hazlo manualmente o con comandos)
move App.tsx src\
move components src\
move styles src\

# Mover archivos públicos a src/public/
move public\manifest.json src\public\
move public\sw.js src\public\
move public\instructores.html src\public\
move public\_headers src\public\
move public\_redirects src\public\
```

### 3. Instalar dependencias

```cmd
npm install
```

### 4. Compilar para producción

```cmd
npm run build
```

**IMPORTANTE:** Verifica que los archivos se copiaron correctamente:

```cmd
dir build\manifest.json
dir build\sw.js
```

Ambos archivos DEBEN aparecer. Si no aparecen, cópialos manualmente:

```cmd
copy src\public\manifest.json build\
copy src\public\sw.js build\
```

### 5. Desplegar en Vercel

#### Opción A: Arrastra la carpeta `build/`

1. Ve a https://vercel.com
2. Crea un nuevo proyecto
3. Arrastra la carpeta `build/` completa

#### Opción B: Conectar repositorio Git

1. Sube tu código a GitHub
2. Conecta el repositorio en Vercel
3. Vercel detectará automáticamente la configuración en `vercel.json`

## ✅ Verificar que funcione

Después de desplegar, verifica:

1. **Manifest:** Abre `https://tu-dominio.vercel.app/manifest.json`
   - Debe mostrar el JSON con los iconos de Imgur

2. **Service Worker:** Abre `https://tu-dominio.vercel.app/sw.js`
   - Debe mostrar el código del service worker

3. **PWA en iOS:** Abre desde Safari en iPhone
   - Presiona "UNIRME" o "ACCEDE A HERSAFE"
   - Debe aparecer el modal con instrucciones

4. **PWA en Android:** Abre desde Chrome en Android
   - Presiona "UNIRME" o "ACCEDE A HERSAFE"
   - Debe aparecer el modal con botón "AÑADIR A MI MÓVIL"
   - Al presionarlo, aparece el prompt nativo de instalación

## 🔧 Troubleshooting

### El manifest.json no aparece en build/

**Solución:**
```cmd
copy src\public\manifest.json build\manifest.json
copy src\public\sw.js build\sw.js
```

### Error "Cannot find module '@/components/...'"

**Causa:** El alias `@` no está configurado  
**Solución:** Ya está en `vite.config.ts`, asegúrate de que apunte a `src/`

### Los iconos de Imgur no se ven en iOS

**Causa:** URLs bloqueadas  
**Solución:** Verifica que https://i.imgur.com/8FjoGdH.png carga correctamente

## 📦 Scripts disponibles

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 🌐 Conectar dominio en Vercel

1. **En Vercel:** Settings → Domains → Add Domain
2. Ingresa: `wearehersafe.com`
3. Vercel te dará registros DNS
4. **En IONOS:** Añade los registros DNS:
   - Tipo A: `@` → IP de Vercel
   - Tipo CNAME: `www` → `cname.vercel-dns.com`
5. Espera 1-24 horas para propagación DNS

## 📱 Archivos PWA importantes

- **`src/public/manifest.json`**: Configuración de la PWA (nombre, iconos, colores)
- **`src/public/sw.js`**: Service Worker para caché offline
- **`src/components/PWAContext.tsx`**: Contexto global para manejo de instalación
- **`src/components/PWAInstallModal.tsx`**: Modal de instalación con instrucciones

## 🎨 Diseño

- **Fondo:** Negro (`#000000`)
- **Color principal:** Azul (`#0365ff`)
- **Color secundario:** Naranja (`#ff9e03`)
- **Tipografías:**
  - Logo: Balhattan
  - Títulos: Barlow Condensed
  - Textos: Darker Grotesque

---

¿Dudas? Revisa las instrucciones en:
- `/INSTRUCCIONES_PWA.md`
- `/INSTRUCCIONES_SEO.md`
- `/GUIA_RAPIDA_INDEXACION.md`
