<?php
  // 不開放註冊功能
  header('Location: index.php');
  die();

  require_once("conn.php");

  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = "INSERT INTO torai_blog_members (username, password)
          SELECT * FROM (SELECT ? AS username, ? AS password) AS tmp
          WHERE NOT EXISTS (SELECT * FROM torai_blog_members
                            WHERE BINARY username = ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $password, $username);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  if($stmt->affected_rows == 0) {
    header('Location: signup.php?errCode=87');
    die('名稱重複');
  }

  // 存進 session
  session_start();
  $_SESSION['hw2_username'] = $username;
  header('Location: index.php');
?>