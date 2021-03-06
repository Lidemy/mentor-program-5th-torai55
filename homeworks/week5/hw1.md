## 前四週心得與解題心得

### 前四週心得

#### 平常生活

課程剛開始的興奮感也消退了，發現維持每天發心得其實蠻難的，本來就話不太多，常常想不到要打什麼內容。到現在其實每天生活都差不多，也就是跟著教材看課程寫作業，遇到額外想理解的內容就先記下來抽空去讀，兩三天跑個步讓自己不要太悶。

#### 寫 code 時

第二、三週是設計給不熟悉程式運行的新手，主軸放在解 LIOJ 題目上，練習將腦中想法轉換成程式碼，並模擬程一行行執行的過程來除錯。

自己看到題目通常蠻快有想法，不過在實作上都會卡在把邏輯釐清、轉換成程式碼的部分，沒辦法像 Huil 在預錄影片 live coding 那樣，直接把想法輸入在螢幕上那般流暢。對一些細節如臨界條件怎麼設定、奇怪輸入的處理都不是很敏銳，常常寫完給助教改才發現某些情況下會出錯。希望寫題目的經驗能再豐富一點，這樣對於錯誤處理應該會更快、更完善，不然作業被助教改出錯誤好難為情。

對於什麼是爛 code 還是不太理解。很想要寫出易讀的程式碼，但光是命名變數和函式就好難，名稱到最後還是讓人混淆，到底該怎麼辦RRR

寫題目之前原本想要試試看單元測試，可是讓單元測試能夠跑起來所花的時間反而比寫題目還長，覺得很蠢就回到 repl.it 上面寫作業。大概等到以後真的需要實作一些比較複雜的專案，再去研究怎麼使用。現在回頭看，發現 readline 讀取檔案的方式就是用 stream，更能理解那些 eventListener 在做什麼，原來之前找不到方向到處亂查還是有點用的。

#### 寫文章的困難

真的很不擅長把知識整理起來拿去教別人，複習週一直想說要把前幾週的課程內容整理成文章發到 CoderBridge 上，不過只發了少少內容。

一是寫文章比想像中的還花時間，遇到比較瑣碎的部分就會很煩躁，例如寫語法的各個範例；另一個原因是自己的筆記太鬆散，通常是只記容易忘記的部分方便回來查，如簡單記下 module 的用法。比較少把觀念整個講過，所以獨立成一篇文章內容有點空洞。像是 Markdown 和 Regular Expression 的部分我認為要用到再上網查規則就好，拿來寫成文章好像也只是查文件把範例再寫一遍而已沒什麼意義。

如 Hoisting、Event Loop 等等課程裡還沒提到，只是好奇先去了解的東西也沒做筆記。不過這種概念性的內容似乎比較適合做筆記寫成文章，從現在開始培養對課程以外的內容作筆記的習慣比較好。

文筆也有差，學長姐們的結業心得讀起來都很活潑，讓人想繼續讀下去。現在我的這些心得比較像給自己看的，內容偏雜亂，想到什麼就直接寫上來，不太有文章的脈絡。

#### 總結

還有很多地方需要改進。雖然目前能跟著課程進度，但懶惰的性格浪費了很多時間。如果能多一點時間跟心思在學習上，像是多去偷看同學寫的作業、把作業修得仔細一點，應該能學到更多。

###  [Lidemy HTTP Challenge](https://lidemy-http-challenge.herokuapp.com/start)

 很像文字版密室逃脫之類的小遊戲，玩得蠻開心的。透過互動的方式把如何發送 request 重新複習了一遍，途中也學習到一些東西，像是大概能看懂 User-Agent 上面寫的資訊，或者 base64 轉 utf8 這種字元編碼之間的轉換實際上是怎麼做的，HTTP Authentication 的方法、content-type 的各種類型等等。在處理問題的同時邊查資料邊學習，做完一個問題就馬上有成就感，比起單純一直看教學讓人更有動力。

### LIOJ 題目：1016, 1017 以及 1018

1016 不合群的人，看到題目直覺想到把選 A 的人和選 B 的人分開各存成一個 array，比較兩者長度就知道哪邊是少數。不過若是多出 C、D、E 選項，就必須修改程式碼才能判斷。或許可以把陣列放到物件內，用選項 'A'、'B' 當作屬性名稱，就不用手動一個個宣告陣列。

1017 貪婪的小偷，把物品依照價值由小排到大，再 `array.pop()` 小偷能帶走的數量相加即可，要注意的是如果小偷能帶的數量超過 array 長度，會 pop 出 undefined，設中斷條件或是相加之前用短路解析把 undefined 換成 0 都能解決。

1018 大平台，把陣列整個遍歷過一遍，用物件來記錄目前長度跟最大值、還有辨認現在在哪個階梯，最後輸出最大值即可。實際寫起來判斷很多很雜，不太好讀。後來想到，可以用物件的屬性來記數量，例如再陣列中讀到 '1'，就 `object['1']++`，最後比較誰最大就行了。


