## 什麼是 Ajax？

[wiki](https://en.wikipedia.org/wiki/Ajax_(programming)) 上面有一張很棒的圖。

![Ajax](https://upload.wikimedia.org/wikipedia/commons/0/0b/Ajax-vergleich-en.svg)

全名為 Asynchronous JavaScript and XML。重點在那個非同步，讓網頁能夠一邊跟使用者進行互動，一邊與伺服器溝通的技術。等到伺服器做出回應，瀏覽器（JavaScript runtime）會自己找空檔（透過 event loop）把內容更新到網頁上。

若是同步執行，網頁與伺服器溝通時，使用者就無法對網頁做操作。

## 用 Ajax 與我們用表單送出資料的差別在哪？

利用表單送出資料是同步的方法。瀏覽器先使用 GET 從伺服器取得表單的頁面，使用者填完資料後，瀏覽器再用 POST 從伺服器取得新的頁面資料。取得新的頁面後再重新 render（server side render）。

這兩個頁面間，如 nav bar 和 footer 或許就能共用，但伺服器還是整個頁面都放進 response，使效能較不好。使用者在送出表單，到瀏覽器 render 出新的頁面前也無法與這個網頁做其他互動。

用 Ajax 送出 request 的話，可以只取需要更新部分的資料（如留言區），透過瀏覽器內的 JavaScript render 出頁面（client side render）。就不會中斷使用者的操作，也不會重複傳入整個頁面造成效能上的浪費。

## JSONP 是什麼？

JSON with padding。顧名思義，就是 JSON 資料外面包了一層 padding。

因為在瀏覽器上有個 [same origin policy](https://developer.mozilla.org/zh-TW/docs/Web/Security/Same-origin_policy)，瀏覽器會檢查 server response 的 header `Access-Control-Allow-Origin` 是否和發出 request 的網域 `origin` 相同，不同的話 response 會被瀏覽器擋下來不給網頁拿到（但 request 還是有成功發出去）。

但 HTML 上有些標籤，本來就常會引用外部資源，不必遵守同源政策，例如 `<script>`、`<img>`。而 `<script>` 的內容又可以作為 JavaScript 程式碼使用，而衍生出了 JSONP 這個用法來獲取跨網域的資源。

若使用有支持 JSONP 的 API，只要在 query string 中加入特定參數（根據 API 規範），那 API 會在回傳資料的外面包上你指定 function 名字的執行程式碼。

例如這個 script 標籤會回傳使用者資料，帶上 `jsonp=parseResponse` 指定 function 的名字。

```HTML
<script src="http://server.example.com/RetrieveUser?UserId=1823&jsonp=parseResponse"></script>
```

瀏覽器最後所得到的結果，API 伺服器已經幫忙包好，變成 function call。只要在這網頁定義好 `parseResponse` 要做什麼，等資料回來就會自動執行了。

```JavaScript
parseResponse({"Name": "小明", "Id" : 1823, "Rank": 7})
```

## 要如何存取跨網域的 API？

如上，透過 JSONP 是一種方法，或者也能利用 XHR 或是 Fetch API 送 request。

一般送 request，server 允許的話會自己附帶 `Access-Control-Allow-Origin: *`（或自己網域）的 response header，告訴瀏覽器允許 CORS。

request 也分成 [簡單請求與非簡單請求](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS#%E7%B0%A1%E5%96%AE%E8%AB%8B%E6%B1%82)，發送非簡單請求前，瀏覽器會自動發送一個 http method 為 OPTIONS 的 preflight request，向伺服器確認是否允許這網域存取。若否，瀏覽器就不會發送接下來的 request。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

同源政策這些，都是瀏覽器為了使用者安全所做出的限制。而第四週我們是在 Nods.js 上面執行 JavaScript 程式碼，所以在本地端執行時沒有瀏覽器的限制，自然就暢行無阻。用 curl 發 request 也是同樣的道理，只是工具不同。
