<?php
  require_once('conn.php');

  $sql_query = sprintf(
    'INSERT INTO torai_board_comments (content, user_id)
    VALUES ("%s", (SELECT id 
                  FROM torai_board_users 
                  WHERE username = "%s"));
    ',
    $_POST['comment'], $_POST['username']
  );
  $result = $conn->query($sql_query);
  if (!$result) {
    die($conn->error);
  }

  header('Location: index.php');
?>