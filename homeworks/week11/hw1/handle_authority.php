<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  // 確認是管理員
  $admin_name = $_SESSION['username'];
  $sql = 'SELECT role+0 as role FROM torai_board_users WHERE username = ?;';
  $result = preparedStatement($sql, 's', $admin_name)['result'];
  $row = $result->fetch_assoc();
  if (intval($row['role']) !== 1) {
    header('Location: index.php?errCode=3');
    die('權限不足');
  }

  // 確認輸入
  if (!in_array($_POST['role'], array(1, 2, 3))) {
    header('Location: backend.php?errCode=1');
    die('輸入錯誤');
  }

  // 更新權限
  $sql = 'UPDATE torai_board_users
          SET role = ?
          WHERE username = ?';

  preparedStatement($sql, 'ss', $_POST['role'], $_POST['username']);
  header('Location: backend.php');
?>