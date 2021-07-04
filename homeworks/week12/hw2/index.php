<?php
require_once('conn.php');

$todo_id = false;
if(!empty($_GET['id'])) {
  $todo_id = $_GET['id'];
}

if(!preg_match('/^\d*$/', $todo_id)) {
  header('Location: ./index.php');
  die('id allow only numeric input');
}

if($todo_id) {
  $sql = 'SELECT * FROM torai_todos WHERE todo_id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $todo_id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
}

?>


<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="author" content="Torai Lin" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base target="_self" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>todo-list</title>
  </head>
  <body class="bg-light">
    <div class="container bg-white mt-5 p-3">
      <div class="row justify-content-center">
        <div class="col fs-1 text-center">
          todos
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <div class="add-todo row mb-3">
            <div class="col">
              <div class="form-check">
                <input class="todo-select-all form-check-input" type="checkbox">
                <input type="text" class="add-todo__input form-control" placeholder="What needs to be done?">
              </div>
            </div>
          </div>

          <div class="todos row mb-3">
            <?php if($todo_id) { ?>
              <?php while($row = $result->fetch_assoc()) { ?>
                <div class="todo col-12 mb-3">
                  <div class="form-check position-relative">
                    <input class="todo-check form-check-input" type="checkbox" <?php if($row['is_completed']) echo 'checked' ?>>
                    <div class="todo-content position-relative">
                      <div class="todo-text position-absolute start-0 end-0 top-0 bottom-0"><?= htmlspecialchars($row['content']) ?></div>
                      <input type="text" class="todo-input form-control" value="<?= htmlspecialchars($row['content']) ?>">
                      <div class="strikethrough position-absolute top-50"></div>
                    </div>
                    <button type="button" class="btn-delete btn btn-danger position-absolute end-0 top-0 hide" data-bs-toggle="tooltip" data-bs-placement="top" title="delete">
                      X
                    </button>
                  </div>
                </div>
              <?php } ?>
            <?php } ?>
          </div>

          <div class="row">
            <div class="col text-center">
              <button type="submit" class="save-btn btn btn-primary btn-lg">Save</button>
            </div>
          </div>
        </div>
      </div>

      <div class="todo-bottom row justify-content-center flex-row flex-wrap">
        <div class="todo-count col text-start"></div>
        <div class="todo-clear col text-end"><p>Clear completed</p></div>
        <div class="todo-filter col text-center">
          <div class="todo-filter__wrapper d-flex justify-content-around flex-row flex-nowrap">
            <div class="filter__all ps-2 pe-2"><p>All</p></div>
            <div class="filter__active ps-2 pe-2"><p>Active</p></div>
            <div class="filter__completed ps-2 pe-2"><p>Completed</p></div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col text-center">
          double click to edit
        </div>
      </div>
    </div>

    <!-- <script>
      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
      })
    </script> -->
    <script src="./app.js"></script>
  </body>
</html>
