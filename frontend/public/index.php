<?php
// Fallback to serve index.html for SPA
$indexFile = __DIR__ . '/index.html';
if (file_exists($indexFile)) {
    readfile($indexFile);
} else {
    echo "<!DOCTYPE html><html><body><h1>Vaishno Infra</h1><p>Site is loading...</p></body></html>";
}
?>
