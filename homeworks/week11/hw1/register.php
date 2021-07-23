<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="author" content="Torai Lin" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>留言板練習</title>
  </head>
  <body>
    <header><p>注意!本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號密碼</p></header>
    <main>
      <div class="top">
        <h2 class="title">Register</h2>
        <?php if (!empty($_GET['errCode'])) {
                if ($_GET['errCode'] === '1') {
                  echo '<p class="error-msg">資料不齊全或錯誤</p>';
                } else if ($_GET['errCode'] === '2') {
                  echo '<p class="error-msg">帳號或密碼錯誤</p>';
                } else if ($_GET['errCode'] === '3') {
                  echo '<p class="error-msg">權限不足</p>';
                } else if ($_GET['errCode'] === '4') {
                  echo '<p class="error-msg">使用者名稱已被註冊</p>';
                }
        } ?>

        <div class="buttons">
          <a href="index.php">首頁</a>
          <a href="login.php">登入</a>
        </div>
      </div>

      <form action="handle_register.php" method="POST" class="comment-form">
        <div>有什麼想說的嗎？</div>
        <div>帳號：<input type="text" name="username"></div>
        <div>密碼：<input type="password" name="password"></div>
        <div>暱稱：<input type="text" name="nickname" placeholder="可不填"></div>
        <button type="submit">送出</button>
      </form>
    </main>
  </body>
</html>