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
    // Get bank ID from URL parameter
    $bank_id = isset($_GET['id']) ? $_GET['id'] : die();

    // Get bank details
    $query = "SELECT * FROM banks WHERE id = ?";
    $stmt = $db->prepare($query);
    $stmt->bindParam(1, $bank_id);
    $stmt->execute();

    if($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Return bank data
        http_response_code(200);
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Bank not found."));
    }
} catch(PDOException $e) {
    http_response_code(503);
    echo json_encode(array("message" => "Error: " . $e->getMessage()));
}
?>
