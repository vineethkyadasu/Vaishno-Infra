<?php
// backend_php/api/applications/read.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Use local config if exists, otherwise use production config
if (file_exists('../../config.local.php')) {
    require_once '../../config.local.php';
} else {
    require_once '../../config.php';
}

try {
    $query = "SELECT * FROM applications ORDER BY created_at DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    $apps = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Map 'id' to '_id' to match frontend expectation (since MongoDB used _id)
    foreach ($apps as &$app) {
        $app['_id'] = $app['id'];
        $app['jobTitle'] = $app['job_title']; // Map snake_case to camelCase
        $app['createdAt'] = $app['created_at'];

        // Format resume path correctly
        if (isset($app['resume']) && !empty($app['resume'])) {
            $filename = basename($app['resume']);
            $app['resume'] = '/api/uploads/' . $filename;
        }
    }
    
    echo json_encode($apps);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}
?>
