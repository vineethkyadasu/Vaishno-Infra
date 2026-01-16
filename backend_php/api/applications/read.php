<?php
// backend_php/api/applications/read.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../../config.php';

try {
    $query = "SELECT * FROM applications ORDER BY created_at DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    $apps = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Map 'id' to '_id' to match frontend expectation (since MongoDB used _id)
    foreach ($apps as &$app) {
        $app['_id'] = $app['id'];
        $app['jobTitle'] = $app['job_title']; // Map snake_case to camelCase
        $app['createdAt'] = $app['created_at'];
    }
    
    echo json_encode($apps);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}
?>
