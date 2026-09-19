<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'status' => 'ok',
    'platform' => 'Hostinger Web Hosting',
    'php_version' => PHP_VERSION,
    'time' => date('c')
]);
