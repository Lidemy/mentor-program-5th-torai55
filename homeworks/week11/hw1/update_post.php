<?php
  require_once('conn.php');
  session_start();

  // check if login
  $username = false;
  $nickname = false;
  if (!empty($_SESSION['username'])) {
    $sql = 'SELECT username, nickname
            FROM torai_board_users
            WHERE username = ?;';

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $_SESSION['username']);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $username = $_SESSION['username'];
    $nickname = $row['nickname'];
    $stmt->close();
  }

  $sql = 'SELECT comment FROM torai_board_comments WHERE id = ?;';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $_GET['id']);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $comment = $row['comment'];
  $stmt->close();
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
                  echo '<p class="error-msg">資料不齊全</p>';
                } else if ($_GET['errCode'] === '2') {
                  echo '<p class="error-msg">帳號或密碼錯誤</p>';
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
        <form action="handle_update_post.php?id=<?= $_GET['id'] ?>" method="POST" class="comment-form">
          <div><?php echo ($nickname ? htmlspecialchars($nickname) : htmlspecialchars($username)) ?> 有什麼想說的嗎？</div>
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
