<?php
  require_once("utils.php");
  session_start();

  // 檢查是否有登入
  $username = false;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  // 取得文章總數
  $sql = 'SELECT COUNT(id) AS count FROM torai_blog_posts WHERE is_deleted = 0';
  $result = querySQL($sql);
  $count = $result->fetch_assoc()['count'];

  // 目前頁數
  $curr_page = 1;
  if (!empty($_GET['page'])) {
    $curr_page = $_GET['page'];
  }
  $limit = 5;
  $total_page = ceil($count / $limit);
  $offset = ($curr_page - 1) * $limit;

  // 取得文章資料
  if ($username) {
    $sql = 'SELECT id, title, created_at 
            FROM torai_blog_posts
            WHERE is_deleted = 0
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?';

    $post_result = queryWithPreparedStatement($sql, 'ii', $limit, $offset);
  }

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
  <title>後臺</title>
</head>

<body>
  <nav>
    <div class="nav__left">
      <h2 class="nav__title"><a href="index.php">Who's Blog</a></h2>
      <ul class="nav__links">
        <li><a href="index.php">文章列表</a></li>
        <li><a href="tags.php">分類專區</a></li>
        <li><a href="#">關於我</a></li>
      </ul>
    </div>

    <ul class="nav__management">
      <?php if(!$username) { ?>
        <li><a href="login.php">登入</a></li>
      <?php } else { ?>
        <li>你好，<?php echo htmlspecialchars($username) ?></li>
        <li><a href="add_post.php">新增文章</a></li>
      <?php } ?>
      <li><a href="index.php">主頁</a></li>
      <li><a href="handle_logout.php">登出</a></li>
    </ul>
  </nav>

  <section class="banner">
    <h3 class="banner__title">存放技術之地 - 後台</h3>
    <p class="banner__desc">Welcome to my blog</p>
  </section>

  <main>
    <div class="cards">
      <?php if(!empty($_GET['msg']) && $_GET['msg'] === '1') { ?>
        <p>操作成功</p>
      <?php } ?>
      <?php if(!$username) { ?>
        <p class="err-msg">權限不足</p>
      <?php } else { ?>
        <?php while($row = $post_result->fetch_assoc()) { ?>
          <div class="card">
            <div class="card__title"><?= htmlspecialchars($row['title']) ?></div>
            <div class="card__info">
              <p class="timestamp"><?= htmlspecialchars($row['created_at']) ?></p>
              <a href="edit.php?id=<?= htmlspecialchars($row['id']) ?>" class="edit">編輯</a>
              <a href="handle_delete.php?id=<?= htmlspecialchars($row['id']) ?>" class="delete">刪除</a>
            </div>
          </div>
          <hr>
        <?php } ?>

        
        <p>目前頁數： <?= $curr_page ?> / <?= $total_page ?></p>
        <div class="pagination">
          <?php if($curr_page > 1) {?>
            <a href="backend.php?page=1">首頁</a>
            <a href="backend.php?page=<?= $curr_page - 1 ?>">上一頁</a>
          <?php } ?>
          <?php if($curr_page < $total_page) { ?>
            <a href="backend.php?page=<?= $curr_page + 1 ?>">下一頁</a>
            <a href="backend.php?page=<?= $total_page ?>">最後一頁</a>
          <?php } ?>
        </div>
      <?php } ?>
    </div>
  </main>

  <footer>
    <p>Copyright © 2020 Who's Blog All Rights Reserved.</p>
  </footer>
</body>

</html>