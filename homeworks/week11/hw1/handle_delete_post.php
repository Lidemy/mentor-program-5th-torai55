<?php
require_once('conn.php');
session_start();

// 確認是管理員 或留言擁有者
// step1 先列出管理員+文章主人清單
// step2 確認 username 是否在裡面
$auth = 'admin';
$sql = 'SELECT username
        FROM (SELECT username
	            FROM torai_board_users
  	          WHERE role = ?
	            OR id = (SELECT user_id
			                 FROM torai_board_comments
			                 WHERE id = ?)
              ) AS result
        WHERE username = ?;';

$stmt = $conn->prepare($sql);
$stmt->bind_param('sis', $auth, $_GET['id'], $_SESSION['username']);
$result = $stmt->execute();
if (!$result) {
  die($conn->error);
}
$result = $stmt->get_result();
$stmt->close();
if (!$result->num_rows) {
  header('Location: index.php?errCode=3');
  die('權限不足');
}

// 刪除留言
$sql = 'UPDATE torai_board_comments 
        SET is_deleted = 1
        WHERE id = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $_GET['id']);
$result = $stmt->execute();
if (!$result) {
  die($conn->error);
}

header('Location: index.php');
?>