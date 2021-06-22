<?php
  require_once('conn.php');
  session_start();

  // check if login
  $username = false;
  $nickname = false;
  $role = 4;
  if (!empty($_SESSION['username'])) {
    $sql = 'SELECT username, nickname, role+0 AS role
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
    $role = $row['role'];
    $stmt->close();
  }

  // get page
  $sql = 'SELECT count(id) as count FROM torai_board_users;';
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $count = $row['count'];

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $limit = 5;
  $offset = ($page-1) * $limit;
  $total_page = ceil($count / $limit);

  // get users info
  $sql = 'SELECT * FROM torai_board_users
                ORDER BY created_at DESC
                LIMIT ? OFFSET ?;';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $limit, $offset);
  $user_result = $stmt->execute();
  if (!$user_result) {
    die($conn->error);
  }
  $user_result = $stmt->get_result();
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
        <h2 class="title">後台</h2>

        <div class="buttons">
          <?php if (!$username || intval($role) !== 1) {?>
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
                } else if ($_GET['errCode'] === '3') {
                  echo '<p class="error-msg">權限不足</p>';
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

      <?php if(intval($role) === 1) { ?>
        <br />
        <div>管理員：<?php echo ($nickname ? htmlspecialchars($nickname) : htmlspecialchars($username)) ?></div>
        <br /><p>1:admin, 2:normal, 3:suspended</p>
        <div class="divider"></div>

        <div class="cards">
          <?php while($row = $user_result->fetch_assoc()) {?>
            <div class="card">
              <div class="card__avatar"></div>

              <div class="card__body">
                <div class="card__info">
                  <div class="card__author">username: <?php echo htmlspecialchars($row['username']) ?></div>
                  <div class="card__timestamp">nickname: <?php echo htmlspecialchars($row['nickname']) ?></div>
                  <button class="edit-authority">編輯權限</button>
                </div>

                <div class="card__bottom">
                  <div class="card__content">role: <?php echo htmlspecialchars($row['role']) ?></div>
                  <form action="handle_authority.php" method="POST" class="authority-form hide">
                    <input type="hidden" name="username" value="<?= htmlspecialchars($row['username']) ?>">
                    <div class="authority-editor">
                      role: <input type="text" name="role" value="<?= htmlspecialchars($row['role']) ?>"><button>送出</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          <?php } ?>
        </div>

        <hr>
        <div class="page-info">
          <span>總共有 <?= $count ?> 筆資料，頁數<?= $page ?> / <?= $total_page ?></span>
        </div>
        <div class="paginator">
          <?php if($page != 1) { ?>
            <a href="backend.php?page=1">首頁</a>
            <a href="backend.php?page=<?= $page-1 ?>">上一頁</a>
          <?php } ?>
          <?php if($page != $total_page) { ?>
            <a href="backend.php?page=<?= $page+1 ?>">下一頁</a>
            <a href="backend.php?page=<?= $total_page ?>">最後一頁</a>
          <?php } ?>
        </div>
      <?php } ?>
    </main>
    <script>
      document.querySelector('.cards').addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-authority')) {
          const cardBody = e.target.parentElement.parentElement
          console.log(cardBody)
          cardBody.querySelector('.card__content').classList.toggle('hide')
          cardBody.querySelector('.authority-form').classList.toggle('hide')
        }
      })
    </script>
  </body>
</html>
