## Webpack 是做什麼用的？可以不用它嗎？

Module bundler，打包各種模組、資源的工具。
因為瀏覽器早期沒有將模組化的規範實作出來，所以不能把內容獨立成另外一個 `.js` 檔，然後 import 進主程式。

使用 Webpack 就可以在開發的時候拆很多份檔案，發布前透過 Webpack 包成一個大檔案，讓瀏覽器看得懂。  
現在也可以將 CSS、圖片等資源也包進去。  
npm 裡面的各種 library 也能引入。

不用它的話也能寫網頁，只要不用 import 等語法瀏覽器就看得懂，但原始碼就是一大坨，不好維護。

## gulp 跟 webpack 有什麼不一樣？

Webpack 是模組化工具，負責把各種資源打包起來。
gulp 是任務管理工具，制定好各項任務要做的事之後讓 gulp 幫你執行。

## CSS Selector 權重的計算方式為何？

[W3C](https://drafts.csswg.org/selectors-3/#specificity) 的 CSS specificity：

* count the number of ID selectors in the selector (= a)
* count the number of class selectors, attributes selectors, and pseudo-classes in the selector (= b)
* count the number of type selectors and pseudo-elements in the selector (= c)
ignore the universal selector

```CSS
Examples:

*               /* a=0 b=0 c=0 -> specificity =   0 */
LI              /* a=0 b=0 c=1 -> specificity =   1 */
UL LI           /* a=0 b=0 c=2 -> specificity =   2 */
UL OL+LI        /* a=0 b=0 c=3 -> specificity =   3 */
H1 + *[REL=up]  /* a=0 b=1 c=1 -> specificity =  11 */
UL OL LI.red    /* a=0 b=1 c=3 -> specificity =  13 */
LI.red.level    /* a=0 b=2 c=1 -> specificity =  21 */
#x34y           /* a=1 b=0 c=0 -> specificity = 100 */
#s12:not(FOO)   /* a=1 b=0 c=1 -> specificity = 101 */
```

先比 a，一樣的話再比 b，一樣再比 c，例如 1-0-1 > 1-0-0。

另外 !important > inline style > 其他 selector。

權重一樣時，在 `.css` 檔下面的樣式會蓋掉上面的。
