<?php
require_once('utils.php');
session_start();

// 驗證登入資訊
require_once('authentication.php');
if (!$username)) {
  head('Location: login.php');
  die('權限不足');
}

// 存 tag
$insert_tags = array_unique(preg_split("/\s+/", trim($_POST['tags'], " \n\r\t\v\0")));
$sql = 'INSERT INTO torai_blog_categories (tag_name) 
        SELECT * FROM (SELECT ? AS tag_name) AS tmp
        WHERE NOT EXISTS (
                          SELECT "tag_name" 
                          FROM torai_blog_categories 
                          WHERE tag_name = ?);';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $tag_name, $tag_name);

// 不重複 bind 讓資料庫輕鬆點
foreach($insert_tags as $tag_name) {
  $result = $stmt->execute();
  // errno: 1062 === duplicate entry for key
  if (!$result && $conn->errno !== 1062) {
    die($conn->error);
  }
}

// 更新文章
$sql = 'UPDATE torai_blog_posts
        SET title = ?, content = ?
        WHERE id = ?';
queryWithPreparedStatement($sql, 'ssi', $_POST['post_title'], substr($_POST['post_content'], 3, -4), $_POST['id']);

// 更新 tag_id 和 post_id 的關聯
// 先抓出存在資料庫的 tags
$sql = 'SELECT GROUP_CONCAT(b.tag_name SEPARATOR " ") AS tag_name
        FROM torai_blog_category_post AS a
        LEFT JOIN torai_blog_categories AS b
        ON a.tag_id = b.id
        WHERE a.post_id = ?
        GROUP BY a.post_id;';
$result = queryWithPreparedStatement($sql, 'i', $_POST['id']);
$row = $result->fetch_assoc();

// 作者更新的 tags VS 資料庫的 tags
$delete_tags = preg_split("/\s+/", $row['tag_name']);

deleteSameElement($insert_tags, $delete_tags);
deleteSameElement($delete_tags, $insert_tags);

// 把不要的刪掉，要的新增
if (!empty($insert_tags)) {
  $sql = 'INSERT INTO torai_blog_category_post (tag_id, post_id) 
          VALUES (
            (SELECT id FROM torai_blog_categories WHERE tag_name = ?), 
            ?
          );';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $tag_name, $_POST['id']);
  // 一樣不重複 bind
  foreach($insert_tags as $tag_name) {
    print_r($tag_name);
    echo "<br />";
    $result = $stmt->execute();
    if (!$result && $conn->errno !== 1062) {
      die($conn->error);
    }
  }
}

if (!empty($delete_tags)) {
  $sql = 'DELETE FROM torai_blog_category_post
          WHERE BINARY tag_id = (SELECT id FROM torai_blog_categories WHERE BINARY tag_name = ?)
          AND post_id = ?;';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $tag_name, $_POST['id']);
  // 一樣不重複 bind
  foreach($delete_tags as $tag_name) {
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
  }
}

  header('Location: backend.php');
?>