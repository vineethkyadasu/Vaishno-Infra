<?php
// backend_php/api/projects/create.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Handle Image Upload
        $imageUrl = "";
        if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
            $uploadDir = '../../uploads/';
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
            
            $fileName = time() . '_' . basename($_FILES['image']['name']);
            $targetPath = $uploadDir . $fileName;
            
            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
                // Return relative path for frontend to prepend domain
                $imageUrl = 'backend_php/uploads/' . $fileName; 
            } else {
                throw new Exception("Failed to upload image.");
            }
        }
        
        // Get other form data
        // Note: When sending FormData (multipart/form-data), access via $_POST
        $title = $_POST['title'] ?? '';
        $category = $_POST['category'] ?? '';
        $location = $_POST['location'] ?? '';
        $description = $_POST['description'] ?? '';
        $features = $_POST['features'] ?? '[]'; // Expecting JSON string
        $completion_date = $_POST['completionDate'] ?? '';
        
        if (empty($title) || empty($category)) {
            throw new Exception("Title and Category are required.");
        }

        $sql = "INSERT INTO projects (title, category, location, description, image, features, completion_date) 
                VALUES (:title, :category, :location, :description, :image, :features, :completion_date)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':location', $location);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':image', $imageUrl);
        $stmt->bindParam(':features', $features);
        $stmt->bindParam(':completion_date', $completion_date);
        
        if($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Project created successfully."]);
        } else {
            throw new Exception("Failed to insert project.");
        }
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["message" => $e->getMessage()]);
    }
}
?>
