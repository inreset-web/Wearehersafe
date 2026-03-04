# Redirects para HerSafe - SPA React Router

# Redirigir todas las rutas a index.html para React Router
# Excepto archivos estáticos que existen

# Forzar HTTPS
http://wearehersafe.com/*    https://wearehersafe.com/:splat    301!
http://www.wearehersafe.com/*    https://wearehersafe.com/:splat    301!
https://www.wearehersafe.com/*    https://wearehersafe.com/:splat    301!

# SPA Fallback - todas las rutas que no sean archivos van a index.html
/*    /index.html    200
