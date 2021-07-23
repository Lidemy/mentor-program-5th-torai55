<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  // check input
  if(empty($_GET['id'])) {
    header('Location: index.php?errCode=1');
    die('請輸入文章 id');
  }
  $id = htmlspecialchars($_GET['id']);

  // check if login
  $username = !empty($_SESSION['username']) ? $_SESSION['username'] : false;
  $nickname = getUserInfo($username)['nickname'];

  if (!$username) {
    header('Location: index.php?errCode=3');
    die('權限不足');
  }

  $sql = 'SELECT comment FROM torai_board_comments WHERE id = ?;';
  $row = preparedStatement($sql, 's', $id)['result']->fetch_assoc();
  $comment = $row ? htmlspecialchars($row['comment']) : null;
?>

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
        <h2 class="title">編輯留言</h2>

        <div class="buttons">
          <?php if (!$username) {?>
            <a href="index.php">首頁</a>
            <a href="register.php">註冊</a>
            <a href="login.php">登入</a>
          <?php } else {?>
            <div class="buttons--login">
              <div>
              <a href="index.php">首頁</a>
                <button class="edit-nickname">編輯暱稱</button>
                <a href="handle_logout.php">登出</a><br />
              </div>
              <?php if (!empty($_GET['errCode'])) {
                if ($_GET['errCode'] === '1') {
                  echo '<p class="error-msg">資料不齊全或有錯</p>';
                } else if ($_GET['errCode'] === '2') {
                  echo '<p class="error-msg">帳號或密碼錯誤</p>';
                } else if ($_GET['errCode'] === '3') {
                  echo '<p class="error-msg">權限不足</p>';
                } else if ($_GET['errCode'] === '4') {
                  echo '<p class="error-msg">使用者名稱已被註冊</p>';
                }
              } ?>
              <form method="GET" action="edit_nickname.php"  class="nickname-form hide">
                暱稱：<input type="text" name="nickname" value="<?php echo htmlspecialchars($nickname ? $nickname: ''); ?>">
                <button>送出</button>
              </form>
            </div>
          <?php } ?>
        </div>
      </div>

      <?php if ($username) {?>
        <form action="handle_update_post.php?id=<?= $id ?>" method="POST" class="comment-form">
          <div><?php echo ((isset($nickname) && strlen($nickname) > 0) ? htmlspecialchars($nickname) : htmlspecialchars($username)) ?> 有什麼想說的嗎？</div>
          <textarea name="comment" placeholder="請輸入你的留言..."><?= $comment ?></textarea><br />
          <input type="text" name="username" value="<?php echo htmlspecialchars($username) ?>" style="display:none">
          <button type="submit">送出</button>
        </form>

        <div class="divider"></div>
      <?php } ?>

    </main>
    <script>
      document.querySelector('.edit-nickname').addEventListener('click', (e) => {
        document.querySelector('.nickname-form').classList.toggle('hide')
      })
    </script>
  </body>
</html>
