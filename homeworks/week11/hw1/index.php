<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  // check if login
  $username = empty($_SESSION['username']) ? false : $_SESSION['username'];
  list(
    'nickname' => $nickname,
    'role' => $role
  ) = getUserInfo($username);

  // get pagination info
  $sql = 'SELECT count(id) as count FROM torai_board_comments WHERE is_deleted = 0;';
  $limit = 5;
  list('page' => $page, 
       'total_page' => $total_page,
       'offset' => $offset,
       'count' => $count
  ) = getPageInfo($sql, $limit);

  if ($page < 1 || $total_page < $page) {
    header('Location: index.php');
    die('Out of range. Redirect to page 1.');
  }

  // get comment info
  $sql = 'SELECT a.id, a.comment, a.created_at, b.username, b.nickname 
                FROM torai_board_comments AS a
                LEFT JOIN torai_board_users AS b
                ON a.user_id = b.id
                WHERE a.is_deleted = 0
                ORDER BY a.created_at DESC
                LIMIT ? OFFSET ?;';

  $comment_result = preparedStatement($sql, 'ii', $limit, $offset)['result'];
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

        <div class="buttons">
          <?php if (!$username) {?>
            <a href="register.php">註冊</a>
            <a href="login.php">登入</a>
          <?php } else {?>
            <div class="buttons--login">
              <div>
                <?php if (intval($role) === 1) { ?>
                  <a href="backend.php">後台</a>
                <?php } ?>
                <button class="edit-nickname">編輯暱稱</button>
                <a href="handle_logout.php">登出</a><br />
              </div>

              <form method="GET" action="edit_nickname.php"  class="nickname-form hide">
                暱稱：<input type="text" name="nickname" value="<?php echo htmlspecialchars($nickname ? $nickname: ''); ?>">
                <button>送出</button>
              </form>
            </div>
          <?php } ?>
        </div>
      </div>

      <?php if ($username && intval($role) < 3) {?>
        <form action="handle_add_post.php" method="POST" class="comment-form">
          <div><?php echo ((isset($nickname) && strlen($nickname) > 0) ? htmlspecialchars($nickname) : htmlspecialchars($username)) ?> 有什麼想說的嗎？</div>
          <textarea name="comment" placeholder="請輸入你的留言..."></textarea><br />
          <input type="text" name="username" value="<?php echo htmlspecialchars($username) ?>" style="display:none">
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
                <div class="card__author"><?php echo htmlspecialchars((isset($row['nickname']) && strlen($row['nickname']) > 0) ? $row['nickname'] : $row['username']) ?></div>
                <div class="card__timestamp"><?php echo htmlspecialchars($row['created_at']) ?></div>
                <?php if($row['username'] === $username || intval($role) === 1) { ?>
                  <a href="update_post.php?id=<?= $row['id'] ?>">編輯留言</a>
                  <a href="handle_delete_post.php?id=<?= $row['id'] ?>">刪除留言</a>
                <?php } ?>
              </div>

              <div class="card__content"><?php echo htmlspecialchars($row['comment']) ?></div>
            </div>
          </div>
        <?php } ?>
      </div>

      <hr>
      <div class="page-info">
        <span>總共有 <?= $count ?> 筆留言，頁數<?= $page ?> / <?= $total_page ?></span>
      </div>
      <div class="paginator">
        <?php if($page != 1) { ?>
          <a href="index.php?page=1">首頁</a>
          <a href="index.php?page=<?= $page-1 ?>">上一頁</a>
        <?php } ?>
        <?php if($page != $total_page) { ?>
          <a href="index.php?page=<?= $page+1 ?>">下一頁</a>
          <a href="index.php?page=<?= $total_page ?>">最後一頁</a>
        <?php } ?>
      </div>
    </main>
    <script>
      document.querySelector('.edit-nickname')?.addEventListener('click', (e) => {
        document.querySelector('.nickname-form').classList.toggle('hide')
      })
    </script>
  </body>
</html>
