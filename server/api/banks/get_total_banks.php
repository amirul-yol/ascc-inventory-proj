<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database configuration
include_once '../../config/db_config.php';

// Create database instance
$database = new Database();
$db = $database->getConnection();

try {
    // Get total number of banks
    $query = "SELECT COUNT(*) as total FROM banks";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    if($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode(array("total" => intval($row['total'])));
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "No banks found."));
    }
} catch(PDOException $e) {
    http_response_code(503);
    echo json_encode(array("message" => "Error: " . $e->getMessage()));
}
?>
