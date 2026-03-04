# Headers para HerSafe - Optimización SEO y Seguridad

# Aplicar a todas las rutas
/*
  # Security Headers
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  
  # Cache Control para HTML
  Cache-Control: public, max-age=0, must-revalidate

# Assets estáticos - cache largo
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Imágenes - cache largo
/*.jpg
  Cache-Control: public, max-age=31536000, immutable
/*.jpeg
  Cache-Control: public, max-age=31536000, immutable
/*.png
  Cache-Control: public, max-age=31536000, immutable
/*.gif
  Cache-Control: public, max-age=31536000, immutable
/*.svg
  Cache-Control: public, max-age=31536000, immutable
/*.webp
  Cache-Control: public, max-age=31536000, immutable

# Fonts - cache largo
/*.woff
  Cache-Control: public, max-age=31536000, immutable
/*.woff2
  Cache-Control: public, max-age=31536000, immutable
/*.ttf
  Cache-Control: public, max-age=31536000, immutable
/*.otf
  Cache-Control: public, max-age=31536000, immutable

# CSS y JS - cache medio
/*.css
  Cache-Control: public, max-age=604800, immutable
/*.js
  Cache-Control: public, max-age=604800, immutable

# Videos
/*.mp4
  Cache-Control: public, max-age=2592000
