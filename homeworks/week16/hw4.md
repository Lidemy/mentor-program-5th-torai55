# hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```JavaScript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

輸出：

```JSON
2
2
undefined
```

看是怎麼呼叫 function 的。

* `obj.inner.hello() = obj.inner.hello.call(obj.inner)`，`obj.inner.value = 2`，所以會印出 2。
* `obj2.hello() = obj2.hello.call(obj2)`，`obj2.value = 2`，所以會印出 2。
* `hello() = hello.call()`，this 會是預設綁定，在嚴格模式下會是 `undefined`，非嚴格則是 `window`。不過兩者的 `this.value` 都會是 undefined。
