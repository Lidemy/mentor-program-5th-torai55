<?php
  require_once('conn.php');
  session_start();

  // check if login
  $username = false;
  $nickname = false;
  if (!empty($_SESSION['username'])) {
    $sql_query = sprintf(
      'SELECT username, nickname
      FROM torai_board_users
      WHERE username = "%s";'
      ,$_SESSION['username']
    );

    $result = $conn->query($sql_query);
    if (!$result) {
      die($conn->error);
    }
    $row = $result->fetch_assoc();
    $username = $_SESSION['username'];
    $nickname = $row['nickname'];
  }

  // get commenet info
  $sql_query = 'SELECT a.content, a.created_at, b.username, b.nickname 
                FROM torai_board_comments AS a
                LEFT JOIN torai_board_users AS b
                ON a.user_id = b.id
                ORDER BY a.created_at DESC';

  $comment_result = $conn->query($sql_query);
  if (!$comment_result) {
    die($conn->error);
  }
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
        <h2 class="title">Comments</h2>

        <div class="buttons">
          <?php if (!$username) {?>
            <a href="register.php">註冊</a>
            <a href="login.php">登入</a>
          <?php } else {?>
            <a href="handle_logout.php">登出</a>
          <?php } ?>
        </div>
      </div>

      <?php if ($username) {?>
        <form action="handle_add_post.php" method="POST" class="comment-form">
          <div><?php echo ($nickname ? $nickname : $username) ?> 有什麼想說的嗎？</div>
          <textarea name="comment" placeholder="請輸入你的留言..."></textarea><br />
          <input type="text" name="username" value="<?php echo $username?>" style="display:none">
          <button type="submit">送出</button>
        </form>

        <div class="divider"></div>
      <?php } ?>

      <div class="cards">
        <?php while($row = $comment_result->fetch_assoc()) {?>
          <div class="card">
            <div class="card__avatar"></div>

            <div class="card__body">
              <div class="card__info">
                <div class="card__author"><?php echo ($row['nickname'] ? $row['nickname'] : $row['username']) ?></div>
                <div class="card__timestamp"><?php echo $row['created_at']?></div>
              </div>

              <div class="card__content"><?php echo $row['content']?></div>
            </div>
          </div>
        <?php } ?>
      </div>
    </main>
  </body>
</html>
