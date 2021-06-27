<?php
  session_start();
  require_once("utils.php");

  // 檢查是否有登入
  $username = false;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  // 設定 tag
  $tag = false;
  if (!empty($_GET['tag'])) {
    $tag = $_GET['tag'];
  }

  // 取得文章總數 $count
  if(!$tag) {
    $sql = 'SELECT COUNT(id) AS count FROM torai_blog_posts WHERE is_deleted = 0';
    $result = querySQL($sql);
  } else {
    $sql = 'SELECT COUNT(a.id) AS count
    FROM torai_blog_posts AS a
    LEFT JOIN (SELECT d.post_id, GROUP_CONCAT(e.tag_name SEPARATOR " ") AS tag_name
          FROM torai_blog_category_post AS d
          LEFT JOIN torai_blog_categories AS e
          ON d.tag_id = e.id
          GROUP BY d.post_id
          ) AS c
    ON a.id = c.post_id
    WHERE a.is_deleted = 0 
    AND c.tag_name REGEXP CONCAT("^", ?, "[^a-zA-Z]|^", ?, "$| ", ?, " |[^a-zA-Z]", ?, "$");';
    $result = queryWithPreparedStatement($sql, 'ssss', $tag, $tag, $tag, $tag);
  }
  $count = $result->fetch_assoc()['count'];

  // 目前頁數
  $curr_page = 1;
  if (!empty($_GET['page'])) {
    $curr_page = intval($_GET['page']);
  }
  $limit = 5;
  $total_page = ceil($count / $limit);
  $offset = ($curr_page - 1) * $limit;

  // 取得標籤們 $tag_result
  $sql = 'SELECT DISTINCT tag_name FROM torai_blog_category_post AS a
          LEFT JOIN torai_blog_categories AS b
          ON a.tag_id = b.id;';

  $tag_result = querySQL($sql);

  // 篩選單一 tag，取得文章資料 $post_result
  if($tag) {
    $sql = 'SELECT a.id, a.title, LEFT(a.content, 300) AS content, 
          a.created_at, b.username, 
          c.tag_name
          FROM torai_blog_posts AS a
          LEFT JOIN torai_blog_members AS b
          ON a.author_id = b.id
          LEFT JOIN (SELECT d.post_id, GROUP_CONCAT(e.tag_name SEPARATOR " ") AS tag_name
                FROM torai_blog_category_post AS d
                LEFT JOIN torai_blog_categories AS e
                ON d.tag_id = e.id
                GROUP BY d.post_id
                ) AS c
          ON a.id = c.post_id
          WHERE a.is_deleted = 0 
          AND c.tag_name REGEXP CONCAT("^", ?, "[^a-zA-Z]|^", ?, "$| ", ?, " |[^a-zA-Z]", ?, "$")
          ORDER BY tag_name DESC
          LIMIT ? OFFSET ?;';

    $post_result = queryWithPreparedStatement($sql, 'ssssii', $tag, $tag, $tag, $tag, $limit, $offset);
  } else {
    $sql = 'SELECT a.id, a.title, LEFT(a.content, 300) AS content, 
          a.created_at, b.username, 
          c.tag_name
          FROM torai_blog_posts AS a
          LEFT JOIN torai_blog_members AS b
          ON a.author_id = b.id
          LEFT JOIN (SELECT d.post_id, GROUP_CONCAT(e.tag_name SEPARATOR " ") AS tag_name
                FROM torai_blog_category_post AS d
                LEFT JOIN torai_blog_categories AS e
                ON d.tag_id = e.id
                GROUP BY d.post_id
                ) AS c
          ON a.id = c.post_id
          WHERE a.is_deleted = 0 
          ORDER BY tag_name DESC
          LIMIT ? OFFSET ?;';

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
  <title>分類專區</title>
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
        <li><a href="signup.php">註冊</a></li>
      <?php } else { ?>
        <li>你好，<?php echo htmlspecialchars($username) ?></li>
      <?php } ?>
      <li><a href="backend.php">管理後臺</a></li>
      <li><a href="handle_logout.php">登出</a></li>
    </ul>
  </nav>

  <section class="banner">
    <h3 class="banner__title">存放技術之地 - 分類專區</h3>
    <p class="banner__desc">Welcome to my blog</p>
  </section>

  <main>
    <div class="articles">
      <div class="tags">
        <p>tags:</p>
        <?php while($row = $tag_result->fetch_assoc()){?>
          <a href="tags.php?tag=<?= htmlspecialchars($row['tag_name']) ?>"><?= htmlspecialchars($row['tag_name']) ?></a>
        <?php } ?>
      </div>
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
      <p>目前頁數： <?= $curr_page ?> / <?= $total_page ?></p>
    </div>

    <div class="pagination">
      <?php if($curr_page > 1) {?>
        <a href="tags.php?page=1&tag=<?= htmlspecialchars($tag) ?>">首頁</a>
        <a href="tags.php?page=<?= $curr_page - 1 ?>&tag=<?= htmlspecialchars($tag) ?>">上一頁</a>
      <?php } ?>
      <?php if($curr_page < $total_page) { ?>
        <a href="tags.php?page=<?= $curr_page + 1 ?>&tag=<?= htmlspecialchars($tag) ?>">下一頁</a>
        <a href="tags.php?page=<?= $total_page ?>&tag=<?= htmlspecialchars($tag) ?>">最後一頁</a>
      <?php } ?>
    </div>
  </main>

  <footer>
    <p>Copyright © 2020 Who's Blog All Rights Reserved.</p>
  </footer>
</body>

</html>