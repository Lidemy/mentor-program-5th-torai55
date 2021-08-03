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

  function getPageInfo($sql, $limit) {
    $result = querySQL($sql);
    $count = $result->fetch_assoc()['count'];
    $total_page = ceil($count / $limit);
    $page = 1;
    if (!empty($_GET['page']) && is_numeric($_GET['page'])) {
      $page = $_GET['page'];
    }
    $offset = ($page-1) * $limit;

    return array(
      'page' => $page, 
      'total_page' => $total_page,
      'offset' => $offset,
      'count' => $count
    );
  }

?>