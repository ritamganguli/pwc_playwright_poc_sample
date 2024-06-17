@echo off
setlocal enabledelayedexpansion

set "searchString=%1"

rem Iterate through each line in the file
for /F "tokens=8 delims= " %%A in ('npx playwright test --list') do (
    rem If the line contains the search string, print the line
    echo "%%A"
    
   if "%searchString%" == "%%A" (
        echo "Found it!!!!"
        npx playwright test -g "%searchString%"|| exit 1
    )
)