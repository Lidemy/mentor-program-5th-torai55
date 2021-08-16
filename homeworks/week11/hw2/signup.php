<?php
header('Location: index.php');
die();
?>
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="author" content="Torai Lin" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base target="_self" />
    <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">
    <link href="./css/main.css" rel="stylesheet">
    <title>Sign Up</title>
  </head>
  <body>
    <div class="login__wrapper">
      <section class="login">
        <h2 class="login__title">Sign Up</h2>
        <?php if (!empty($_GET['errCode']) && $_GET['errCode'] === '1') { ?>
          <p class="err-msg">帳號或密碼錯誤</p>
        <?php } if (!empty($_GET['errCode']) && $_GET['errCode'] === '87') { ?>
          <p class="err-msg">使用者名稱重複</p>
        <?php } ?>
        <form action="handle_signup.php" method="POST">
          <label>USERNAME<br />
            <input type="text" name="username">
          </label>
          <label>PASSWORD<br />
            <input type="password" name="password">
          </label>
          <button>SIGN UP</button>
        </form>
      </section>
    </div>
  </body>
</html>
