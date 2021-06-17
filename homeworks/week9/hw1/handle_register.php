<?php
  require_once('conn.php');
  session_start();

  // insert into users
  $sql_query = sprintf(
    'INSERT INTO torai_board_users (username, password, nickname) 
    VALUES ("%s", "%s", "%s");'
    ,$_POST['username'], $_POST['password'], $_POST['nickname']
  );
  $result = $conn->query($sql_query);
  if (!$result) {
    die($conn->error);
  }

  $_SESSION['username'] = $_POST['username'];

  // redirect to index.php
  header('Location: index.php');
?>