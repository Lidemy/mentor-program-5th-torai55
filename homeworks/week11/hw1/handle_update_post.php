<?php
require_once('conn.php');
require_once('utils.php');
session_start();

if (empty($_POST['comment'])) {
  $location = sprintf('Location: update_post.php?id=%s&errCode=1', $_GET['id']);
  header($location);
  die('資料不齊全');
}

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

$result = preparedStatement($sql, 'sis', $auth, $_GET['id'], $_SESSION['username'])['result'];
if (!$result->num_rows) {
  header('Location: index.php?errCode=3');
  die('權限不足');
}

// 更新留言
$sql = 'UPDATE torai_board_comments SET comment = ? WHERE id = ?;';
preparedStatement($sql, 'si', $_POST['comment'], $_GET['id']);

header('Location: index.php');
?>