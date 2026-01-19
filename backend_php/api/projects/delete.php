<?php
// backend_php/api/projects/delete.php
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

// Get ID from URL parameter
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id === 0) {
    http_response_code(400);
    echo json_encode(["message" => "Project ID is required."]);
    exit;
}

try {
    // Get image path before deleting
    $imageStmt = $pdo->prepare("SELECT image FROM projects WHERE id = :id");
    $imageStmt->bindParam(':id', $id);
    $imageStmt->execute();
    $project = $imageStmt->fetch(PDO::FETCH_ASSOC);

    if (!$project) {
        http_response_code(404);
        echo json_encode(["message" => "Project not found."]);
        exit;
    }

    $imagePath = $project['image'];
    
    // Delete the project from database
    $stmt = $pdo->prepare("DELETE FROM projects WHERE id = :id");
    $stmt->bindParam(':id', $id);
    
    if ($stmt->execute()) {
        // If database deletion successful, try to delete the physical image file
        if ($imagePath) {
            // Convert web path to absolute server path
            // The image path in DB is usually like: /api/uploads/filename.jpg
            // We need to resolve it relative to the uploads folder
            $filename = basename($imagePath);
            $localFilePath = __DIR__ . '/../../uploads/' . $filename;
            
            if (file_exists($localFilePath)) {
                unlink($localFilePath);
            }
        }

        http_response_code(200);
        echo json_encode(["message" => "Project deleted successfully."]);
    } else {
        throw new Exception("Failed to delete project.");
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => $e->getMessage()]);
}
?>
