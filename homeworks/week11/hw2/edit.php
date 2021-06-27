<?php
  require_once('utils.php');
  session_start();

  // 檢查是否有登入
  $username = false;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  if (!$username) {
    header('Location: login.php');
    die('沒有權限');
  }

  // 取得文章資料
  $sql = 'SELECT title, content, b.tag_name 
          FROM torai_blog_posts AS a
          LEFT JOIN ( 
                      SELECT c.post_id, GROUP_CONCAT(d.tag_name SEPARATOR " ") AS tag_name
                      FROM torai_blog_category_post AS c
                      LEFT JOIN torai_blog_categories AS d
                      ON  c.tag_id = d.id
                      WHERE c.post_id = ?
                      GROUP BY c.post_id
                    ) AS b
          ON a.id = b.post_id
          WHERE id = ?;';
  $result = queryWithPreparedStatement($sql, 'ii', $_GET['id'], $_GET['id']);
  $row = $result->fetch_assoc();

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
  <script src="https://cdn.ckeditor.com/ckeditor5/28.0.0/classic/ckeditor.js"></script>
  <title>編輯文章</title>
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
      <?php } ?>
      <li><a href="index.php">主頁</a></li>
      <li><a href="handle_logout.php">登出</a></li>
    </ul>
  </nav>

  <section class="banner">
    <h3 class="banner__title">存放技術之地 - 編輯文章</h3>
    <p class="banner__desc">Welcome to my blog</p>
  </section>

  <main>
    <section class="add-post__wrapper">
      <div class="add-post">
        <?php if(!$username) { ?>
          <p class="err-msg">權限不足</p>
        <?php } else { ?>
          <h2 class="add-post__title">編輯文章：</h2>
          <form action="handle_edit.php" method="POST" class="add-post__form">
            <input type="hidden" name="id" value="<?= htmlspecialchars($_GET['id']) ?>">
            <input type="text" placeholder="請輸入文章標題" name="post_title" value="<?= htmlspecialchars($row['title']) ?>">
            <input type="text" placeholder="請輸入文章分類，分類之間用空白分隔" name="tags" value="<?= htmlspecialchars($row['tag_name']) ?>">
            <textarea name="post_content" id="editor"><?= htmlspecialchars($row['content']) ?></textarea>
            <button>送出文章</button>
          </form>
        <?php } ?>
      </div>
    </section>
  </main>

  <footer>
    <p>Copyright © 2020 Who's Blog All Rights Reserved.</p>
  </footer>

  <script>
    ClassicEditor
        .create(document.querySelector('#editor'), {
          toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
          heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
          }
        })
        .catch( error => {
            console.error( error );
        } );
  </script>
</body>
</html>