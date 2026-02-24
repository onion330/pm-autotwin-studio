@echo off
title PM AutoTwin Studio - Local Server
echo.
echo ================================================
echo   PM AutoTwin Studio - Local Development Server
echo   http://localhost:621
echo ================================================
echo.
echo Starting development server...
echo.
cd /d "%~dp0"
start http://localhost:621
npm run dev
pause
