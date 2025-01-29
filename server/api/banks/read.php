<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database and object files
include_once '../../config/db_config.php';

// Instantiate database
$database = new Database();
$db = $database->getConnection();

try {
    // Select all banks
    $query = "SELECT * FROM banks ORDER BY name ASC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    if($stmt->rowCount() > 0) {
        $banks_arr = array();
        $banks_arr["records"] = array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            
            $bank_item = array(
                "id" => $id,
                "name" => $name,
                "totalCardType" => $totalCardType,
                "imgURL" => $imgURL,
                "created_at" => $created_at,
                "updated_at" => $updated_at
            );
            
            array_push($banks_arr["records"], $bank_item);
        }
        
        http_response_code(200);
        echo json_encode($banks_arr);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "No banks found."));
    }
} catch(PDOException $e) {
    http_response_code(503);
    echo json_encode(array("message" => "Error: " . $e->getMessage()));
}
?>
