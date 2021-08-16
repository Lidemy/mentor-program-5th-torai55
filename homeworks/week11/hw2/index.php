<?php
  session_start();
  require_once('utils.php');

  // 檢查是否有登入
  require_once('authentication.php');

  // 取得頁數資訊
  $sql = 'SELECT COUNT(id) AS count FROM torai_blog_posts WHERE is_deleted = 0';
  $limit = 5;
  list(
    'page' => $page,
    'total_page' => $total_page,
    'offset' => $offset,
    'count' => $count
  ) = getPageInfo($sql, $limit);

  if ($page < 1 || $total_page < $page) {
    header('Location: index.php');
    die('Out of range. Redirect to page 1.');
  }

  // 取得文章資料
  $sql = 'SELECT a.id, a.title, LEFT(a.content, 300) AS content, 
                a.created_at, b.username, 
                GROUP_CONCAT(c.tag_name SEPARATOR " ") AS tag_name
          FROM torai_blog_posts AS a
          LEFT JOIN torai_blog_members AS b
          ON a.author_id = b.id
          LEFT JOIN (SELECT d.post_id, e.tag_name
                    FROM torai_blog_category_post AS d
                    LEFT JOIN torai_blog_categories AS e
                    ON d.tag_id = e.id
                    ) AS c
          ON a.id = c.post_id
          WHERE a.is_deleted = 0
          GROUP BY a.id
          ORDER BY created_at DESC
          LIMIT ? OFFSET ?;';

  $post_result = queryWithPreparedStatement($sql, 'ii', $limit, $offset);
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
  <title>Blog 首頁</title>
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
        <li class="signup"><a href="signup.php">註冊</a></li>
      <?php } else { ?>
        <li>你好，<?php echo htmlspecialchars($username) ?></li>
        <li><a href="backend.php">管理後臺</a></li>
        <li><a href="handle_logout.php">登出</a></li>
      <?php } ?>
    </ul>
  </nav>

  <section class="banner">
    <h3 class="banner__title">存放技術之地</h3>
    <p class="banner__desc">Welcome to my blog</p>
  </section>

  <main>
    <div class="articles">
      <?php while($row = $post_result->fetch_assoc()) { ?>
        <article>
          <div class="article__top">
            <h3 class="article__title"><?= htmlspecialchars($row['title']) ?></h3>
            <?php if($username) { ?>
              <div class="links">
                <a href="edit.php?id=<?= htmlspecialchars($row['id']) ?>">編輯</a>
                <a href="handle_delete.php?id=<?= htmlspecialchars($row['id']) ?>">刪除</a>
              </div>
            <?php } ?>
          </div>

          <div class="article__bottom">
            <div class="article__info">
              <span class="material-icons-outlined">access_time</span>
              <p class="article__timestamp"><?= htmlspecialchars($row['created_at']) ?></p>
              <span class="material-icons-outlined">folder</span>
              <p class="article__folder"><?= htmlspecialchars($row['tag_name']) ?></p>
            </div>

            <div class="article__content">
              <p><?= htmlspecialchars($row['content']) ?></p>
            </div>

            <a href="post.php?id=<?= htmlspecialchars($row['id']) ?>" class="article__more">READ MORE</a>
          </div>
        </article>
      <?php } ?>
      <p>目前頁數： <?= $page ?> / <?= $total_page ?></p>
    </div>

    <div class="pagination">
      <?php if($page > 1) {?>
        <a href="index.php?page=1">首頁</a>
        <a href="index.php?page=<?= $page - 1 ?>">上一頁</a>
      <?php } ?>
      <?php if($page < $total_page) { ?>
        <a href="index.php?page=<?= $page + 1 ?>">下一頁</a>
        <a href="index.php?page=<?= $total_page ?>">最後一頁</a>
      <?php } ?>
    </div>
  </main>

  <footer>
    <p>Copyright © 2020 Who's Blog All Rights Reserved.</p>
  </footer>
</body>

</html>