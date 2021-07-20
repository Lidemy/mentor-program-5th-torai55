## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

Domain name system。把域名對應到 IP 的服務。有這個服務後，client 端才能在瀏覽器輸入網址，以訪問位於遠方的伺服器。否則就要打一串人類不好記的 IP 位置才能連線。

Google 可以直接在自己管理的 DNS 伺服器底下，設定好自己各個網域所對應的 IP。這樣連線到 google 服務的使用者就不用從 root 開始慢慢往下詢問其他 DNS 伺服器。

使用者上網變成會經過 google DNS 伺服器，google 就能得到連線的統計資料。

## 什麼是資料庫的 lock？為什麼我們需要 lock？

為了維護資料庫 ACID 之中的 isolation，在連續操作資料時可以把某個 row，或是某張 table 暫時鎖起來，不讓其他執行緒操作。就不會發生兩個人同時購買最後一項商品，而產生的 race condition。

## NoSQL 跟 SQL 的差別在哪裡？

1. NoSQL 結構不固定，不需要設定 schema；而 SQL 要。
2. NoSQL 使用 key-value 的方式存資料，類似 JSON；而 SQL 是用 table，透過 key 彼此互相關聯的方式存。
3. NoSQL 沒有一定的結構，所以也不能用 JOIN；SQL 可以。

## 資料庫的 ACID 是什麼？

1. 原子性 atomicity：要馬全部失敗，要馬全部成功。
2. 一致性 consistency：維持資料的一致性（A 轉帳 20 塊給 B，要保證 A 少 20 塊的同時 B 多 20 塊。）。
3. 隔離性 isolation：多筆資料之前不會互相影響（不能同時改寫同一個值）。
4. 持久性 durability：交易成功之後，寫入的資料不會不見。
