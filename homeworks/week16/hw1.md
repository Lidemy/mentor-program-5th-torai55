# hw1：Event Loop

在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```JavaScript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

輸出：13524

JavaScript 是單執行緒的語言，也就是一次只能做一件事。所以遇到非同步程式碼時，要先把他丟給 Web API（別的執行緒）處理，才不會 block 其它程式碼執行。等到 Web API 把非同步的操作處理完，再把當初設定好的 callback 帶上資料，放到 task queue，等到 JavaScript 有空時（call stack 為空）再執行。

1. 把 global 放到 call stack 上，執行裡面的程式碼。
2. 把 `console.log(1)` 放到 call stack 上，執行程式碼印出 `1`，結束後把它從 stack 上清除。
3. 把 `setTimeout(() => {console.log(2)}, 0)` 放到 call stack 上。因為是非同步的函式，丟給 Web API 執行並從 stack 上清除。因為 `setTimeout` 設定零秒，Web API 馬上把 `console.log(2)` 丟到 task queue 裡面等待執行。
4. 把 `console.log(3)` 放到 call stack 上，執行程式碼印出 `3`，再從 stack 上清除。
5. 如第二步，把 `setTimeout(() => {console.log(4)}, 0)` 放到 call stack 上、丟給 Web API、放入 task queue。
6. 把 `console.log(5)` 放到 call stack 上，執行印出 `5`，從 call stack 上清除。
7. 把 global 從 call stack 上清除。
8. call stack 為空，把 task queue 第一個 function，也就是 `console.log(2)` 放到 call stack 上執行，印出 `2`，移出 call stack。
9. call stack 為空，把 task queue 第一個 function `console.log(4)` 放到 call stack 上執行，印出 `4`，移出 call stack。

大推 [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ) 的 [視覺化網站](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)。
