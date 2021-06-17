<?php
  require_once('conn.php');
  session_start();

  // vertify login
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: login.php?errCode=1');
    exit();
  }

  $sql_query = sprintf(
    'SELECT username FROM torai_board_users WHERE username = "%s" AND password = "%s";'
    ,$_POST['username'], $_POST['password']
  );
  $result = $conn->query($sql_query);
  if (!$result) {
    die($conn->error);
  }

  if (!$result->num_rows) {
    header('Location: login.php?errCode=2');
    exit();
  }

  $_SESSION['username'] = $_POST['username'];

  header('Location: index.php');
?>