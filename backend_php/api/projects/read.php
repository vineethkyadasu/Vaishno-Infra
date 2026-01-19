<?php
// backend_php/api/projects/read.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../../config.php';

try {
    $query = "SELECT * FROM projects ORDER BY created_at DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Fix image paths and decode JSON features field
    foreach ($projects as &$project) {
        // Fix legacy paths
        if (isset($project['image'])) {
            $project['image'] = str_replace('backend_php/uploads/', '/api/uploads/', $project['image']);
            if (strpos($project['image'], 'api/uploads/') === 0) {
                $project['image'] = '/' . $project['image'];
            }
        }
        
        if (isset($project['features'])) {
            $project['features'] = json_decode($project['features']);
            // Handle migrated/empty data
            if ($project['features'] === null) $project['features'] = []; 
        }
    }
    
    echo json_encode($projects);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}
?>
