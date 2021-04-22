```js
function isValid(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= 0) return "invalid";
  }
  for (var i = 2; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + arr[i - 2]) return "invalid";
  }
  return "valid";
}

isValid([3, 5, 8, 13, 22, 35]);
```

## 執行流程

1. 執行 `isValid([3, 5, 8, 13, 22, 35])` 進入 function。
2. `arr = [3, 5, 8, 13, 22, 35]`。
3. 進入第一個迴圈，i=0。
4. i=0，`arr[i] <= 0` 回傳 false，不進入 if 執行區塊， i++。
5. i=1，`arr[i] <= 0` 回傳 false，不進入 if 執行區塊，i++。
6. i=2，`arr[i] <= 0` 回傳 false，不進入 if 執行區塊，i++。
7. i=3，`arr[i] <= 0` 回傳 false，不進入 if 執行區塊，i++。
8. i=4，`arr[i] <= 0` 回傳 false，不進入 if 執行區塊，i++。
9. i=5，`arr[i] <= 0` 回傳 false，不進入 if 執行區塊，i++。
10. i=6，`i < arr.length`回傳 false，跳出迴圈。
11. 進入第二個迴圈， i=2。
12. i=2，`arr[i] !== arr[i - 1] + arr[i - 2]`回傳 false，不進入 if 執行區塊，i++。
13. i=3，`arr[i] !== arr[i - 1] + arr[i - 2]`回傳 false，不進入 if 執行區塊，i++。
14. i=4，`arr[i] !== arr[i - 1] + arr[i - 2]`回傳 true，進入 if 執行區塊。
15. 執行 `return "invalid"` 回傳 "invalid"，跳出函式，執行完畢。
