## 請以自己的話解釋 API 是什麼

英文全稱 Application Programming Interface，重點是最後一個字， Interface。API 作為應用程式交換資料的介面，就像是要把隨身碟的檔案傳入電腦，要先通過 USB 這個介面作為溝通的媒介。

生活化一點拿國高中班上的小老師當例子。可以當成老師開放班上一個同學作為小老師（API），如果大家對於考試分數有問題，都可以告訴小老師自己的座號和考試日期（path、query string），以詢問該次考試的分數。小老師會記著同學的座號跟考試日期，去查老師給的表單，找到同學的分數以後再告訴同學。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

* 429 Too Many Requests：在短時間內傳送太多次 request 給伺服器，伺服器回傳的 response 的 header 裡會包含一個 `Retry-After` 屬性，告訴你要等多久之後才能再傳送 request。

``` text
HTTP/1.1 429 Too Many Requests
Content-Type: text/html
Retry-After: 3600
```

* 431 Request Header Fields Too Large：伺服器因為收到的 HTTP headers 太大而拒絕 request，可以將 header 簡短一些再發請求。

* 401 Unauthorized：需要獲取授權才能存取，伺服器回傳的 response 的 headers 有 `WWW-Authenticate` 包含如何獲得授權的資訊。

``` text
HTTP/1.1 401 Unauthorized
Date: Wed, 21 Oct 2015 07:28:00 GMT
WWW-Authenticate: Basic realm="Access to staging site"
```

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

**餐廳API**

|description      | Method |   Path   |parameter| Example    |
|:--------------|:------:|:---------|---------|------------|
|回傳所有餐廳資料|GET     |/restaurants|_limit:限制資料回傳數量| /restaurants?_limit=10|
|回傳單一餐廳資料|GET     |/restaurants/:id|無|/restaurants/15|
|新增餐廳       |POST     |/restaurants|name: 餐廳名|/restaurants|
|刪除餐廳       |DELETE   |/restaurants/:id|無|/restaurants/15|
|更改餐廳       |PATCH    |/restaurants/:id|name: 餐廳名|/restaurants/15|