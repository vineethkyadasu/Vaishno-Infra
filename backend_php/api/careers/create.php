<?php
// backend_php/api/careers/create.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config.php';

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->title) &&
    !empty($data->location) &&
    !empty($data->description)
){
    try {
        $sql = "INSERT INTO careers (title, location, department, type, description, requirements) 
                VALUES (:title, :location, :department, :type, :description, :requirements)";
        
        $stmt = $pdo->prepare($sql);
        
        $requirements = isset($data->requirements) ? json_encode($data->requirements) : '[]';
        
        $stmt->bindParam(':title', $data->title);
        $stmt->bindParam(':location', $data->location);
        $stmt->bindParam(':department', $data->department);
        $stmt->bindParam(':type', $data->type);
        $stmt->bindParam(':description', $data->description);
        $stmt->bindParam(':requirements', $requirements);
        
        if($stmt->execute()){
            http_response_code(201);
            echo json_encode(array("message" => "Career created successfully."));
        } else{
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create career."));
        }
    } catch(PDOException $e) {
         http_response_code(500);
         echo json_encode(array("message" => "Database error: " . $e->getMessage()));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data. Data is null or missing fields."));
}
?>
