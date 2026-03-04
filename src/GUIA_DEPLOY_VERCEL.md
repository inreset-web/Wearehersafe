# 🚀 GUÍA RÁPIDA - Desplegar HerSafe en Vercel con PWA para iOS

## ⚡ OPCIÓN 1: Automática (Windows) - RECOMENDADA

1. **Descarga el proyecto completo desde Figma Make**
2. **Extrae todo en una carpeta**, por ejemplo: `C:\Users\nawal\Downloads\wearehersafe`
3. **Abre CMD en esa carpeta**:
   ```cmd
   cd C:\Users\nawal\Downloads\wearehersafe
   ```
4. **Ejecuta el script automático**:
   ```cmd
   setup.bat
   ```
   
   Esto hará automáticamente:
   - ✅ Crear la carpeta `src/`
   - ✅ Mover `App.tsx`, `components/`, `styles/` a `src/`
   - ✅ Crear `src/public/` con `manifest.json`, `sw.js`
   - ✅ Instalar dependencias (`npm install`)
   - ✅ Compilar proyecto (`npm run build`)
   - ✅ Copiar archivos PWA a `build/` si faltan

5. **Verifica que aparezcan**:
   ```cmd
   dir build\manifest.json
   dir build\sw.js
   ```

6. **Listo, ahora despliega:**
   - Ve a https://vercel.com
   - Arrastra la carpeta `build/` completa
   - ¡Hecho!

---

## 📋 OPCIÓN 2: Manual (si setup.bat falla)

### Paso 1: Organizar estructura

```cmd
# Crear carpetas
mkdir src
mkdir src\components
mkdir src\styles
mkdir src\public

# Mover archivos principales
move App.tsx src\
move routes.ts src\

# Mover carpetas
move components src\
move styles src\

# Copiar archivos públicos
copy public\manifest.json src\public\
copy public\sw.js src\public\
copy public\instructores.html src\public\
copy public\_headers src\public\
copy public\_redirects src\public\
```

### Paso 2: Compilar

```cmd
npm install
npm run build
```

### Paso 3: Verificar y copiar si faltan

```cmd
# Verificar
dir build\manifest.json
dir build\sw.js

# Si NO aparecen, copiar manualmente:
copy src\public\manifest.json build\
copy src\public\sw.js build\
copy src\public\instructores.html build\
```

### Paso 4: Desplegar en Vercel

1. Ve a https://vercel.com
2. Crea una cuenta (si no tienes)
3. Haz clic en "Add New..." → "Project"
4. Arrastra la carpeta `build/` completa
5. Espera 30-60 segundos

---

## ✅ VERIFICAR QUE FUNCIONE

Una vez desplegado en Vercel, abre:

### 1. Verificar manifest.json
```
https://tu-proyecto.vercel.app/manifest.json
```
**Debe mostrar:** JSON con iconos de Imgur

### 2. Verificar service worker
```
https://tu-proyecto.vercel.app/sw.js
```
**Debe mostrar:** Código del service worker

### 3. Probar en iOS (iPhone/iPad con Safari)

1. Abre `https://tu-proyecto.vercel.app`
2. Presiona **"UNIRME"** o **"ACCEDE A HERSAFE"**
3. Debe aparecer modal azul con:
   - Logo de HerSafe
   - Título: "Lleva HerSafe contigo"
   - Botón: "AÑADIR A MI MÓVIL"
4. Al presionar el botón:
   - Aparece pantalla con instrucciones paso a paso
   - Iconos visuales del proceso
5. Sigue las instrucciones:
   - Toca botón Compartir (🔗)
   - Selecciona "Añadir a la pantalla de inicio"
   - Confirma
6. El icono de HerSafe aparece en tu pantalla de inicio
7. Al abrirlo → Redirige a `https://app.wearehersafe.com/auth`

### 4. Probar en Android (Chrome)

1. Abre `https://tu-proyecto.vercel.app`
2. Presiona **"UNIRME"**
3. Modal aparece con botón "AÑADIR A MI MÓVIL"
4. Al presionarlo → Aparece prompt nativo de Chrome
5. Presiona "Añadir" → Se instala automáticamente

---

## 🌐 CONECTAR TU DOMINIO (wearehersafe.com)

Una vez que verifiques que todo funciona en la URL temporal de Vercel:

### En Vercel:
1. Ve a tu proyecto → **Settings** → **Domains**
2. Haz clic en **"Add Domain"**
3. Escribe: `wearehersafe.com`
4. Copia los registros DNS que Vercel te muestra

### En IONOS:
1. Panel IONOS → **Dominios** → **wearehersafe.com**
2. Busca **"DNS Settings"** o **"Configuración DNS"**
3. Añade los registros:

   **Registro A:**
   - Tipo: `A`
   - Host: `@`
   - Valor: La IP que Vercel te dio (ej: `76.76.21.21`)
   - TTL: `3600`

   **Registro CNAME:**
   - Tipo: `CNAME`
   - Host: `www`
   - Valor: `cname.vercel-dns.com`
   - TTL: `3600`

4. Guarda los cambios
5. Espera 1-24 horas para propagación DNS (usualmente 1-2 horas)

Verifica en: https://dnschecker.org/

---

## 🔧 TROUBLESHOOTING

### ❌ setup.bat dice "npm no se reconoce"
**Causa:** Node.js no instalado  
**Solución:** Descarga e instala desde https://nodejs.org

### ❌ manifest.json no aparece después de compilar
**Causa:** No se copió desde src/public  
**Solución:**
```cmd
copy src\public\manifest.json build\manifest.json
copy src\public\sw.js build\sw.js
```

### ❌ En iOS el modal no aparece
**Causa:** JavaScript deshabilitado o problema de detección  
**Solución:** Abre Safari → Consola → Busca errores en rojo

### ❌ El icono se ve genérico en iOS
**Causa:** Icono de Imgur no carga  
**Solución:** Verifica que https://i.imgur.com/8FjoGdH.png carga

### ❌ Vercel dice "Build failed"
**Causa:** Error en compilación  
**Solución:** Revisa los logs de Vercel y busca el error específico

---

## 📞 SOPORTE

Si algo no funciona, verifica:
1. ✅ Estructura de carpetas correcta (ver `/README.md`)
2. ✅ `manifest.json` y `sw.js` en `build/`
3. ✅ URL de Imgur funcionando
4. ✅ index.html apunta a `/src/main.tsx`

---

¡Listo! Tu PWA de HerSafe funcionará perfectamente en iOS y Android. 🎉
