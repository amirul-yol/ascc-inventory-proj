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
    // Get sum of totalCardType
    $query = "SELECT SUM(totalCardType) as total FROM banks";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $total = $row['total'] ?? 0;
    
    // Return response
    http_response_code(200);
    echo json_encode([
        "total" => (int)$total
    ]);
    
} catch(PDOException $e) {
    http_response_code(503);
    echo json_encode([
        "message" => "Error: " . $e->getMessage()
    ]);
}
?>
