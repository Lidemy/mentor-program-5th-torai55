<?php
  require_once('conn.php');
  require_once('utils.php');
  // 檢查輸入
  if(empty($_POST['comment'])) {
    header('Location: index.php');
    die('empty input');
  }
  $comment = htmlspecialchars($_POST['comment']);
  $username = htmlspecialchars($_POST['username']);

  // 新增留言
  $sql = 'INSERT INTO torai_board_comments (comment, user_id)
    VALUES (?, (SELECT id 
                  FROM torai_board_users 
                  WHERE username = ?));';

  preparedStatement($sql, 'ss', $comment, $username);

  header('Location: index.php');
?>