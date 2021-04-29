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
3. 進入第一個迴圈，指定 i=0。
4. i=0，`i < arr.length` 成立，繼續執行迴圈，arr[i]=3；`arr[i] <= 0` 不成立，不進入 if 執行區塊，i++。
5. i=1，`i < arr.length` 成立，繼續執行迴圈，arr[i]=5；`arr[i] <= 0` 不成立，不進入 if 執行區塊，i++。
6. i=2，`i < arr.length` 成立，繼續執行迴圈，arr[i]=8；`arr[i] <= 0` 不成立，不進入 if 執行區塊，i++。
7. i=3，`i < arr.length` 成立，繼續執行迴圈，arr[i]=13；`arr[i] <= 0` 不成立，不進入 if 執行區塊，i++。
8. i=4，`i < arr.length` 成立，繼續執行迴圈，arr[i]=22；`arr[i] <= 0` 不成立，不進入 if 執行區塊，i++。
9. i=5，`i < arr.length` 成立，繼續執行迴圈，arr[i]=35；`arr[i] <= 0` 不成立，不進入 if 執行區塊，i++。
10. i=6，`i < arr.length` 不成立，跳出迴圈。
11. 進入第二個迴圈，指定 i=2。
12. i=2，`i < arr.length` 成立，繼續執行迴圈；`arr[i] !== arr[i - 1] + arr[i - 2]` 不成立，不進入 if 執行區塊，i++。
13. i=3，`i < arr.length` 成立，繼續執行迴圈；`arr[i] !== arr[i - 1] + arr[i - 2]` 不成立，不進入 if 執行區塊，i++。
14. i=4，`i < arr.length` 成立，繼續執行迴圈；`arr[i] !== arr[i - 1] + arr[i - 2]` 成立，進入 if 執行區塊。
15. 執行 `return "invalid"` 回傳 "invalid"，跳出函式，執行完畢。
