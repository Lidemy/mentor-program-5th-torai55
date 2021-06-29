<?php
require_once("conn.php");

function queryPreparedStatement($queryStr, $types, ...$params) {
  global $conn;

  $stmt = $conn->prepare($queryStr);
  $stmt->bind_param($types, ...$params);
  $result = $stmt->execute();
  if(!$result) {
    $data = array(
      "result" => $result,
      "stmt" => $stmt,
      "error" => $conn->error
    );
    return $data;
  }

  $result = $stmt->get_result();
  $data = array(
    "result" => $result,
    "stmt" => $stmt,
    "error" => null
  );
  return $data;
}

function echoJSON($statCode, $msg, $contents) {
  $json = array(
    "statCode" => $statCode,
    "msg" => $msg,
    "contents" => $contents
  );
  echo json_encode($json);
}

?>