<?php
  require_once('conn.php');
  session_start();

  // vertify login
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header('Location: login.php?errCode=1');
    exit();
  }

  $sql = 'SELECT username, password FROM torai_board_users WHERE username = ?;';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $_POST['username']);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  if (!$result->num_rows) {
    header('Location: login.php?errCode=2');
    exit();
  }

  $row = $result->fetch_assoc();
  $verify = password_verify($_POST['password'], $row['password']);

  if (!$verify) {
    header('Location: login.php?errCode=2');
    die('帳號或密碼錯誤');
  }

  $_SESSION['username'] = $_POST['username'];

  header('Location: index.php');
?>