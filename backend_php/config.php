<?php
// Database Configuration
$host = 'localhost'; // Usually 'localhost' on shared hosting
$dbname = 'u177524058_vaishnofinfra';
$username = 'u177524058_vaishnofinfra';
$password = 'Vaishnofinfra@123';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC); // Fetch as associative array
    
} catch(PDOException $e) {
    // Return error as JSON if connection fails
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}
?>
