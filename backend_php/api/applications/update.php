<?php
// backend_php/api/applications/update.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT"); // Allow PUT
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Use local config if exists, otherwise use production config
if (file_exists('../../config.local.php')) {
    require_once '../../config.local.php';
} else {
    require_once '../../config.php';
}

$data = json_decode(file_get_contents("php://input"));
$id = isset($_GET['id']) ? $_GET['id'] : die();

if (!empty($data->status)) {
    try {
        $query = "UPDATE applications SET status = :status WHERE id = :id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':status', $data->status);
        $stmt->bindParam(':id', $id);
        
        if($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["message" => "Application status updated."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to update status."]);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data."]);
}
?>
