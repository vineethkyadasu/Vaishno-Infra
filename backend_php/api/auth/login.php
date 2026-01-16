<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    try {
        // Prepare statement to check if user exists
        // Note: Using 'username' col for email based on schema, or we might need to update schema to have email
        // Schema in install.php said: username VARCHAR(255)
        // Let's assume username is the email for admin login, or check both.
        
        $table_query = "SELECT id, username, password, role FROM users WHERE username = :email";
        $stmt = $pdo->prepare($table_query);
        $stmt->bindParam(':email', $data->email);
        $stmt->execute();
        
        if($stmt->rowCount() > 0){
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $hash = $row['password'];
            
            if(password_verify($data->password, $hash)){
                // Password is correct
                // Generate a simple token (In production use JWT)
                $token = bin2hex(random_bytes(16));
                
                http_response_code(200);
                echo json_encode(array(
                    "token" => $token, // Mock token for now
                    "user" => array(
                        "id" => $row['id'],
                        "username" => $row['username'],
                        "role" => $row['role']
                    ),
                    "message" => "Login successful"
                ));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Invalid password."));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "User not found."));
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
}
?>
