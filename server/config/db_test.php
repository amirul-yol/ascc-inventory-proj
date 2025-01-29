<?php
$host = 'localhost';
$port = 3306;
$dbname = 'cardinventorydb';
$username = 'root';  // default username for XAMPP/Laragon
$password = '';      // default empty password for XAMPP/Laragon

try {
    $conn = new PDO("mysql:host=$host;port=$port", $username, $password);
    // Set PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Try to create database if it doesn't exist
    $conn->exec("CREATE DATABASE IF NOT EXISTS $dbname");
    echo "Database connection successful!\n";
    echo "Database '$dbname' is ready to use.";
    
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
