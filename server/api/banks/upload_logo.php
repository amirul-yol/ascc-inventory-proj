<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Set upload directory
$target_dir = "../../uploads/bank_logos/";

// Create directory if it doesn't exist
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

try {
    if (!isset($_FILES["logo"])) {
        throw new Exception("No file uploaded");
    }

    $file = $_FILES["logo"];
    $fileName = $file["name"];
    $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    
    // Validate file size (max 2MB)
    if ($file["size"] > 2000000) {
        throw new Exception("File is too large. Maximum size is 2MB");
    }

    // Validate file type
    $allowedTypes = array("jpg", "jpeg", "png", "gif");
    if (!in_array($fileType, $allowedTypes)) {
        throw new Exception("Only JPG, JPEG, PNG & GIF files are allowed");
    }

    // Generate unique filename
    $uniqueName = uniqid() . '_' . bin2hex(random_bytes(8)) . '.' . $fileType;
    $targetFile = $target_dir . $uniqueName;

    // Upload file
    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
        // Return success response with file URL
        $fileUrl = 'http://localhost/inventoryproj/server/uploads/bank_logos/' . $uniqueName;
        http_response_code(200);
        echo json_encode(array(
            "message" => "File uploaded successfully",
            "url" => $fileUrl
        ));
    } else {
        throw new Exception("Failed to upload file");
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(array(
        "message" => $e->getMessage()
    ));
}
?>
