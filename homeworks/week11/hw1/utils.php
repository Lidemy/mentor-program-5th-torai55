<?php
require_once('conn.php');

function preparedStatement($query, $types, ...$vars) {
  global $conn;

  $stmt = $conn->prepare($query);
  $stmt->bind_param($types, ...$vars);
  $result = $stmt->execute();
  if($result) {
    $result = $stmt->get_result();
  }

  return array(
    'errno' => $conn->errno,
    'result' => $result
  );
}

function getUserInfo($username) {
  $nickname = false;
  $role = 4;
  if ($username) {
    $sql = 'SELECT username, nickname, role+0 AS role
            FROM torai_board_users
            WHERE username = ?;';

    $row = preparedStatement($sql, 's', $username)['result']->fetch_assoc();
    $nickname = $row['nickname'];
    $role = $row['role'];
  }

  return array(
    'nickname' => $nickname,
    'role' => $role
  );
}

function getPageInfo($sql, $limit) {
  global $conn;

  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $count = $row['count'];
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