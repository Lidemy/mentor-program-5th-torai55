<?php
session_start();
require_once("utils.php");
require_once("conn.php");

// 驗證登入資訊
if (empty($_SESSION['username'])) {
  head('Location: login.php');
  die('權限不足');
}

// 存 tag
$tags = array_unique(preg_split("/\s+/", trim($_POST['tags'], " \n\r\t\v\0")));;
$sql = 'INSERT INTO torai_blog_categories (tag_name) 
        SELECT * FROM (SELECT ? AS tag_name) AS tmp
        WHERE NOT EXISTS (
                          SELECT "tag_name" 
                          FROM torai_blog_categories 
                          WHERE BINARY tag_name = ?);';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $tag_name, $tag_name);

// 不重複 bind 讓資料庫輕鬆點
foreach($tags as $tag_name) {
  $result = $stmt->execute();
  // errno: 1062 === duplicate entry for key
  if (!$result && $conn->errno !== 1062) {
    die($conn->error);
  }
}

// 把文章加到資料庫
$sql = 'INSERT INTO torai_blog_posts (author_id, title, content) 
        VALUES (
          (SELECT id FROM torai_blog_members WHERE BINARY username = ?), 
          ?,
          ?
        );';

$result = queryWithPreparedStatement($sql, 'sss', $_SESSION['username'], 
                                        $_POST['post_title'], 
                                        substr($_POST['post_content'], 3, -4));
$post_id = $conn->insert_id;

// 把 tag_id 和 post_id 關聯起來
$sql = 'INSERT INTO torai_blog_category_post (tag_id, post_id) 
        VALUES (
          (SELECT id FROM torai_blog_categories WHERE BINARY tag_name = ?), 
          ?
        );';
$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $tag_name, $post_id);
// 一樣不重複 bind
foreach($tags as $tag_name) {
  $result = $stmt->execute();
  if (!$result && $conn->errno !== 1062) {
    die($conn->error);
  }
}

header('Location: index.php');

?>