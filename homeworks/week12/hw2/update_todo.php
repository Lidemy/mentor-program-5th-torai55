<?php
require_once('conn.php');

$data = json_decode(file_get_contents('php://input'));

if(empty($data->todos) && $data->todo_id === null) {
  $response = array(
    'status' => 'fail',
    'message' => 'please add some todos',
    'todo_id' => null
  );
  die(json_encode($response));
}

// 取得 todo_id / 分配一個 todo_id 給使用者
// 會有 race condition，可能再開一張 table 存 id，用 auto increment + LAST_INSERT_ID() 避免吧
if(empty($data->todo_id)) {
  $sql = 'SELECT MAX(todo_id) AS todo_id FROM torai_todos';
  $result = $conn->query($sql);
  if(!$result) die($conn->error);
  $todo_id = intval($result->fetch_assoc()['todo_id']) + 1;
} else {
  if(!preg_match('/^\d*$/', $data->todo_id)) {
    $response = array(
      'status' => 'fail',
      'message' => 'id allow only numeric input',
      'todo_id' => null
    );
    die(json_encode($response));
  }
  $todo_id = $data->todo_id;
}

// PUT method 把資料整個取代
$sql = 'DELETE FROM torai_todos WHERE todo_id = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $todo_id);
$result = $stmt->execute();
if(!$result) die($conn->error);

$content;
$is_completed;
$sql = 'INSERT INTO torai_todos (todo_id, content, is_completed) VALUES (?, ?, ?);';
$stmt = $conn->prepare($sql);
$stmt->bind_param('isi', $todo_id, $content, $is_completed);

for($dataIterator = (new ArrayObject($data->todos))->getIterator();
    $dataIterator->valid();
    $dataIterator->next()) {

      $current = $dataIterator->current();
      $content = $current->content;
      $is_completed = $current->is_completed;
      $result = $stmt->execute();
      if(!$result) {
        die($conn->error);
      }
}

$response = array(
  'status' => 'success',
  'message' => 'good good',
  'todo_id' => $todo_id
);
echo json_encode($response);
?>