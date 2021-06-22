<?php
  require_once('conn.php');
  session_start();


  if (empty($_POST['comment'])) {
    $location = sprintf('Location: update_post.php?id=%s&errCode=1', $_GET['id']);
    header($location);
    die('資料不齊全');
  }

  $sql = 'UPDATE torai_board_comments SET comment = ? WHERE id = ?;';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $_POST['comment'], $_GET['id']);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header('Location: index.php');
?>