<?php
require_once('conn.php');
session_start();

if (empty($_GET['nickname'])) {
  header('Location: index.php?errCode=1');
  die('資料不齊全');
}

$sql = 'UPDATE torai_board_users SET nickname = ? WHERE username = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $_GET['nickname'], $_SESSION['username']);
$result = $stmt->execute();
if (!$result) {
  die($conn->error);
}

header('Location: index.php');
?>