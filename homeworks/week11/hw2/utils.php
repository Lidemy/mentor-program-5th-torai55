<?php
  require_once('conn.php');

  function querySQL($queryStr) {
    global $conn;
    $result = $conn->query($queryStr);
    if (!$result) {
      die($conn->error);
    }
    return $result;
  }

  function queryWithPreparedStatement ($queryStr, $types, ...$params) {
    global $conn;
    $stmt = $conn->prepare($queryStr);
    $stmt->bind_param($types, ...$params);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();
    return $result;
  }

  function deleteSameElement(&$arr1, &$arr2) {
    foreach($arr1 as $arr1_key => $value) {
      $arr2_key = array_search($value, $arr2);
      if($arr2_key !== false) {
        unset($arr1[$arr1_key]);
        unset($arr2[$arr2_key]);
      }
    }
  }
?>