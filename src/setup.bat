@echo off
echo ========================================
echo   HERSAFE - Configuracion Automatica
echo ========================================
echo.

REM Verificar si Node.js esta instalado
where npm >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm no encontrado
    echo Por favor instala Node.js desde https://nodejs.org
    pause
    exit /b 1
)

REM Verificar si existe la carpeta src
if not exist "src\" (
    echo [1/7] Creando estructura de carpetas...
    mkdir src
    mkdir src\components
    mkdir src\styles
    mkdir src\public
    echo      Carpetas creadas correctamente
) else (
    echo [1/7] La carpeta src ya existe
    if not exist "src\public\" mkdir src\public
    if not exist "src\components\" mkdir src\components
    if not exist "src\styles\" mkdir src\styles
)

echo.
echo [2/7] Verificando main.tsx...
if not exist "src\main.tsx" (
    echo      Creando src\main.tsx...
    echo import React from 'react'; > src\main.tsx
    echo import ReactDOM from 'react-dom/client'; >> src\main.tsx
    echo import App from './App'; >> src\main.tsx
    echo import './styles/globals.css'; >> src\main.tsx
    echo. >> src\main.tsx
    echo ReactDOM.createRoot(document.getElementById('root')!).render( >> src\main.tsx
    echo   ^<React.StrictMode^> >> src\main.tsx
    echo     ^<App /^> >> src\main.tsx
    echo   ^</React.StrictMode^> >> src\main.tsx
    echo ); >> src\main.tsx
    echo      main.tsx creado
) else (
    echo      main.tsx ya existe
)

echo.
echo [3/7] Moviendo archivos a src\...

REM Mover App.tsx si existe en la raiz
if exist "App.tsx" (
    move /Y "App.tsx" "src\" >nul 2>&1
    echo      App.tsx movido
)

REM Mover routes.ts si existe
if exist "routes.ts" (
    move /Y "routes.ts" "src\" >nul 2>&1
    echo      routes.ts movido
)

REM Mover carpeta components si existe en la raiz
if exist "components\" (
    if not exist "src\components\" mkdir src\components
    echo      Moviendo components\...
    xcopy /E /I /Y "components" "src\components\" >nul 2>&1
    if errorlevel 0 rmdir /S /Q "components" >nul 2>&1
)

REM Mover carpeta styles si existe en la raiz
if exist "styles\" (
    if not exist "src\styles\" mkdir src\styles
    echo      Moviendo styles\...
    xcopy /E /I /Y "styles" "src\styles\" >nul 2>&1
    if errorlevel 0 rmdir /S /Q "styles" >nul 2>&1
)

echo.
echo [4/7] Organizando archivos publicos...

REM Mover archivos de public a src\public
if exist "public\" (
    if exist "public\manifest.json" (
        copy /Y "public\manifest.json" "src\public\" >nul 2>&1
        echo      manifest.json copiado
    )
    if exist "public\sw.js" (
        copy /Y "public\sw.js" "src\public\" >nul 2>&1
        echo      sw.js copiado
    )
    if exist "public\instructores.html" (
        copy /Y "public\instructores.html" "src\public\" >nul 2>&1
        echo      instructores.html copiado
    )
    if exist "public\_headers" (
        copy /Y "public\_headers" "src\public\" >nul 2>&1
        echo      _headers copiado
    )
    if exist "public\_redirects" (
        copy /Y "public\_redirects" "src\public\" >nul 2>&1
        echo      _redirects copiado
    )
)

echo.
echo [5/7] Instalando dependencias...
call npm install
if errorlevel 1 (
    echo      ERROR: No se pudieron instalar las dependencias
    pause
    exit /b 1
)

echo.
echo [6/7] Compilando proyecto...
call npm run build
if errorlevel 1 (
    echo      ERROR: La compilacion fallo
    echo      Revisa los errores arriba y ejecuta: npm run build
    pause
    exit /b 1
)

echo.
echo [7/7] Verificando archivos criticos en build\...

set ARCHIVOS_OK=1

if exist "build\manifest.json" (
    echo      [OK] manifest.json encontrado
) else (
    echo      [!] Copiando manifest.json manualmente...
    if exist "src\public\manifest.json" (
        copy /Y "src\public\manifest.json" "build\manifest.json" >nul 2>&1
        echo      [OK] manifest.json copiado
    ) else (
        echo      [ERROR] src\public\manifest.json no existe
        set ARCHIVOS_OK=0
    )
)

if exist "build\sw.js" (
    echo      [OK] sw.js encontrado
) else (
    echo      [!] Copiando sw.js manualmente...
    if exist "src\public\sw.js" (
        copy /Y "src\public\sw.js" "build\sw.js" >nul 2>&1
        echo      [OK] sw.js copiado
    ) else (
        echo      [ERROR] src\public\sw.js no existe
        set ARCHIVOS_OK=0
    )
)

if exist "build\instructores.html" (
    echo      [OK] instructores.html encontrado
) else (
    echo      [!] Copiando instructores.html manualmente...
    if exist "src\public\instructores.html" (
        copy /Y "src\public\instructores.html" "build\instructores.html" >nul 2>&1
        echo      [OK] instructores.html copiado
    ) else (
        echo      [AVISO] instructores.html no encontrado
    )
)

if exist "build\_headers" (
    echo      [OK] _headers encontrado
) else (
    if exist "src\public\_headers" (
        copy /Y "src\public\_headers" "build\_headers" >nul 2>&1
        echo      [OK] _headers copiado
    )
)

if exist "build\_redirects" (
    echo      [OK] _redirects encontrado
) else (
    if exist "src\public\_redirects" (
        copy /Y "src\public\_redirects" "build\_redirects" >nul 2>&1
        echo      [OK] _redirects copiado
    )
)

echo.
echo ========================================
if %ARCHIVOS_OK%==1 (
    echo   CONFIGURACION COMPLETADA EXITOSAMENTE
    echo ========================================
    echo.
    echo La carpeta build\ esta lista para Vercel.
    echo.
    echo Proximos pasos:
    echo   1. Ve a https://vercel.com
    echo   2. Crea una cuenta si no tienes
    echo   3. Haz clic en "Add New..." - "Project"
    echo   4. Arrastra la carpeta build\ completa
    echo   5. Espera 30-60 segundos
    echo   6. Verifica en: https://tu-proyecto.vercel.app/manifest.json
    echo.
) else (
    echo   CONFIGURACION COMPLETADA CON ERRORES
    echo ========================================
    echo.
    echo Algunos archivos no se copiaron correctamente.
    echo Revisa los errores arriba y copia manualmente:
    echo   copy src\public\manifest.json build\
    echo   copy src\public\sw.js build\
    echo.
)
echo ========================================
pause