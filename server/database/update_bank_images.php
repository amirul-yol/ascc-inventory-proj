<?php
// Include database configuration
include_once '../config/db_config.php';

// Create database instance
$database = new Database();
$conn = $database->getConnection();

// Base URL for images
$base_url = "http://localhost/inventoryproj/public/assets/images/banks/";

// Bank image mappings
$bank_images = [
    'Aeon Bank' => 'aeon-bank.png',
    'Ambank' => 'ambank.png',
    'Bank Islam' => 'bankislam.jpg',
    'Bank Mualamat' => 'bankmuamalat.jpg',
    'MBSB Bank' => 'mbsb-bank.jpg',
    'Al Rajhi Bank' => 'alrajhi-bank.jpg',
    'Agro Bank' => 'agro-bank.jpg'
];

try {
    foreach ($bank_images as $bank_name => $image_file) {
        $image_url = $base_url . $image_file;
        
        $query = "UPDATE banks SET imgURL = :imgURL WHERE name = :name";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":imgURL", $image_url);
        $stmt->bindParam(":name", $bank_name);
        
        if ($stmt->execute()) {
            echo "Updated image URL for {$bank_name}\n";
        } else {
            echo "Failed to update image URL for {$bank_name}\n";
        }
    }
    
    // Verify the updates
    $query = "SELECT name, imgURL FROM banks";
    $stmt = $conn->query($query);
    $banks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "\nCurrent bank image URLs:\n";
    foreach ($banks as $bank) {
        echo "{$bank['name']}: {$bank['imgURL']}\n";
    }
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
