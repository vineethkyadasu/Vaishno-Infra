<?php
// router.php for local development with php -S
// This script emulates the .htaccess routing for the PHP built-in server.

$uri = decodeURIComponent($_SERVER['REQUEST_URI']);
$uri = parse_url($uri, PHP_URL_PATH);

// Serve static files directly
if (file_exists(__DIR__ . $uri) && !is_dir(__DIR__ . $uri)) {
    return false;
}

// Handle CORS for all requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Routing logic
$path = ltrim($uri, '/');
if (strpos($path, 'api/') === 0) {
    $path = substr($path, 4);
}

// Check for exact file first
if (file_exists(__DIR__ . '/api/' . $path)) {
    require_once __DIR__ . '/api/' . $path;
    exit();
}

// Check for .php extension
if (file_exists(__DIR__ . '/api/' . $path . '.php')) {
    require_once __DIR__ . '/api/' . $path . '.php';
    exit();
}

// Handle nested routes like projects/123 -> projects/read_one.php?id=123
if (preg_match('/^projects\/([0-9]+)$/', $path, $matches)) {
    $_GET['id'] = $matches[1];
    require_once __DIR__ . '/api/projects/read_one.php';
    exit();
}

if (preg_match('/^careers\/([0-9]+)$/', $path, $matches)) {
    $_GET['id'] = $matches[1];
    require_once __DIR__ . '/api/careers/read_one.php';
    exit();
}

// If no route matches
http_response_code(404);
echo json_encode(["message" => "Route not found: " . $path]);

function decodeURIComponent($str) {
    return rawurldecode($str);
}
