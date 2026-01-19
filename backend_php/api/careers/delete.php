<?php
// backend_php/api/careers/delete.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config.php';

// Get ID from URL parameter
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id === 0) {
    http_response_code(400);
    echo json_encode(["message" => "Career ID is required."]);
    exit;
}

try {
    // Check if career exists
    $checkStmt = $pdo->prepare("SELECT id FROM careers WHERE id = :id");
    $checkStmt->bindParam(':id', $id);
    $checkStmt->execute();
    
    if ($checkStmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(["message" => "Career not found."]);
        exit;
    }
    
    // Delete the career
    $stmt = $pdo->prepare("DELETE FROM careers WHERE id = :id");
    $stmt->bindParam(':id', $id);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Career deleted successfully."]);
    } else {
        throw new Exception("Failed to delete career.");
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => $e->getMessage()]);
}
?>
