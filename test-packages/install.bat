@echo off
setlocal
chcp.com 65001 >nul
node "%~dp0install.mjs"
exit /b %errorlevel%
