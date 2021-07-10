# 作業筆記

## hw1

架構圖放在 draw_io 底下。

### pagination

#### cursor based

[cursor based pagination](https://ithelp.ithome.com.tw/articles/10207738)

#### offset/limit based

offset = (page - 1) * limit

#### 要怎麼知道後面還有資料?

假設總共有十一筆資料，每次需要用到五筆資料。

那麼只要每次從資料庫撈六筆資料，如果沒滿六筆就知道後面沒資料了。

mark 為從資料庫撈的，粗體為實際用到的資料。

step1. <mark>**1 2 3 4 5** 6</mark> 7 8 9 10 11

step2. 1 2 3 4 5 <mark>**6 7 8 9 10** 11</mark>

step1. 1 2 3 4 5 6 7 8 9 10 <mark>**11**</mark>

假設總共有十筆資料，那麼第二次 fetch 的時候未滿六筆，就知道後面沒資料了。

## hw2

照作業敘述做的 todo list，因為辨認內容用的 id 帶在 URL 上，所以可以進入別人的 todo list 並修改內容。如果要加強防護，可能需要實作登入功能。多人同時使用同一個 id 時，也要考慮資料覆蓋的問題（後交的會把先交的資料蓋掉）。

也可以把 todo list 內容存在 local storage，不過這樣就不能跨裝置、或跟別人共用。

### loop through an array in PHP

```php
$programmingLanguagesArray = ["PHP", "C++", "C#", "Python", "Java"];

$arrObject = new ArrayObject($programmingLanguagesArray);
$arrayIterator = $arrObject->getIterator();

while( $arrayIterator->valid() )
{
    echo $arrayIterator->current() . "<br />";
    $arrayIterator->next();
}
```

[5 Ways To Loop Through An Array In PHP](https://www.codewall.co.uk/5-ways-to-loop-through-array-php/)

### parsing URL

```javascript
// 假設 "?q=1234&txt=abc"
let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.has('q')); // true
console.log(urlParams.get('txt')); // "abc"
```
[JavaScript 取得 Url 的 Query String](https://shunnien.github.io/2017/07/03/Get-Query-String-Parameters-with-JavaScript/)  
[[JS] 使用 JavaScript 解析網址與處理網址中的參數（URL Parameters）](https://pjchender.blogspot.com/2018/08/js-javascript-url-parameters.html)

### access HTTP PUT data in PHP

```php
$data = file_get_contents('php://input');
```

[Stack Overflow](https://stackoverflow.com/questions/27941207/http-protocols-put-and-delete-and-their-usage-in-php)