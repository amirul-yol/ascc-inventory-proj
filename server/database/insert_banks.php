<?php
// Include database configuration
include_once '../config/db_config.php';

// Create database instance
$database = new Database();
$conn = $database->getConnection();

try {
    // First, clear existing data
    $clear_data = "TRUNCATE TABLE banks";
    $conn->exec($clear_data);
    echo "Existing data cleared successfully!\n";

    // Insert new bank data
    $insert_banks = "INSERT INTO banks (name, totalCardType, imgURL) VALUES
        ('Aeon Bank', 14, NULL),
        ('Ambank', 17, NULL),
        ('Bank Islam', 15, NULL),
        ('Bank Mualamat', 4, NULL),
        ('MBSB Bank', 1, NULL),
        ('Al Rajhi Bank', 4, NULL),
        ('Agro Bank', 4, NULL)";
    
    $conn->exec($insert_banks);
    echo "New bank data inserted successfully!\n";

    // Verify the data
    $query = "SELECT * FROM banks ORDER BY name ASC";
    $stmt = $conn->query($query);
    $banks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "\nCurrent banks in database:\n";
    foreach($banks as $bank) {
        echo "- {$bank['name']}: {$bank['totalCardType']} card types\n";
    }

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
