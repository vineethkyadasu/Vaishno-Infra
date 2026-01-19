<?php
// backend_php/api/applications/create.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Use local config if exists, otherwise use production config
if (file_exists('../../config.local.php')) {
    require_once '../../config.local.php';
} else {
    require_once '../../config.php';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Handle Resume Upload
        $resumeUrl = "";
        if (isset($_FILES['resume']) && $_FILES['resume']['error'] === 0) {
            $uploadDir = '../../uploads/';
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
            
            $fileExt = strtolower(pathinfo($_FILES['resume']['name'], PATHINFO_EXTENSION));
            $allowed = ['pdf', 'doc', 'docx'];
            
            if(!in_array($fileExt, $allowed)){
                throw new Exception("Invalid file type. Only PDF/DOC allowed.");
            }

            $fileName = time() . '_' . basename($_FILES['resume']['name']);
            $targetPath = $uploadDir . $fileName;
            
            if (move_uploaded_file($_FILES['resume']['tmp_name'], $targetPath)) {
                $resumeUrl = $fileName; 
            } else {
                throw new Exception("Failed to upload resume.");
            }
        } else {
             throw new Exception("Resume file is required.");
        }
        
        $jobTitle = $_POST['jobTitle'] ?? 'General Application';
        $jobIdInput = $_POST['jobId'] ?? null;
        $jobId = (is_numeric($jobIdInput) && intval($jobIdInput) > 0) ? intval($jobIdInput) : null;
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $phone = $_POST['phone'] ?? '';
        $coverLetter = $_POST['coverLetter'] ?? '';
        
        if (empty($name) || empty($email) || empty($phone)) {
            throw new Exception("Name, Email, and Phone are required.");
        }

        $sql = "INSERT INTO applications (job_title, job_id, name, email, phone, cover_letter, resume) 
                VALUES (:job_title, :job_id, :name, :email, :phone, :cover_letter, :resume)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':job_title', $jobTitle);
        $stmt->bindParam(':job_id', $jobId);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':cover_letter', $coverLetter);
        $stmt->bindParam(':resume', $resumeUrl);
        
        if($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Application submitted successfully."]);
        } else {
            throw new Exception("Failed to save application.");
        }
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["message" => $e->getMessage()]);
    }
}
?>
