<?php
// backend_php/api/careers/read_one.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../../config.php';

try {
    $id = isset($_GET['id']) ? $_GET['id'] : die();

    $query = "SELECT * FROM careers WHERE id = :id LIMIT 0,1";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Decode requirements
        if (isset($row['requirements'])) {
            $row['requirements'] = json_decode($row['requirements']);
             if ($row['requirements'] === null) $row['requirements'] = [];
        }

        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Career not found."]);
    }

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}
?>
