<?php
require_once("utils.php");
header("Content-type: application/json;charset=utf-8");

// 檢查 $board_key
if(empty($_GET["board_key"])) {
  echoJSON(0, "請輸入 board_key", null);
  die();
}
$board_key = $_GET["board_key"];

$limit = empty($_GET["limit"]) ? 5 : $_GET["limit"];
$cursor = empty($_GET["cursor"]) ? 0 : $_GET["cursor"];
$sql = "SELECT id, author, comment, created_at 
      FROM torai_msg_board_comments
      WHERE board_key = ?
      AND id " . ($cursor === 0 ? ">": "<") . " ?
      ORDER BY created_at DESC
      LIMIT ?;";

$data = queryPreparedStatement($sql, 'sii', $board_key, $cursor, $limit);
if($data["error"]) {
  echoJSON(0, $data["error"], null);
  die();
}

$contents = array();
while($row = $data["result"]->fetch_assoc()) {
  array_push($contents, $row);
}
echoJSON(1, 'success', $contents);

?>