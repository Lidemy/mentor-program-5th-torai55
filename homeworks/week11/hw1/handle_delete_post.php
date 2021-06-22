<?php
require_once('conn.php');
session_start();

$sql = 'UPDATE torai_board_comments 
        SET is_deleted = 1
        WHERE id = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $_GET['id']);
$result = $stmt->execute();
if (!$result) {
  die($conn->error);
}

header('Location: index.php');
?>