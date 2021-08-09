## 什麼是 MVC？

一種軟體架構的設計模式，把程式碼依照負責的功能分成 Model、View、Controller 三種，這樣在撰寫時只要關注特定功能即可，也比全部邏輯混在一起好維護。

* Model：負責商業邏輯，向資料庫取資料後回傳結果。例如電商網站中會員購物有九折、訂單超過一定的金額免運費、檢查登入帳號的類型，並依此開放不同權限。
* View：負責畫面。通常是放 template engine 渲染所需的 HTML template。
* Controller：負責跟使用者互動，接收 request 做判斷後回傳 response。例如使用者是否只能閱讀資料，但不能修改或刪除等等的判斷。

我自己是這樣分的：要接資料庫就寫在 Model，資料庫一張 table 對應一個 `model.js`；要給 route 用的就寫在 controller，用資源區分檔案有點 RESTful api 的味道，例如 `controller/comment.js` 就是使用者訪問 `domain/comments` 時所需執行的動作；HTML template 就放在 view。

[參考](https://tw.alphacamp.co/blog/mvc-model-view-controller)

## 請寫下這週部署的心得

Heroku 真的很方便，做完基本設定（安裝 heroku cli、用 Add-ons 設定 clearDB 資料庫）後，幾乎算是一鍵部屬，只要用 git push 到 heroku remote 的 master branch 就行。

對比之前用 AWS，需要建立 EC2 虛擬機、安裝並設定 Apache server（或 Nginx，有用 express 寫後端的話應該不用）、安裝 MySQL 並設定連線的使用者與權限。全部都要自己來，很多小細節要注意。雖然比較能客製化，但如果只是想簡單的 host 一個網站就有點太麻煩。

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？

太愛 Node.js 了。PHP 語法實在用不慣，前後端都用同一種語言寫起來就是順很多。不用擔心修一修前端頁面的 script 然後去改後端，結果不小心用 JavaScript 的語法寫 PHP 的情況發生。原本想說 Node.js 可以用 MVC、還有 npm 套件管理工具很方便。不過查了一下 PHP 也有套件管理工具 composer，而且配合 Apache server 做 routing 應該也是能達成 MVC 的寫法。可能對 JavaScript 比較熟悉的關係吧，就是覺得寫 JS 比寫 PHP 爽很多。
