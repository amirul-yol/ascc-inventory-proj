<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database configuration
include_once '../../config/db_config.php';

// Define upload directory
$upload_dir = "../../../public/assets/images/banks/";
$base_url = "http://localhost/inventoryproj/public/assets/images/banks/";

// Function to generate safe filename
function generateSafeFileName($originalName) {
    // Remove any path components
    $filename = basename($originalName);
    // Replace spaces with underscores
    $filename = str_replace(' ', '_', $filename);
    // Remove any non-alphanumeric characters except dots and underscores
    $filename = preg_replace("/[^a-zA-Z0-9\.\_]/", "", $filename);
    // Make lowercase
    $filename = strtolower($filename);
    // Add timestamp to make unique
    $name = pathinfo($filename, PATHINFO_FILENAME);
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    return $name . "_" . time() . "." . $ext;
}

try {
    // Check if file was uploaded
    if (!isset($_FILES['image'])) {
        throw new Exception('No file uploaded');
    }

    $file = $_FILES['image'];
    $bank_id = $_POST['bank_id'] ?? null;

    if (!$bank_id) {
        throw new Exception('Bank ID is required');
    }

    // Validate file type
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($file['type'], $allowed_types)) {
        throw new Exception('Invalid file type. Only JPG, PNG and GIF are allowed');
    }

    // Generate safe filename
    $filename = generateSafeFileName($file['name']);
    $filepath = $upload_dir . $filename;

    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $filepath)) {
        // Update database
        $database = new Database();
        $db = $database->getConnection();
        
        $image_url = $base_url . $filename;
        $query = "UPDATE banks SET imgURL = :imgURL WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":imgURL", $image_url);
        $stmt->bindParam(":id", $bank_id);
        
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode([
                "message" => "Image uploaded successfully",
                "imgURL" => $image_url
            ]);
        } else {
            throw new Exception('Failed to update database');
        }
    } else {
        throw new Exception('Failed to move uploaded file');
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        "message" => "Error: " . $e->getMessage()
    ]);
}
?>
