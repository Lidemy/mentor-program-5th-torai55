<?php
require_once("utils.php");
header("Content-type: application/json;charset=utf-8");

$board_key = $_POST["board_key"];
$author = $_POST["author"];
$comment = $_POST["comment"];

// 檢查輸入
if(empty($board_key) || empty($author) || empty($comment)) {
  echoJSON(0, "資料不齊全", null);
  die();
}

// 存進資料庫
$sql = "INSERT INTO torai_msg_board_comments (board_key, author, comment)
        VALUES (?, ?, ?)";
$data = queryPreparedStatement($sql, 'sss', $board_key, $author, $comment);
if($data["error"]) {
  echoJSON(0, $data["error"], null);
  die();
}

// 回傳成功的留言
$sql = "SELECT * FROM torai_msg_board_comments WHERE id = LAST_INSERT_ID();";
$result = $conn->query($sql);
if(!$result) {
  echoJSON(0, $conn->error, null);
  die();
}
$row = $result->fetch_assoc();
$content = array($row);
echoJSON(1, "success", $content);

?>