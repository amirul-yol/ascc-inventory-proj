<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database configuration
include_once '../../config/db_config.php';

// Create database instance
$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Make sure name is not empty
if (!empty($data->name)) {
    try {
        // Create query
        $query = "INSERT INTO banks (name, imgURL) VALUES (?, ?)";
        $stmt = $db->prepare($query);

        // Sanitize input
        $name = htmlspecialchars(strip_tags($data->name));
        $imgURL = !empty($data->imgURL) ? htmlspecialchars(strip_tags($data->imgURL)) : null;

        // Bind values
        $stmt->bindParam(1, $name);
        $stmt->bindParam(2, $imgURL);

        // Execute query
        if($stmt->execute()) {
            http_response_code(201);
            echo json_encode(array(
                "message" => "Bank was created successfully.",
                "id" => $db->lastInsertId()
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create bank."));
        }
    } catch(PDOException $e) {
        http_response_code(503);
        echo json_encode(array("message" => "Error: " . $e->getMessage()));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create bank. Bank name is required."));
}
?>
