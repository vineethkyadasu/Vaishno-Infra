<?php
// backend_php/api/careers/read.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../../config.php';

try {
    $query = "SELECT * FROM careers ORDER BY created_at DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    $careers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Decode JSON requirements field
    foreach ($careers as &$career) {
        if (isset($career['requirements'])) {
            $career['requirements'] = json_decode($career['requirements']);
             if ($career['requirements'] === null) $career['requirements'] = [];
        }
    }
    
    echo json_encode($careers);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}
?>
