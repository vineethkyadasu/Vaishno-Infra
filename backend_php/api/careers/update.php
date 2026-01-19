<?php
// backend_php/api/careers/update.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
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

$data = json_decode(file_get_contents("php://input"));

if (empty($data->title) || empty($data->location) || empty($data->description)) {
    http_response_code(400);
    echo json_encode(["message" => "Title, location, and description are required."]);
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
    
    $requirements = isset($data->requirements) ? json_encode($data->requirements) : '[]';
    
    $sql = "UPDATE careers SET 
            title = :title, 
            location = :location, 
            department = :department, 
            type = :type, 
            description = :description, 
            requirements = :requirements 
            WHERE id = :id";
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':title', $data->title);
    $stmt->bindParam(':location', $data->location);
    $stmt->bindParam(':department', $data->department);
    $stmt->bindParam(':type', $data->type);
    $stmt->bindParam(':description', $data->description);
    $stmt->bindParam(':requirements', $requirements);
    $stmt->bindParam(':id', $id);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Career updated successfully."]);
    } else {
        throw new Exception("Failed to update career.");
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => $e->getMessage()]);
}
?>
