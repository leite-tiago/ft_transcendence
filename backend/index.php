<?php
// Simple PHP backend placeholder
// This can be extended with API endpoints later

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple routing
$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

// API endpoint examples
if ($request_uri === '/api/health' && $request_method === 'GET') {
    echo json_encode([
        'status' => 'ok',
        'message' => 'Backend is running'
    ]);
    exit();
}

// Default 404 response
http_response_code(404);
echo json_encode([
    'error' => 'Endpoint not found'
]);
