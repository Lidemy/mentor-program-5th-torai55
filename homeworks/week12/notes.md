# hw1

架構圖放在 draw_io 底下。

## pagination

### cursor based

### offset/limit based

offset = (page - 1) * limit

### 要怎麼知道後面還有資料?

假設總共有十一筆資料，每次需要用到五筆資料。

那麼只要每次從資料庫撈六筆資料，如果沒滿六筆就知道後面沒資料了。

mark 為從資料庫撈的，粗體為實際用到的資料。

step1. <mark>**1 2 3 4 5** 6</mark> 7 8 9 10 11

step2. 1 2 3 4 5 <mark>**6 7 8 9 10** 11</mark>

step1. 1 2 3 4 5 6 7 8 9 10 <mark>**11**</mark>

假設總共有十筆資料，那麼第二次 fetch 的時候未滿六筆，就知道後面沒資料了。

# hw2

待補
