<?php
// Include database configuration
include_once '../config/db_config.php';

// Create database instance
$database = new Database();
$conn = $database->getConnection();

try {
    // Create banks table
    $banks_table = "CREATE TABLE IF NOT EXISTS banks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        totalCardType INT DEFAULT 0,
        imgURL VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    $conn->exec($banks_table);
    echo "Table 'banks' created successfully!\n";

    // Insert sample data
    $sample_data = "INSERT INTO banks (name, totalCardType, imgURL) VALUES
        ('Bank Rakyat', 5, 'bank_rakyat.png'),
        ('Maybank', 8, 'maybank.png'),
        ('CIMB Bank', 6, 'cimb.png'),
        ('RHB Bank', 4, 'rhb.png')";
    
    $conn->exec($sample_data);
    echo "Sample data inserted successfully!\n";

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
