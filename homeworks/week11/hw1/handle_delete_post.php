<?php
require_once('conn.php');
require_once('utils.php');
session_start();

// 檢查輸入
if (empty($_GET['id'])) {
  header('Location: index.php');
  die('no input');
}
$id = $_GET['id'];
$username = empty($_SESSION['username']) ? false : $_SESSION['username'];

// 確認是管理員 或留言擁有者
// step1 先列出管理員+文章主人清單
// step2 確認 username 是否在裡面
$role = 'admin';
$sql = 'SELECT username
        FROM (SELECT username
	            FROM torai_board_users
  	          WHERE role = ?
	            OR id = (SELECT user_id
			                 FROM torai_board_comments
			                 WHERE id = ?)
              ) AS result
        WHERE username = ?;';

preparedStatement($sql, 'sis', $role, $id, $username);
if (!$result->num_rows) {
  header('Location: index.php?errCode=3');
  die('權限不足');
}

// 刪除留言
$sql = 'UPDATE torai_board_comments 
        SET is_deleted = 1
        WHERE id = ?';
preparedStatement($sql, 'i', $id);

header('Location: index.php');
?>