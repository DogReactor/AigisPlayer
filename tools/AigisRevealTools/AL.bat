@ECHO off
SET PATH=%~dp0Utilities\Lua 5.3;%~dp0Utilities\GraphicsMagick;%PATH%
lua Scripts\parseAssets.lua %1% %2% %3%