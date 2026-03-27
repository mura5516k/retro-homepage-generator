@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies...
  set npm_config_cache=%~dp0.npm-cache
  call npm install
  if errorlevel 1 exit /b %errorlevel%
)
call npm run dev
