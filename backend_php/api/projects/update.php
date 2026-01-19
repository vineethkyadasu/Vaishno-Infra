<?php
// backend_php/api/projects/update.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT, POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config.php';

// Get ID from URL parameter
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id === 0) {
    http_response_code(400);
    echo json_encode(["message" => "Project ID is required."]);
    exit;
}

try {
    // Check if project exists
    $checkStmt = $pdo->prepare("SELECT id, image FROM projects WHERE id = :id");
    $checkStmt->bindParam(':id', $id);
    $checkStmt->execute();
    
    if ($checkStmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(["message" => "Project not found."]);
        exit;
    }
    
    $existingProject = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
    // Handle Image Upload (if new image is provided)
    $imageUrl = $existingProject['image']; // Keep existing image by default
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $uploadDir = '../../uploads/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
        
        $fileName = time() . '_' . basename($_FILES['image']['name']);
        $targetPath = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $imageUrl = $fileName;
        }
    }
    
    // Get form data
    $title = $_POST['title'] ?? '';
    $category = $_POST['category'] ?? '';
    $location = $_POST['location'] ?? '';
    $description = $_POST['description'] ?? '';
    $features = $_POST['features'] ?? '[]';
    $completion_date = $_POST['completionDate'] ?? '';
    
    if (empty($title) || empty($category)) {
        throw new Exception("Title and Category are required.");
    }

    $sql = "UPDATE projects SET 
            title = :title, 
            category = :category, 
            location = :location, 
            description = :description, 
            image = :image, 
            features = :features, 
            completion_date = :completion_date 
            WHERE id = :id";
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':category', $category);
    $stmt->bindParam(':location', $location);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':image', $imageUrl);
    $stmt->bindParam(':features', $features);
    $stmt->bindParam(':completion_date', $completion_date);
    $stmt->bindParam(':id', $id);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Project updated successfully."]);
    } else {
        throw new Exception("Failed to update project.");
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => $e->getMessage()]);
}
?>
