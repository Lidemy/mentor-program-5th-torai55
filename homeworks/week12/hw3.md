## 請簡單解釋什麼是 Single Page Application

由前端發出非同步的 request，去戳後端 API 取得網頁所需資料，再渲染畫面。
雖然都是同一個頁面，但是 JS 也能用 history API 去改變瀏覽器上的網址。

[跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://hulitw.medium.com/introduction-mvc-spa-and-ssr-545c941669e9)  
[前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)

## SPA 的優缺點為何

### 優點

不會中斷使用者操作，像是網頁背景音樂或影片，不會隨著使用者切換其它頁面而從頭播放。

### 缺點

因為網頁內容是用 JS 動態新增的，爬蟲如果是單純爬 HTML，沒有執行裡面的 JS 的話就會看不到內容。可能會影響網站在搜尋引擎的 SEO。

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

之前是在伺服器執行 `.php` 檔，把 HTML 渲染出來後才 response 給使用者。這週則是把 HTML 直接丟給使用者，使用者打開網頁執行裡面的 JS 後才向後端取得資料並渲染（我作業二沒有XD）。