@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ==================================================
echo   andres(R) - Servidor de desarrollo
echo   Veras el portafolio en:  http://localhost:5173
echo   Los cambios se recargan solos (no cierres esta ventana).
echo   Para detener: presiona Ctrl + C  o cierra la ventana.
echo ==================================================
echo.

REM Si es la primera vez, instala dependencias.
if not exist "node_modules" (
  echo Instalando dependencias por primera vez...
  call npm install
)

REM Abre el navegador en localhost cuando el servidor este listo (espera 6s).
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 6; try { Start-Process 'http://localhost:5173' } catch {}"

call npm run dev
