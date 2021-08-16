<?php
  require_once("conn.php");
  session_start();

  // 檢查是否有登入
  require_once('authentication.php');

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
  <title>新增文章</title>
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
      <li><a href="backend.php">管理後臺</a></li>
      <li><a href="handle_logout.php">登出</a></li>
    </ul>
  </nav>

  <section class="banner">
    <h3 class="banner__title">存放技術之地 - 新增文章</h3>
    <p class="banner__desc">Welcome to my blog</p>
  </section>

  <main>
    <section class="add-post__wrapper">
      <div class="add-post">
        <?php if(!$username) { ?>
          <p class="err-msg">權限不足</p>
        <?php } else { ?>
          <h2 class="add-post__title">發表文章：</h2>
          <form action="handle_add_post.php" method="POST" class="add-post__form">
            <input type="text" placeholder="請輸入文章標題" name="post_title">
            <input type="text" placeholder="請輸入文章分類，分類之間用空白分隔" name="tags">
            <textarea name="post_content" id="editor"></textarea>
            <button class="add-post_btn">送出文章</button>
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