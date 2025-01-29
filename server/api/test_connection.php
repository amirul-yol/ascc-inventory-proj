<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database configuration
include_once '../config/db_config.php';

// Create database instance
$database = new Database();
$db = $database->getConnection();

if($db) {
    echo json_encode(array("message" => "Connection to database successful!", "status" => true));
} else {
    echo json_encode(array("message" => "Unable to connect to database.", "status" => false));
}
?>
