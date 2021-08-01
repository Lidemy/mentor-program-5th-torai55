# hw2：Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```JavaScript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

輸出：

```JSON
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

1. 先建立 global execution context(global EC)。

    ```JSON
    globalEC = {
      VO: {
        i: undefined
      }
    }
    ```

2. 把 `main()` 放入 call stack。
3. 執行程式碼。`VO.i = 0`，執行 for 迴圈：把 `console.log('i: ' + i)` 放入 call stack，執行印出 `i: 0`，從 call stack 上清除。把 `setTimeout(() => {console.log(i)}, i * 1000)` 放入 call stack，代入 `i = 0` 變成 `setTimeout(() => {console.log(i)}, 0)`，告訴 Web API 0 秒後執行 `() => {console.log(i)}`，於是 Web API 馬上把 `() => {console.log(i)}` 放入 task queue。
4. `VO.i = 1`，執行 for 迴圈：把 `console.log('i: ' + i)` 放入 call stack，執行印出 `i: 1`，從 call stack 上清除。把 `setTimeout(() => {console.log(i)}, i * 1000)` 放入 call stack，代入 `i = 1` 變成 `setTimeout(() => {console.log(i)}, 1000)`，Web API 會在 1 秒後把 `() => {console.log(i)}` 放入 task queue。
5. 重複第四步，把 i 改成 2、3、4。
6. `VO.i = 5`，跳出迴圈。
7. pop call stack 的 `main()`。
8. call stack 為空。tack queue 的 `console.log(i)` 被 event loop 放到 call stack，執行後去抓 global EC 的 `VO.i`，印出 5。
9. 1 秒的 `setTimtout` 執行結束，Web API 把 `() => {console.log(i)}` 放入 task queue。因為 call stack 是空的，event loop 把 `console.log(i)` 移到 call stack，`VO.i = 5`，執行印出 `5`。
10. 重複第九步，改成 2、3、4 秒的 `setTimtout` 執行結束。
