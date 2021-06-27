# hw2

## SQL insert if not exist

1. 若使用以下兩者，遇到重複的 tag_name 會報錯且 auto_increment 會 +1。導致 auto_increment 會一直往上跳出現 gap。

    ```SQL
    -- 挖尬意 DNF
    -- ㄏ勝
    INSERT INTO torai_blog_categories (tag_name) VALUES ("DNF");
    INSERT IGNORE INTO torai_blog_categories (tag_name) VALUES ("DNF");
    ```

2. 若使用以下方法，高流量下可能會遇到 race condition。第一筆查詢（NOT EXISTS()）完， insert 前如果剛好第二筆資料查詢，就會通過第二筆資料的 NOT EXISTS 檢查，就可能重複 insert 同樣的資料。

    ```SQL
    INSERT INTO torai_blog_categories (tag_name) 
    SELECT * FROM (SELECT "DNF2" AS tag_name) AS tmp
    WHERE NOT EXISTS (
            SELECT "tag_name" 
            FROM torai_blog_categories 
            WHERE tag_name = "DNF2");
    ```

## SQL left function

可以取那個欄位前幾個字元。
`SELECT LEFT('SQL Tutorial', 3)` 會得到 `SQL`

## LAST_INSERT_ID()

取得上一次 insert 資料的 id。
保存在 session 的，不怕被其他使用者覆蓋掉。

## 資料庫比對 WHERE 'aa' = 'AA'

改成使用 `WHERE BINARY 'aa' = 'AA'`。

## GROUP BY && GROUP_CONCAT()

[stack overflow](https://stackoverflow.com/questions/276927/can-i-concatenate-multiple-mysql-rows-into-one-field)

## CDEditor 換行出問題，內容會自動包 `<p></p>`

## 分類不接受 emoji

## Auto Resize Textarea to Fit Content

[stack overflow](https://stackoverflow.com/questions/7477/how-to-autosize-a-textarea-using-prototype)