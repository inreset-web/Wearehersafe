# 🚀 Guía Rápida: Indexar HerSafe en Google (IONOS + Figma)

## ⚡ CHECKLIST - Hacer AHORA

### 1️⃣ Verificar que los archivos estén publicados (2 minutos)

Abre estas URLs en tu navegador:

- [ ] https://wearehersafe.com/robots.txt ➜ ¿Ves el contenido del archivo?
- [ ] https://wearehersafe.com/sitemap.xml ➜ ¿Ves el XML?
- [ ] https://wearehersafe.com/ ➜ ¿El sitio carga correctamente?

**Si NO ves robots.txt o sitemap.xml:**
→ Figma no los publicó. Necesitarás subirlos manualmente vía FTP a IONOS.

---

### 2️⃣ Registrarte en Google Search Console (5 minutos)

1. Ve a: https://search.google.com/search-console/
2. Haz clic en "Agregar propiedad"
3. Selecciona "Prefijo de URL"
4. Escribe: `https://wearehersafe.com`
5. Clic en "Continuar"

---

### 3️⃣ Verificar tu sitio con Meta Tag (3 minutos)

Google te mostrará varias opciones. Elige **"Etiqueta HTML"**:

1. Google te dará un código como:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```

2. Copia SOLO la parte `ABC123XYZ...` (el código entre las comillas)

3. En Figma, edita el archivo `/index.html` línea 77:
   ```html
   <!-- Antes: -->
   <!-- <meta name="google-site-verification" content="tu-codigo-aqui" /> -->
   
   <!-- Después: -->
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```

4. Guarda y **publica de nuevo desde Figma**

5. Vuelve a Google Search Console y haz clic en **"Verificar"**

6. ✅ Deberías ver "Verificación correcta"

---

### 4️⃣ Enviar Sitemap a Google (2 minutos)

1. En Google Search Console (menú izquierdo), haz clic en **"Sitemaps"**
2. En "Añadir un nuevo sitemap", escribe: `sitemap.xml`
3. Haz clic en **"Enviar"**
4. Espera 1-2 minutos y actualiza
5. ✅ Debería decir "Correcto" o "Éxito"

**Si da error:**
- Verifica que https://wearehersafe.com/sitemap.xml esté accesible
- Asegúrate de haber escrito solo `sitemap.xml` (sin `/` al principio)

---

### 5️⃣ Solicitar Indexación de las Páginas Principales (5 minutos)

**Para cada URL importante, haz esto:**

1. En Google Search Console, haz clic en **"Inspección de URL"** (arriba)
2. Pega la URL completa:
   - `https://wearehersafe.com/`
3. Presiona Enter
4. Espera a que Google inspeccione (10-30 segundos)
5. Haz clic en **"Solicitar indexación"**
6. Espera confirmación (1-2 minutos)
7. ✅ Deberías ver "Solicitud de indexación enviada"

**Repite para:**
- `https://wearehersafe.com/instructores`

---

## 🕐 ¿Cuánto tarda Google en indexar?

- **Primeras 24-48 horas:** Google empieza a rastrear
- **3-7 días:** Primeras páginas indexadas
- **2-4 semanas:** Indexación completa

**Para verificar si ya estás indexado:**
1. Ve a Google
2. Busca: `site:wearehersafe.com`
3. Si ves resultados, ¡ya estás indexado! 🎉

---

## ❌ PROBLEMAS COMUNES

### Problema 1: "No se puede acceder a robots.txt o sitemap.xml"

**Solución:**
Figma no publicó estos archivos. Opciones:

**Opción A - Volver a publicar (más fácil):**
1. En Figma, haz un pequeño cambio en cualquier archivo
2. Vuelve a publicar
3. Verifica de nuevo las URLs

**Opción B - Subir manualmente via FTP:**
1. Descarga un cliente FTP (como FileZilla)
2. Conéctate a IONOS con tus credenciales
3. Sube `robots.txt` y `sitemap.xml` a la carpeta raíz
4. Sube `.htaccess` a la carpeta raíz

---

### Problema 2: "La verificación de Google falla"

**Solución:**
1. Asegúrate de haber copiado el código COMPLETO de Google
2. Verifica que no haya espacios extra
3. Confirma que publicaste de nuevo desde Figma DESPUÉS de agregar el código
4. Espera 1-2 minutos y vuelve a intentar

---

### Problema 3: "El sitemap da error en Google"

**Solución:**
1. Verifica que `https://wearehersafe.com/sitemap.xml` abra en el navegador
2. Si no abre, Figma no lo publicó → súbelo vía FTP
3. Verifica que el archivo tenga el formato XML correcto (debe empezar con `<?xml version="1.0"...`)

---

## 📊 Cómo Monitorear el Progreso

Después de hacer todo lo anterior:

1. **Día 1-2:** Verifica en Google Search Console → "Cobertura"
   - ¿Muestra que Google empezó a rastrear?

2. **Día 3-7:** Busca en Google: `site:wearehersafe.com`
   - ¿Aparecen resultados?

3. **Día 7-14:** Busca palabras clave relacionadas:
   - "HerSafe plataforma mujeres"
   - "HerSafe seguridad salud bienestar"

---

## 🆘 Si Nada Funciona

**Contacta al soporte:**

1. **IONOS:** Pregunta si hay algún bloqueo de indexación en tu hosting
2. **Figma:** Pregunta si hay problemas conocidos con la publicación de archivos estáticos

**O intenta publicar en otra plataforma:**
- Netlify (automático para SPAs)
- Vercel (optimizado para React)
- GitHub Pages

---

## ✅ Checklist Final

- [ ] robots.txt accesible en https://wearehersafe.com/robots.txt
- [ ] sitemap.xml accesible en https://wearehersafe.com/sitemap.xml
- [ ] Sitio verificado en Google Search Console
- [ ] Sitemap enviado a Google
- [ ] Indexación solicitada para páginas principales
- [ ] HTTPS activo (no HTTP)

**Si todos están marcados → ¡Listo! Solo espera 24-48 horas.**

---

## 📞 Contacto

Si tienes dudas: colaboraciones.wearehersafe@gmail.com
