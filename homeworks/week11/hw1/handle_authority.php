<?php
  require_once('conn.php');
  session_start();

  // 確認是管理員
  $admin_name = $_SESSION['username'];
  $sql = 'SELECT role+0 as role FROM torai_board_users WHERE username = ?;';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $admin_name);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  if (intval($row['role']) !== 1) {
    header('Location: index.php?errCode=3');
    die('權限不足');
  }
  $stmt->close();

  // 更新權限
  $sql = 'UPDATE torai_board_users
          SET role = ?
          WHERE username = ?';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $_POST['role'], $_POST['username']);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $stmt->close();
  header('Location: backend.php');
?>