## 十一到十五週心得

### week11：資訊安全

非常匆忙的一週。在學習資安知識後，回頭把第九週的作業加強防護。另外也要從零寫出一個簡單的部落格。可能因為部落格要一次把前後端一起生出來的關係，頁面和 API 的檔案都好多。寫的時候常常在各種功能之間跳來跳去，整個很混亂。最後花很多時間，一直到星期日晚上才發 PR 推上去。寫出來的結果還是一堆 BUG，到現在這週還沒修完，對改作業的助教真的很不好意思QQ

對於 XSS、SQL injection、CSRF 稍微有個概念。對比這週之前，寫出來的東西應該有比較安全一點吧。

### week12：前後端整合

主要在熟悉新的工具：jQuery、Bootstrap。其實這週也有講 SCSS，不過前幾週覺得寫純 CSS 檔案很亂很痛苦，就先去偷學來用。jQuery 很棒，拿來寫作業不太需要思考（不過不熟的東西還是要查），靠直覺寫出來的東西就蠻整齊，還被當週批改的助教稱讚很乾淨，都是 jQuery 的功勞。Bootstrap 就……不太喜歡。方便歸方便，但 utility CSS 的寫法就是不太習慣，還有樣式會蓋來蓋去的問題，自己手刻比較好調整。用 Bootstrap 寫作業的時候常常盯著頁面發呆，不知道該如何下手。

### week13：現代前端工具

這週才是課程安排會碰到 SCSS 的時間點。我在 week12 的時候順便把 SCSS 課程看完，所以才搞錯時間吧。課程介紹了 webpack、gulp、babel，這些幫助開發的工具們，還有 promise、async/await、Regex。用這些工具，最痛苦的莫過於設定適合的 config。不過只要設定完，接下來就會省事很多。跟著課程做一個 plugin 還蠻有成就感的。

### week14：伺服器與網站部署

很好玩的一週。星期一去課程總覽確認要做什麼，結果整個黑人問號。看完 MTR05 講完這週概要，還是黑人問號。第一次遇到這種情況，以往都是先看完老師的課程影片，研究得差不多再來自己動手做。這週打破以往的模式，沒有什麼指定教材，只有說要買主機、租網域、部屬前幾周的作業。不知道該從哪裡開始，有點手足無措的情況下，決定直接開始寫作業。

hw1 馬上一個大魔王，以往對於 system design 的認識僅止於聽過這個名詞而已。只好以老師提供的關鍵字上網到處亂搜，看別人是怎麼設計短網址服務的。收穫了很多，對於網頁服務整體是怎麼運作的也更有概念。

hw2 就是期待已久的部屬，感覺使用 AWS 的人比較多，遇到問題應該會比較好求助，於是選擇使用 AWS。第一天，點進去網頁發現服務有夠多，整個超迷茫。發現有簡單的 tutorial，就先跟著動手試著做了幾個。第二天知道各個服務大概在做什麼以後，跟著官方的文件架了虛擬機，然後把網站部署上去。第三天從頭再做一次，過程中順便截圖當作業素材。

真的很好玩，也很多坑。剛開始對防火牆的設定不熟，開啟防火牆之後沒把 SSH 用的 22 port 打開，導致自己連不上去，還花很多時間在找原因。

### week15：複習週

這就要講到前幾週的作息。

> （第十五週 22:00 左右和朋友聊天）  
> 朋友：好啦先這樣，我明天要五點起來。  
> 我：八八拉。  
> 朋友：搞不好你還沒睡XDD  
>
>（5:00 左右）  
> 朋友：👍🏻👍🏻👍🏻👍🏻  
> 我：崩潰，突然連不進去虛擬機。  
> ：我好像知道了。  
> （原本想了快一小時，講完突然靈光一閃，發現是防火牆設定在搞）

弄完 + 盥洗 + 耍廢一直拖到快八點才睡。睡夢中以為自己防火牆的問題還沒解決，直接從床上彈起來XDD。這幾週作息都日夜顛倒，這週衝勁沒了疲勞感不斷湧現。再加上心情有點低落，主要的時間都拿來睡覺了。

然後複習一點 CORS、看一點資料庫的東西、修一點點前幾週作業、耍廢放空這週就結束了，作息還沒調回來。

滑 FB 看到有人有在 localhost 使用 https 的需求。去搜尋貼文底下的關鍵字，發現可以利用 reverse proxy 伺服器，申請憑證配合 SSH tunneling 讓 localhost 也能使用 https。趁複習週沒事試著實作，有成功做出來還蠻開心的。如果要說什麼時候會用到……大概是在 local 端測試時想要送出 `SameSite=None; Secure` 的 third-party cookie 會需要吧（總之現在還沒用到XD）。

最近越來越常懷疑，上完課後自己是否真的擁有足夠勝任工作的能力。目前還是對後端比較有興趣，但是資料庫的東西像個無底洞，越查越覺得自己完全不懂，例如 [lock 其實有八種](http://sj82516-blog.logdown.com/posts/2726561)，還有分隔離層級等等的東西，要怎麼下 query、怎麼 index 資料庫的運行效能會比較好，不同資料庫、不同 storeage engine 又有許多不同之處，各個都是學問。伺服器方面也是，光設定 config 就被許多客製化的東西（如 virtual host、proxy、TLS/SSL certificate）弄到頭昏腦脹，看一看會開始思考自己連這些文件都看不太懂，只會用別人寫好的工具（例如 TLS/SSL 只要用 certbot 下簡單的命令就能把 apache 的 config 全都設定好），是不是不太適合走後端。

這週期中考，原本打算螢幕錄影，不過寫程式的過程意外按到錄影終止的按鍵，氣到不錄了。寫的過程有夠緊張，對於之前學的東西也不太記得，連 appendChild 都要上網查，真D慘XDD。不過有在時限內寫出來，整體不難但挺好玩的。

反正就走一步算一步吧，學完之後突然不想當工程師也好。不過作息跟時間管理還是得加強，不想要整個生活都是寫程式，還想放一點其他東西。
