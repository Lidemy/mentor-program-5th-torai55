<?php
require_once('conn.php');
require_once('utils.php');
session_start();

// 檢查輸入
$nickname = is_null($_GET['nickname']) ? false : trim($_GET['nickname']);
$username = empty($_SESSION['username']) ? false : $_SESSION['username'];
if(!$username) {
  header('Location: index.php?errCode=1');
  die('資料不齊全');
}

$sql = 'UPDATE torai_board_users SET nickname = ? WHERE username = ?';
preparedStatement($sql, 'ss', $nickname, $username);

header('Location: index.php');
?>