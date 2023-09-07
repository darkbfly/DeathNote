@echo off
setlocal

call :DownloadAndRename "https://raw.githubusercontent.com/smallfawn/QLScriptPublic/main/yingsheng.js" "yingsheng.js" "ys.js"
call :DownloadAndRename "https://raw.githubusercontent.com/smallfawn/QLScriptPublic/main/akrd.js" "akrd.js" "akrd.js"
call :DownloadAndRename "https://raw.githubusercontent.com/smallfawn/QLScriptPublic/main/nhsy.js" "nhsy.js" "nhsy.js" 
call :DownloadAndRename "https://raw.githubusercontent.com/smallfawn/QLScriptPublic/main/utils.js" "utils.js" "utils.js" 
call :DownloadAndRename "https://raw.githubusercontent.com/smallfawn/QLScriptPublic/main/sendNotify.js" "sendNotify.js" "sendNotify.js" 
call :DownloadAndRename "https://raw.githubusercontent.com/smallfawn/QLScriptPublic/main/sfsyV2.js" "sfsyV2.js" "sfsyV2.js" 
call :DownloadAndRename "https://raw.githubusercontent.com/smallfawn/QLScriptPublic/main/suboer.js" "suboer.js" "suboer.js" 
call :DownloadAndRename "https://raw.githubusercontent.com/smallfawn/QLScriptPublic/main/yingsheng_v2.js" "yingsheng_v2.js" "yingsheng_v2.js" 
exit /b

:DownloadAndRename
rem ����1��Ҫ���ص��ļ�URL
rem ����2������·��
rem ����3�����ļ���

set "url=%~1"
set "outputPath=%~2"
set "newName=%~3"

curl --proxy 127.0.0.1:7890 -o "%outputPath%" "%url%"

if %errorlevel% neq 0 (
    echo ����ʧ�ܣ�
    exit /b
)

if "%newName%" neq "%outputPath%" (
    del "%newName%"
    rename "%outputPath%" "%newName%"
    echo �ļ������ز�������Ϊ %newName%
) 
exit /b