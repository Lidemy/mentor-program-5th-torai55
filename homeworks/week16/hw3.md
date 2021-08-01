# hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

輸出：

```JSON
undefined
5
6
20
1
10
100
```

1. 建立 global EC。執行 `a = 1`。

   ```JSON
   globalEC = {
     VO: {
       a: 1,
       fn: function pointer
     }
     scopeChain: [globalEC.VO]
   }
   fn.[[scope]] = globalEC.scopeChain
   ```

2. 執行 `fn()`，建立 fn EC。

    ```JSON
    fnEC = {
      AO: {
        arguments,
        a: undefined,
        fn2: function pointer
      }
      scopeChain: [fnEC.AO, fn.[[scopeChain]]] = [fnEC.AO, globalEC.VO]
    }
    fn2.[[scope]] = fnEC.scopeChain
    ```

3. 執行 fn 中的程式碼。
   1. `console.log(a)`，印出 undefined。
   2. `fnEC.AO.a = 5`
   3. `console.log(a)`，印出 5。
   4. `fnEC.AO.a = 5 + 1 = 6`
   5. `執行 fn2()`

    這時的 fnEC：

    ```JSON
    fnEC = {
      AO: {
        arguments,
        a: 6,
        fn2: function pointer
      }
      scopeChain: [fnEC.AO, fn.[[scopeChain]]] = [fnEC.AO, globalEC.VO]
    }
    fn2.[[scope]] = fnEC.scopeChain
    ```

4. 建立 fn2 EC。

    ```JSON
    fn2EC = {
      arguments,
      AO: {},
      scopeChain: [fn2EC.AO, fn2.[[scope]]] = [fn2EC.AO, fnEC.AO, globalEC.VO]
    }
    ```

5. 執行 fn2 中的程式碼。
   1. `console.log(a)`，在 fn2EC.AO 找不到 `a` 這個變數，順著 scopeChain 往上找，在 fnEC.AO 找到 `a` 的值是 6，印出 6。
   2. 因為 fn2EC.AO 沒有 `a`，往上找到 fnEC.AO 的 `a`，把值設定成 20。
   3. fn2EC.AO 沒有 b，往上找到 globalEC.AO 都沒有 b，所以設定 `globalEC.AO.b = 100`。
   4. 這時的 EC stack：

      ```JSON
      fn2EC = {
        arguments,
        AO: {},
        scopeChain: [fn2EC.AO, fn2.[[scope]]] = [fn2EC.AO, fnEC.AO, globalEC.VO]
      }
      ===
      fnEC = {
        AO: {
          arguments,
          a: 20,
          fn2: function pointer
        }
        scopeChain: [fnEC.AO, fn.[[scopeChain]]] = [fnEC.AO, globalEC.VO]
      }
      fn2.[[scope]] = fnEC.scopeChain
      ===
      globalEC = {
        VO: {
          a: 1,
          b: 100,
          fn: function pointer
        }
        scopeChain: [globalEC.VO]
      }
      fn.[[scope]] = globalEC.scopeChain
      ```

   5. fn2 之中的程式碼執行完畢，把 fn2EC 從 stack 清除。

6. 在 fn() 執行程式碼。`console.log(a)`，印出 20。fn() 執行完畢，從 stack 上清除。
7. 此時的 stack：

    ```JSON
    globalEC = {
      VO: {
        a: 1,
        b: 100,
        fn: function pointer
      }
      scopeChain: [globalEC.VO]
    }
    fn.[[scope]] = globalEC.scopeChain
    ```

8. 執行 global 的程式碼。
   1. `console.log(a)`，印出 1。
   2. `global.VO.a = 10`
   3. `console.log(a)`，印出 10。
   4. `console.log(b)`，印出 100。
