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

  if (!$username || intval($role) !== 1) {
    header('Location: index.php?errCode=3');
    die('權限不足');
  }

  // get pagination info
  $sql = 'SELECT count(id) as count FROM torai_board_users;';
  $limit = 5;
  list('page' => $page, 
       'total_page' => $total_page,
       'offset' => $offset,
       'count' => $count
  ) = getPageInfo($sql, $limit);

  // get users info
  $sql = 'SELECT * FROM torai_board_users
                ORDER BY created_at DESC
                LIMIT ? OFFSET ?;';

  $user_result = preparedStatement($sql, 'ii', $limit, $offset)['result'];
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
          <div class="buttons--login">
            <div>
              <a href="index.php">首頁</a>
              <a href="handle_logout.php">登出</a><br />
            </div>
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
          </div>
        </div>
      </div>

      <?php if(intval($role) === 1) { ?>
        <br />
        <div>管理員：<?php echo (isset($nickname) && strlen($nickname) > 0) ? htmlspecialchars($nickname) : htmlspecialchars($username) ?></div>
        <div class="divider"></div>

        <div class="cards">
          <?php while($row = $user_result->fetch_assoc()) {?>
            <div class="card">
              <div class="card__avatar"></div>

              <div class="card__body">
                <div class="card__info">
                  <div class="card__author">username: <?php echo htmlspecialchars($row['username']) ?></div>
                  <div class="card__timestamp"><?php echo (isset($row['nickname']) && strlen($row['nickname']) > 0) ? 'nickname:' . htmlspecialchars($row['nickname']) : false ?></div>
                  <button class="edit-authority">編輯權限</button>
                </div>

                <div class="card__bottom">
                  <div class="card__content">role: <?php echo htmlspecialchars($row['role']) ?></div>
                  <form action="handle_authority.php" method="POST" class="authority-form hide">
                    <input type="hidden" name="username" value="<?= htmlspecialchars($row['username']) ?>">
                    <div class="authority-editor">
                      role: 
                      <select name="role">
                        <option value="1">admin</option>
                        <option value="2">normal</option>
                        <option value="3">suspended</option>
                      </select>
                      <button>送出</button>
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
      document.querySelector('.cards')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-authority')) {
          const cardBody = e.target.parentElement.parentElement
          cardBody.querySelector('.card__content').classList.toggle('hide')
          cardBody.querySelector('.authority-form').classList.toggle('hide')
        }
      })
    </script>
  </body>
</html>
