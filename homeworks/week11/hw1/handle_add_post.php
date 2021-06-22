<?php
  require_once('conn.php');

  // 新增留言
  $sql = 'INSERT INTO torai_board_comments (comment, user_id)
    VALUES (?, (SELECT id 
                  FROM torai_board_users 
                  WHERE username = ?));';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $_POST['comment'], $_POST['username']);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header('Location: index.php');
?>