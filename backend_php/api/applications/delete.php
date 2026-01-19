<?php
// backend_php/api/applications/delete.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Use local config if exists, otherwise use production config
if (file_exists('../../config.local.php')) {
    require_once '../../config.local.php';
} else {
    require_once '../../config.php';
}

$id = isset($_GET['id']) ? $_GET['id'] : die();

try {
    $query = "DELETE FROM applications WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $id);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Application deleted."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to delete application."]);
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}
?>
