<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataFile = __DIR__ . '/inventory_store.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    if (isset($data['inventory']) && is_array($data['inventory'])) {
        file_put_contents($dataFile, json_encode($data['inventory'], JSON_PRETTY_PRINT));
        echo json_encode(['success' => true, 'count' => count($data['inventory'])]);
        exit(0);
    }
    echo json_encode(['success' => false, 'error' => 'Invalid inventory format']);
    exit(0);
}

// GET Request
if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    $parsed = json_decode($content, true);
    if (is_array($parsed) && count($parsed) > 0) {
        echo json_encode(['success' => true, 'inventory' => $parsed]);
        exit(0);
    }
}

echo json_encode(['success' => false, 'error' => 'No stored inventory data yet']);
