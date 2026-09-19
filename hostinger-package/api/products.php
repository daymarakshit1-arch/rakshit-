<?php
/**
 * electrobolt.electro - Products API Endpoint for Hostinger
 * Returns verified catalogue products with filtering support.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/products.json';
if (!file_exists($dataFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Product catalogue data file not found']);
    exit;
}

$rawJson = file_get_contents($dataFile);
$products = json_decode($rawJson, true);

if (!is_array($products)) {
    http_response_code(500);
    echo json_encode(['error' => 'Invalid catalogue data structure']);
    exit;
}

// Apply optional query filters (category, search, maxPrice)
$category = isset($_GET['category']) ? trim($_GET['category']) : null;
$search = isset($_GET['search']) ? strtolower(trim($_GET['search'])) : null;
$maxPrice = isset($_GET['maxPrice']) && is_numeric($_GET['maxPrice']) ? floatval($_GET['maxPrice']) : null;

$filtered = $products;

if ($category) {
    $filtered = array_filter($filtered, function ($item) use ($category) {
        return strcasecmp($item['category'] ?? '', $category) === 0;
    });
}

if ($search) {
    $filtered = array_filter($filtered, function ($item) use ($search) {
        $nameMatches = strpos(strtolower($item['name'] ?? ''), $search) !== false;
        $tagMatches = false;
        if (isset($item['tags']) && is_array($item['tags'])) {
            foreach ($item['tags'] as $tag) {
                if (strpos(strtolower($tag), $search) !== false) {
                    $tagMatches = true;
                    break;
                }
            }
        }
        return $nameMatches || $tagMatches;
    });
}

if ($maxPrice !== null) {
    $filtered = array_filter($filtered, function ($item) use ($maxPrice) {
        return isset($item['price']) && $item['price'] <= $maxPrice;
    });
}

// Reset array keys
$filtered = array_values($filtered);

echo json_encode([
    'products' => $filtered,
    'count' => count($filtered),
    'status' => 'success'
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
