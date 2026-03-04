# 🚀 Comandos Rápidos - HerSafe

## 📦 CONFIGURACIÓN INICIAL

### Opción 1: Script Automático (Windows)
```cmd
setup.bat
```

### Opción 2: Manual
```cmd
npm install
npm run build
```

---

## 🔧 COMANDOS DE DESARROLLO

### Modo desarrollo (localhost)
```cmd
npm run dev
```
Abre: http://localhost:5173

### Compilar para producción
```cmd
npm run build
```
Output: `/build/`

### Previsualizar build local
```cmd
npm run preview
```

---

## 📁 VERIFICAR ARCHIVOS PWA

### Windows (CMD)
```cmd
dir build\manifest.json
dir build\sw.js
dir build\instructores.html
```

### Si faltan, copiar manualmente:
```cmd
copy src\public\manifest.json build\
copy src\public\sw.js build\
copy src\public\instructores.html build\
```

---

## 🌐 DESPLEGAR EN VERCEL

### Opción 1: Interfaz web (más fácil)
1. Ve a https://vercel.com
2. Arrastra la carpeta `build/`

### Opción 2: CLI de Vercel
```cmd
# Instalar Vercel CLI (solo una vez)
npm install -g vercel

# Desplegar
cd build
vercel --prod
```

---

## 🔍 VERIFICAR DESPUÉS DEL DEPLOY

### Abrir en navegador:
```
https://tu-proyecto.vercel.app/manifest.json
https://tu-proyecto.vercel.app/sw.js
```

### Probar PWA en móvil:
- **iOS:** Safari → Abrir sitio → Presionar "UNIRME" → Seguir instrucciones
- **Android:** Chrome → Abrir sitio → Presionar "UNIRME" → Instalar

---

## 🐛 TROUBLESHOOTING

### Limpiar caché y recompilar
```cmd
rmdir /S /Q node_modules
rmdir /S /Q build
npm install
npm run build
```

### Ver logs de Vercel
```cmd
vercel logs
```

### Verificar Service Worker en navegador
```
Chrome/Edge: chrome://serviceworker-internals
Firefox: about:debugging#/runtime/this-firefox
```

---

## 📝 ARCHIVOS IMPORTANTES

| Archivo | Propósito |
|---------|-----------|
| `vite.config.ts` | Configuración de Vite (build) |
| `vercel.json` | Configuración de Vercel (deploy) |
| `src/main.tsx` | Punto de entrada de React |
| `src/App.tsx` | Componente principal |
| `src/public/manifest.json` | Configuración PWA |
| `src/public/sw.js` | Service Worker (caché offline) |
| `index.html` | HTML raíz |

---

## 🔗 LINKS ÚTILES

- Vercel Dashboard: https://vercel.com/dashboard
- Verificar DNS: https://dnschecker.org
- Validar Manifest: https://manifest-validator.appspot.com
- Probar PWA: https://www.pwabuilder.com

---

¡Listo para desplegar! 🎉
