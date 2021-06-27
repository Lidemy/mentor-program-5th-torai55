<?php
  require_once("conn.php");

  $sql = "SELECT password FROM torai_blog_members WHERE BINARY username = ?;";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $_POST['username']);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $valid = password_verify($_POST['password'], $row['password']);
  if (!$valid) {
    header("Location: login.php?errCode=1");
    die('帳號或密碼錯誤');
  }

  // 登入成功
  session_start();
  $_SESSION['username'] = $_POST['username'];
  header('Location: index.php');
?>