<?php
  require_once('conn.php');
  session_start();

  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  // insert into users
  $sql = 'INSERT INTO torai_board_users (username, password, nickname) 
          VALUES (?, ?, ?);';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $_POST['username'], $password, $_POST['nickname']);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  $_SESSION['username'] = $_POST['username'];

  // redirect to index.php
  header('Location: index.php');
?>