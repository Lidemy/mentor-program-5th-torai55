# 教你朋友 CLI

## 什麼是 command line

GUI 是 Graphical User Interface 的縮寫，是以圖形方式顯示的電腦操作使用者介面。如 windows 中的桌面及視窗等等，可通過滑鼠等指標裝置進行選擇。

而 Command Line Interface (CLI) 相對於 GUI，通常不支援滑鼠，使用鍵盤作為輸入指令以操作電腦。好處是占用資源少，省下的資源可以做其他用途。許多情形下不一定會有 GUI 給使用者操作——例如遠端連線操作伺服器——這時 CLI 就是一個好用的介面。有時候也會稱為 prompt、console、terminal。常見的 CLI 程式有 PowerShell、Zsh、Bash、Cmder、cmd.exe 等等。

## 如何使用 command line

```shell
pwd              #Print Working Directory 印出當前路徑
ls               #LiSt 印出路徑下的檔案
cd <path>        #Change Directory 切換路徑到path資料夾
cd ..            #回到上一層
cd ~ <Downloads> # ~ 代表 Users/user/
clear            #把畫面清空

touch <file>     #建立檔案或更改時間
rm <file>        #ReMove file 刪除資料夾可用 rmdir dir 或是 rm -r dir
mkdir <dirname>  #MaKe DIRectory
mv <file> <file_or_directory> #MoVe 移動檔案或者改名

cp <source> <goal>    #CoPy 複製檔案
cp -r <source> <goal> #複製資料夾

vim <file>          #用 vim 文字編輯器打開檔案
cat <file1> <file2> #接連印出兩個檔案的內容，也可只輸入一個檔案當作印出內容
less <file>         #分頁式印出檔案，按 q 離開

grep <string> <file> #搜尋字元
wget <url>           #由網址下載檔案
open <file>          #打開檔案
curl <url>           #送出request

#redirection `>`
echo "123" > 123.txt #將內容輸出到 123.txt 之中，會蓋掉原有內容，若沒有檔案則會新增一個。
echo "append to the end of the file" >> 123.txt #將輸出內容附加到 123.txt 之中，若沒有檔案則會新增

#pipe `|`
#將前項的輸出結果當作後項的參數輸入
cat hello | grep o > result

which <command>     #印出此指令的執行檔位置
ping <ip>           #丟一個封包過去伺服器，紀錄來回所花的時間
nslookup google.com #查詢 google 的 ip 位置

#查詢功能與說明
man <command>
info <command>
<command> --help #windows 用這個

top  #table of processes
date #print current date
```

## 如何用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案

1. 打開你的 CLI 程式。

2. `mkdir wifi` 建立叫做 wifi 的資料夾。

3. `cd wifi` 進入 wifi 資料夾內。

4. `touch afu.js` 建立叫做 auf.js 的檔案。
