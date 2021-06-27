<?php
require_once('utils.php');
session_start();

// 檢查使用者是否登入
if(empty($_SESSION['username'])) {
  header('Location: login.php');
  die('權限不足');
}

// 刪除貼文 (soft delete)
$sql = 'UPDATE torai_blog_posts
        SET is_deleted = 1
        WHERE id = ?';

queryWithPreparedStatement($sql, 'i', $_GET['id']);

header('Location: backend.php?msg=1');

?>