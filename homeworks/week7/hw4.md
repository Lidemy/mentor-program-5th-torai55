## 什麼是 DOM？

Document Object Model，中文稱文件物件模型。

將 HTML 或 XML 文件當作樹狀結構，樹的分支上有許多節點。每個節點對程式語言來說都是物件，藉由操作這些物件便可以改變文件的內容、樣式。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

![event delegation](./event_delegation.png)

如圖所示，事件在被觸發後，傳遞分成三個階段。在捕獲階段（Capture Phase）事件會由 windows 物件逐步往下傳遞。當傳到目標時為 Target Phase。最後往回傳則為冒泡階段。

`element.addEventListener(type, callback, useCapture)`

因為事件傳遞是先捕獲再冒泡，設置 EventListener 的時候，可以調整 `useCapture`，決定要在捕獲階段（useCapture = true）還是冒泡階段（useCapture = false）執行 callback。

特別的是 Target Phase 依照瀏覽器的版本，EventListener 被觸發的順序可能會不同。

舊版瀏覽器在 Target Phase 會依照註冊的順序觸發 EventListener。而Chrome 89.0.4363.0 以上的版本則統一先捕獲再冒泡（[來源](https://juejin.cn/post/6965682915141386254)）。

## 什麼是 event delegation，為什麼我們需要它？

例如一個 unordered list `<ul>`：

```html
<ul>
  <li>item1</li>
  <li>item1</li>
  <li>item1</li>
</ul>
```

裡面有許多項目，如果針對每一個 `<li>` 都設置 EventListener，整個頁面的 EventListener 就會顯得太多。

這時在共同的親代 `<ul>` 上設置 EventListener，因為事件傳遞上一定會經過 `<ul>`，就可以減少 EventListener 的數量，這就是事件代理。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

event.preventDefault()：阻止元素的預設行為。

event.stopPropagation()：停止事件繼續傳播。會把同個元素下其它 EventListener 執行完。

event.stopImmediatePropagation()：馬上停止事件傳播。同個元素還沒被執行的 EventListener 也不會被執行。

```html
<body>
    <div class="outer" style="background:red;width:300px;height:200px;">outer
      <div class="inner" style="background:green;width:200px;height:100px;">inner
        <input type="checkbox" class="sample">
      </div>
    </div>
</body>
```

```JavaScript
// 阻止預設行為，所以沒辦法打勾
const sample = document.querySelector('.sample')
sample.addEventListener('click', (e) => {
  e.preventDefault()
})

// 綠色在紅色裡面，若點綠色會跳兩次 alert
const outer = document.querySelector('.outer')
outer.addEventListener('click', (e) => {
  alert('outer listener')
})

const inner = document.querySelector('.inner')
inner.addEventListener('click', (e) => {
  alert('inner listener')
  // 加入這行，點綠色則只會跳一次 alert
  // e.stopPropagation()
})
```
