## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

### 雜湊

* 不同長度輸入，會得到固定長度輸出（由使用的雜湊演算法決定）。
* 差一個字就會得到完全不同的結果。
* 不可逆，無法由雜湊後的值演算出原本資料。
* 可用來驗證。比對雜湊後的值，若一樣則推論輸入的值相同。有極低機率發生碰撞（輸入不同，雜湊後卻得到同樣的值）。

### 加密

* 對稱式加密：如 AES。加密與解密使用同一把密鑰。
* 非對稱式加密：如 RSA。密鑰分成兩把，公鑰加密的內容要使用私鑰解開；私鑰加密的內容則需要公鑰解開。
* 只要有對應的密鑰就能得出原文。

### 為什麼密碼要雜湊過後才存入資料庫

如果資料庫內容外洩，外人會直接得到使用者的密碼。若拿這組帳號密碼去各大網站嘗試登入，成功就能盜取使用者在其它網站的帳號。經過雜湊後，無法直接由資料庫的資料得到使用者密碼的原文。密碼太簡單的話，可能直接查彩虹表就能破解。不過現在網站存的時候通常都會加鹽（隨機產生的字串），使破解的成本提高。

因為 PHP `password_verify($password, $hash)` 在驗證的時候不用附上當初加的鹽，有點好奇是怎麼做的就稍微查了一下 [stack overflow](https://stackoverflow.com/questions/34756064/understanding-password-verify/34756237)。

原來是把雜湊的演算法跟鹽都附在雜湊後的結果。所以驗證函式拿到演算法跟鹽之後，只要對 `$password` 用相同的演算法和鹽再雜湊一次，然後去跟 `$hash` 對照就好了。

不過這樣駭客拿到 `$hash` 後不就知道鹽是什麼，那一樣加回來不就好了？想想平常存鹽跟雜湊後的值應該要分開，驗證的時候再去拿安全性比較高，不過用起來太麻煩了。在 [stack overflow2](https://stackoverflow.com/questions/16875158/how-can-password-verify-validate-passwords-without-knowing-salt-and-cost) 看到一個說法，是說加鹽只是為了提高駭客攻擊成本。每個人密碼都加不同的鹽，這樣駭客一次就只能破解一個人的密碼。

## `include`、`require`、`include_once`、`require_once` 的差別

### `include`

將檔案引入主程式，如果找不到檔案只會丟出警告，不會停止執行程式。此敘述執行幾次就引入幾次檔案。

### `require`

另一種引入檔案的方法，找不到檔案會丟出錯誤，停止執行程式。此敘述執行幾次就引入幾次檔案。

### `include_once`、`require_once`

以上兩者的 once 版本，如果檔案已經被引入過了，就不會再重複引入。

[Tutorialspoint](https://www.tutorialspoint.com/explain-include-require-include-once-and-require-once-functions-in-php)

## 請說明 SQL Injection 的攻擊原理以及防範方法

若程式直接將使用者的輸入跟 SQL query statement 做拼接，就能利用特定的字串去修改 query statement。

```PHP
"SELECT * FROM customers WHERE name ='" . $username . "' AND password = '" . $password . "';"
```

使用者只要在 `$username` 輸入：

```SQL
' OR 1=1 --
```

拼起來後長這樣：

```SQL
"SELECT * FROM customers WHERE name ='' OR 1=1 --' AND password = '';"
```

就能拿到 customers 的所有資料。

### SQL injection 防範方法

使用 prepared statement，讓資料庫先解析語句結構。解析完後把資料放到對應的位置執行，就不會被資料內容影響語句解析。

```PHP
// php
$conn = mysqli($server_name, $db_username, $db_password, $db_name);
$sql = 'SELECT * FROM customers WHERE name = ? AND password = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $password);
$stmt->execute();
// get data
$result = $stmt->get_result();
$row = $result->fetch_assoc();
```

也可使用 regular expression 過濾特殊字元。

## 請說明 XSS 的攻擊原理以及防範方法

如果使用者輸入的內容沒經過跳脫，直接輸出在 HTML 頁面中，駭客就能利用 html 標籤（如 `<script>` `<img>` 等）做攻擊。

```html
<!-- html -->
<div class="output-msg"></div>
<input type="text" placeholder="left your msg" class="input-msg">
<button class="btn">送出</button>
<script>
  document.querySelector('.btn').addEventListener('click', () => {
    document.querySelector('.output-msg').innerHTML = document.querySelector('.input-msg').value
  })
</script>
```

使用者只要輸入 `<img src=x onerror="alert('xss')"/></p>` 就可以在在頁面上執行想做的事。

自己嘗試時使用了 `<script>alert('xss')</script>`，並設定 `<meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-inline';">` 還是不會在頁面上執行，猜是瀏覽器自己擋掉的。

### XSS 防範方法

* 將使用者輸入的內容做跳脫（encodeURI()）
* 把 `innerHTML` 改成 `innerText`。
* 設定 http 的 [Content Security Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) 標頭
* 也可以在 HTML head 之中用 `<meta>` tag 設定 CSP。

## 請說明 CSRF 的攻擊原理以及防範方法

駭客利用發送 request 時瀏覽器會自動帶上對應網站 cookie 的特性，偷偷在使用者不知情下對受害網站發送惡意 request（利用 `<img src="">`、`<form>` 等等）。若恰好使用者在受害網站的登入驗證用 cookie 還留著，就能以使用者的權限獲取、操作資料。

[讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)

老師寫得很棒，看看老師的文。  

### CSRF 防範方法

總之要想辦法確認這個 request 是使用者本人發的。

#### 檢查 referer request header

設白名單，擋掉來自名單外 domain 的 request。

* 瀏覽器可能不會帶 `referer`
* 帶 `referer` 的功能可能被使用者關閉
* 判斷 `referer` domain 的程式碼要寫好

#### 圖形驗證碼、簡訊驗證碼

流程上我猜是伺服器先收到帶 cookie 的 request （確定使用者有登入）但暫緩執行如刪除、轉帳等動作。等到收到使用者發來的驗證碼答案，確認無誤後再把動作完成。

* 使用者本人才知道答案
* 對使用者會覺得很累很麻煩

#### CSRF token

伺服器隨機產生 CSRF token 存在 session 中，同時也放在 response 給的表單中，隨著表單提交。不同的 session 都要做更換。駭客就不能自己寫一個表單騙使用者提交了，因為他不知道 token 是多少。

如果伺服器支持 cross-origin 的 request，駭客就能先發一個 requset 取得 token，再放進自己寫的表單內。

#### Double Submit Cookie

把 CSRF token 儲存的部分改成存在 client side 的 cookie。

伺服器產生 token，用 `set-cookie` 存在瀏覽器內，同時也放進表單內。駭客不能讀寫不同 origin 的 cookie，所以無法一樣取得正確的 token。

若駭客有你底下的 subdomain，那就可以讀寫 cookie 來攻擊了。

#### client side 的 Double Submit Cookie

token 從由伺服器端產生，改成由 client 端產生。

只要確保 token 不要被猜出來就好，client 端產生後放在 cookie，一樣不能跨 domain 讀寫 cookie。

#### browser 本身： samesite cookie

利用 `set-cookie` 的 `SameSite` 屬性，指定個別 cookie 在不同環境下的發送條件。這樣駭客就不能在 Third-Party 的情況下偷偷發送 request 並帶上驗證用 cookie。

##### SameSite

* Strict
  
  只在 First-party 環境下帶上 cookie。

* Lax
  
  Third-Party（cross-site）環境下，以下行為能帶上 cookie：
  1. 在網址列輸入輸入網址
  2. 點擊連結 `<a href="...">`
  3. 送出表單 `<form method="GET">`
  4. 背景轉譯 `<link rel="prerender" href="...">`

* None

  其他情況想要送出 Third-party cookie 就必須設定為 `SameSite=None; Secure`

## Origin vs Referer vs samesite

偷偷筆記一下。

### Origin

origin 是目前網站的 `<schema>://<host>:<port>` 組合而成的字串，譬如說在 Github 上那 origin 就是 `https://github.com`，在自己架的 localhost 就是 `http://localhost:8080`

### Referer

referer 是 當你發出請求時網頁在哪個網址 ，譬如說在 Github 發出登入請求時一定是在登入頁面，那 referer 就是 `https://github.com/login`

[Day16-轉發 HTTP Header I](https://ithelp.ithome.com.tw/articles/10206867)

### Site

Same-Site 的判定牽涉到 Effetive top-level domains（eTLDs），所有的 eTLDs 被定義在 [Public Suffix List](https://publicsuffix.org/list/public_suffix_list.dat) 中，而 Site 是由 eTLD 加上一個前綴組成。

[[Day 26] Cookies - SameSite Attribute](https://ithelp.ithome.com.tw/articles/10251288)
