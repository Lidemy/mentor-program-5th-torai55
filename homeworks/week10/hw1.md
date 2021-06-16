## 六到十週心得與解題心得

### 第六週：HTML 與 CSS

認識很多 SEO 相關的標籤，還有語意化標籤。CSS 則是學了各種排版方式，如 flex box、grid、position 等等。

一直覺得這些東西複雜又繁瑣，數量太多了實在記不住。其實我一開始就把常用的片段，例如 html head 那一大串、還有 CSS reset，通通設定進 VS Code 的 user snippets，就不用自己重複輸入那堆東西。雖然是看得懂在做什麼，不過憑空大概寫不出來。上網查 [HTML boiler template](https://html5boilerplate.com/) 還是能找到範本，希望不要遇到哪天需要手刻又不能上網的情況。

看起來還是只能靠多練習來慢慢熟練這一塊，覺得切版實在有夠痛苦，常常東少一塊西少一塊，需要從很亂的 CSS 裡面找出問題所在，然後去改掉。有點開始想用預處理器了，大概有聽過 SASS、SCSS，用巢狀的方式放 selector 找東西應該會比較好找，其他新功能要額外花時間熟悉。

### 第七週：前端 JavaScript——DOM

利用製作表單驗證等等來熟悉 DOM，查資料也發現還有個 BOM，大概是 DOM + `window` (例如 `window.location` 可以重新導向、`window.history` 可以回上一頁)吧。提供的 API 好多，剛開始使用都會邊寫邊查 W3C 或是 MDN 的分頁，不知不覺就佔一大堆瀏覽器分頁。

從 eventListener 來習慣使用 callback（不知道這算不算非同步？）。這週感覺不太難，只是不熟悉的時候常常要去查用法。

### 第八週：前端串 API——XHR

Callback Hell。
因為第四週用 node API 處理過類似的事情，那時候研究範例很久，一行一行看，思考為什麼要傳這多層。所以寫這週作業的時候還不算太卡，用差不多的邏輯把 function 包一包就結束。

寫到後來自己整理出一個心法：只要專注在目前在寫的這個 function 要做什麼就好。如果是非同步的就在參數放 callback，用 `callback(result)`處理結果；是同步就用 `return result` 處理。`result` 後續要做什麼加工是函式外面的事，寫函式的時候一概不管。

例如 [作業2](https://github.com/Lidemy/mentor-program-5th-torai55/blob/master/homeworks/week8/hw2/app.js) 的 `getTopGames` 和 `getStreams`，如果先去思考等等還要在函式裡呼叫 `callTwitchAPI`，在 `callTwitchAPI` 裡面的 callback 要做什麼、該怎麼分工，那開始做之前就要花很多時間釐清思緒。

如果這麼想：`callTwitchAPI` 只負責幫忙發 request，是非同步的，所以拿到資料要做的事在他的 callback；`getTopGames` 要把 `callTwitchAPI` 的參數先設定好再呼叫它，輸出是遊戲的 `array`，是非同步的所以要 callback。再來補上中間的過程，也就是轉成 array 再交給 callback 對 `array` 做進一步處理。

這樣比較不會分心去思考現在放的這個 callback 等等要做什麼，跟現在這個函式要怎麼分工之類的。有稍微減少混亂的感覺。

進階版應該是 Fetch API 和 Promise、async/await 吧，偷偷看了一下用法，好像比 XHR 更平易近人。

### 第九週：PHP、SQL

從接觸的那刻開始，就不是很喜歡 PHP。會把 HTML 弄亂，變數前面還要加 `$` 好原始。很多地方和 JavaScript 不太一樣，好像換了個腦袋用起來好痛苦。這週就是痛苦地用著 PHP，配上 MySQL 練習寫一個簡單不太考慮資安的留言板。

接觸到 cookie、session、SQL 之後瞬間覺得事情變得好虛幻，這就是後端的世界啊。加上需要用 apache 伺服器和 FTP 傳檔案，在本週 MTR05 講解作業要怎麼交的時候，常常案暫停花一段時間在腦中整理、思考現在我在哪裡，要做什麼。

例如我把檔案上傳到老師的 FTP 伺服器，然後老師有架伺服器讀取並執行特定資料夾下的檔案，且根據檔案的路徑做 routing，所以才能在 `http://mentor-program.co/mtr04group1/Torai/week9/hw1/` 這個 URL 下存取到我寫的頁面。

自己寫作業的時候，則是在本地開一個伺服器，所以 URL 直接用 localhost 就能讀取，不用上傳 FTP。

把概念理清楚後，就不會一直感覺搞不太清楚狀況，寫作業時不算太困難。因為 session 可以很多方法實作，到現在感覺還是很不熟，需要再多多加強。

### 第十週：複習

這幾週漸漸出現實際可以拿出來玩的頁面，成就感又比前五週純解數學題目高，有種從零到有創造出什麼的感覺。

這週小挑戰要用 Node.js 發 request 的時候一直想到瀏覽器的 XHR，完全忘記第四週的 https 套件，老ㄌ。一直到 google node http client 才想起來有用過，可是還是忘記怎麼用，只好回去看跟第四週看過的文件還有自己的筆記。好在還是有點印象，看文件的速度應該比當初快一點。

應該在學到一個新的東西後，就把它寫成簡單的例子與說明記在筆記上。需要的時候再回去搜尋，應該會比上網找文件還快。

觀察同學作業、回頭複習時想到，應該可以把寫作業時遇到的瓶頸、思路、或者一些小陷阱、新學到的東西等等編寫邊紀錄，開一份 summary.md 連同當週作業一起上傳到 GitHub，這樣在回頭複習的時候應該會比較方便。

深感自己能力很差，對於很多基本知識都還不認識，所以才會常在閱讀文件或者觀念理解上卡住。例如[鳥哥的基礎網路概念](http://linux.vbird.org/linux_server/0110network_basic.php) 第四週講到網路時雖然瞄過，不過好像在霧裡看花。在這週大概花一天的時間慢慢把它讀完後才有點開竅，大概有個概念但細節還是不清楚，概念性的東西太多，沒有實際用上的話一陣子就會忘了吧。

不知道助教想要充實基礎知識的話會怎麼做（？）
