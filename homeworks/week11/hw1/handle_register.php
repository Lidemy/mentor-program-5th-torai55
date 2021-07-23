<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  // insert into users
  $sql = 'INSERT INTO torai_board_users (username, password, nickname) 
          VALUES (?, ?, ?);';
  $errno = preparedStatement($sql, 'sss', $_POST['username'], $password, $_POST['nickname'])['errno'];
  if($errno === 1062) {
    header('Location: register.php?errCode=4');
    die($conn->error);
  }

  $_SESSION['username'] = $_POST['username'];

  // redirect to index.php
  header('Location: index.php');
?>