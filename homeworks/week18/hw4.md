## 什麼是反向代理（Reverse proxy）？

把後端的伺服器們都藏在反向代理的伺服器之下。客戶端來的連線會送到反向代理伺服器，再由反向代理伺服器向後端伺服器請求資源，並回傳給客戶端。

能加強後端伺服器安全性（如改寫後端伺服器回傳的錯誤訊息，再丟給客戶端）、快取、負載平衡。

## 什麼是 ORM？

Object Relational Mapping，物件關聯對應。把資料庫的表格與一筆筆資料都變成物件，在 JavaScript 等程式語言中就能以物件導向的方式來操作資料庫。優點是多數 ORM 軟體都內建防禦 SQL injection、不同資料庫在 ORM 中的語法是相同的。缺點是從程式語言轉換成 SQL 語言會犧牲一些效能、複雜的查詢可能辦不到。

## 什麼是 N+1 problem？

如果一個人擁有很多本書，user 對 book 是一對多的關係。

要找每個使用者分別擁有哪些書：

```JavaScript
const users = User.findAll()
const user_books = {}
for (user of users) {
  user_books[user.id] = Book.findAll({
    where: {
      user_id: user.id
    }
  })
}
```

如果有 N 個使用者：找所有使用者（1）、每個使用者找一次書（N），共產生 N + 1 次 query。

要把所有書附上使用者資料：

```JavaScript
const books = Book.findAll()
const book_user = {}
for (book of books) {
  books_user[book.id] = User.findOne({
    where: {
      id: book.user_id
    }
  })
}
```

如果有 N 本書：找所有書（1）、每本書找一次使用者（N），共產生 N + 1 次 query。

底下兩個連結分別在說這兩種情況，所產生的 N + 1 problem。

[sequelize](https://sequelize.org/master/manual/assocs.html#fetching-associations---eager-loading-vs-lazy-loading) 有實作 eager loading 把可能用到的資料先載回來暫存，以解決 N + 1 problem。與之相對就是預設的 lazy loading，要用到資料的當下才去 query，而造成重複做類似的查詢。

[SOLVING THE N+1 PROBLEM IN ORMS](https://thecodingmachine.io/solving-n-plus-1-problem-in-orms)

[What is the “N+1 selects problem” in ORM](https://stackoverflow.com/questions/97197/what-is-the-n1-selects-problem-in-orm-object-relational-mapping)
