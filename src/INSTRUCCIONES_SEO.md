# Instrucciones para Indexar HerSafe en Google Search

## ✅ Archivos Creados

Se han creado los siguientes archivos para permitir la indexación correcta en Google:

1. **`/index.html`** - Página HTML principal con metadatos SEO completos y contenido estático oculto
2. **`/robots.txt`** - Archivo para controlar el rastreo de buscadores
3. **`/sitemap.xml`** - Mapa del sitio con todas las URLs
4. **`/components/SEO.tsx`** - Componente React para metadatos dinámicos por página
5. **`/.htaccess`** - Configuración Apache para IONOS (rutas SPA, caché, compresión)
6. **`/public/instructores.html`** - Página estática alternativa para instructores

## 🚀 PASOS ESPECÍFICOS PARA IONOS + FIGMA

### 1. Verificar Archivos Publicados

Después de publicar desde Figma, verifica que estos archivos estén en tu servidor IONOS:
- `https://wearehersafe.com/robots.txt`
- `https://wearehersafe.com/sitemap.xml`
- `https://wearehersafe.com/.htaccess` (puede ser invisible en algunos clientes FTP)

**Cómo verificar:**
1. Abre un navegador
2. Ve a `https://wearehersafe.com/robots.txt`
3. Ve a `https://wearehersafe.com/sitemap.xml`
4. Deberías ver el contenido de estos archivos

### 2. Configuración IONOS Específica

**Si usas el panel de IONOS:**
1. Entra a tu cuenta de IONOS
2. Ve a "Hosting" o "Dominios"
3. Busca la sección de "SEO" o "Configuración del sitio"
4. Activa estas opciones si están disponibles:
   - ✅ Indexación en buscadores
   - ✅ HTTPS/SSL (obligatorio para buen SEO)
   - ✅ Compresión GZIP
   - ✅ Caché del navegador

**Verificar HTTPS:**
- Tu sitio DEBE estar en `https://` (no `http://`)
- Si no tienes SSL, actívalo en IONOS (generalmente es gratis con Let's Encrypt)

### 3. Verificar el Sitio en Google Search Console

**PASO A PASO:**

1. **Ir a Google Search Console:**
   - https://search.google.com/search-console/

2. **Agregar propiedad:**
   - Haz clic en "Agregar propiedad"
   - Selecciona "Prefijo de URL"
   - Ingresa: `https://wearehersafe.com`

3. **Verificar con Meta Tag (Más fácil):**
   - Google te dará un código como: `<meta name="google-site-verification" content="ABC123...">`
   - Copia solo la parte `ABC123...`
   - Edita `/index.html` en la línea 77
   - Cambia `<!-- <meta name="google-site-verification" content="tu-codigo-aqui" /> -->`
   - Por: `<meta name="google-site-verification" content="ABC123..." />`
   - Guarda y publica de nuevo desde Figma
   - Vuelve a Google Search Console y haz clic en "Verificar"

### 4. Enviar el Sitemap a Google

**Una vez verificado:**

1. En Google Search Console, ve al menú lateral izquierdo
2. Haz clic en "Sitemaps"
3. En "Añadir un nuevo sitemap", escribe: `sitemap.xml`
4. Haz clic en "Enviar"
5. Espera unos minutos y actualiza la página
6. Debería aparecer como "Correcto" o "Éxito"

### 5. Solicitar Indexación Manual (IMPORTANTE)

**Para acelerar el proceso:**

1. En Google Search Console, ve a "Inspección de URL"
2. Ingresa cada URL y solicita indexación:
   - `https://wearehersafe.com/`
   - `https://wearehersafe.com/instructores`
3. Haz clic en "Solicitar indexación"
4. Espera confirmación (puede tardar 1-2 minutos por URL)

### 6. Verificar que Figma Publique Correctamente

**Problema común con Figma:**
Figma puede no publicar todos los archivos. Verifica:

1. ¿Se publicó `robots.txt`? → https://wearehersafe.com/robots.txt
2. ¿Se publicó `sitemap.xml`? → https://wearehersafe.com/sitemap.xml
3. ¿Se publicó `.htaccess`? → No es visible en el navegador, pero debería estar en el servidor

**Si NO se publicaron:**
- Puede que necesites subirlos manualmente vía FTP a IONOS
- O contactar con soporte de Figma/IONOS

### 7. Usar FTP para Subir Archivos Manualmente (Si es necesario)

Si necesitas subir archivos manualmente, sigue estos pasos:

1. **Conéctate a tu servidor IONOS via FTP:**
   - Usa un cliente FTP como FileZilla
   - Ingresa tus credenciales de IONOS

2. **Sube los archivos:**
   - Sube `robots.txt` a la raíz del servidor
   - Sube `sitemap.xml` a la raíz del servidor
   - Sube `.htaccess` a la raíz del servidor

3. **Verifica los archivos:**
   - Ve a `https://wearehersafe.com/robots.txt`
   - Ve a `https://wearehersafe.com/sitemap.xml`
   - `.htaccess` no es visible en el navegador, pero debería estar en el servidor

## 🔧 Configuración Actual

### URLs Incluidas en el Sitemap
- Página Principal: `/` (Prioridad: 1.0)
- Instructores: `/instructores` (Prioridad: 0.9)
- Privacidad: `/legal/privacidad` (Prioridad: 0.5)
- Términos: `/legal/terminos` (Prioridad: 0.5)

### Metadatos SEO por Página

**Página Principal:**
- Título: "HerSafe - Seguridad, salud y bienestar, unidos por primera vez"
- Descripción: "La primera plataforma digital dirigida a mujeres que combina seguridad, salud y bienestar..."

**Página de Instructores:**
- Título: "Únete como Instructora - HerSafe"
- Descripción: "Forma parte de HerSafe como instructora. Comparte tu conocimiento..."

**Privacidad:**
- Título: "Política de Privacidad - HerSafe"

**Términos:**
- Título: "Términos y Condiciones - HerSafe"

### Schema.org (Datos Estructurados)

Se han incluido dos schemas en `index.html`:
1. **Organization** - Información de la empresa
2. **WebSite** - Información del sitio web

## 🎯 Optimizaciones SEO Implementadas

✅ Meta tags básicos (title, description, keywords)
✅ Open Graph tags (Facebook, LinkedIn)
✅ Twitter Cards
✅ Canonical URLs
✅ Schema.org structured data
✅ Robots.txt optimizado
✅ Sitemap.xml completo
✅ URLs limpias y semánticas
✅ Contenido en español (lang="es")
✅ Responsive design
✅ Metadatos dinámicos por página

## 📱 Redes Sociales

En el Schema.org de `index.html`, actualiza las URLs de redes sociales cuando las tengas:
- Instagram
- Facebook
- LinkedIn

## 🔍 Herramientas Útiles

- [Google Search Console](https://search.google.com/search-console/)
- [Bing Webmaster Tools](https://www.bing.com/webmasters/)
- [Test de datos estructurados](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)

## ⚡ Próximos Pasos Recomendados

1. Conectar Google Analytics para tracking
2. Agregar Google Tag Manager
3. Crear contenido de blog (aumenta SEO)
4. Conseguir backlinks de calidad
5. Optimizar velocidad de carga
6. Crear página 404 personalizada

## 📧 Contacto

Email de contacto incluido en Schema.org: `colaboraciones.wearehersafe@gmail.com`

---

**Nota:** El SEO es un proceso que toma tiempo. La indexación completa puede tardar días o semanas, pero siguiendo estos pasos acelerarás el proceso significativamente.