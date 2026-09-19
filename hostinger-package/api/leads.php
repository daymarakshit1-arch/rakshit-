<?php
/**
 * electrobolt.electro - Lead Generation & Callback API for Hostinger
 * Handles quotation requests, contractor bids, and callback submissions.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload received']);
    exit;
}

$name = trim($data['name'] ?? '');
$contact = trim($data['contact'] ?? '');
$requirement = trim($data['productRequirement'] ?? '');
$type = trim($data['type'] ?? 'quotation');

if (empty($name) || empty($contact) || empty($requirement)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, Contact, and Product Requirement are required.']);
    exit;
}

// Ensure secure data directory exists
$storageDir = __DIR__ . '/../data';
if (!is_dir($storageDir)) {
    @mkdir($storageDir, 0755, true);
    // Protect data directory with an .htaccess deny rule
    @file_put_contents($storageDir . '/.htaccess', "Order allow,deny\nDeny from all\n");
}

$leadsFile = $storageDir . '/leads.json';
$leads = [];
if (file_exists($leadsFile)) {
    $existing = json_decode(file_get_contents($leadsFile), true);
    if (is_array($existing)) {
        $leads = $existing;
    }
}

$leadId = 'LEAD-' . time() . '-' . rand(100, 999);
$newLead = [
    'id' => $leadId,
    'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
    'contact' => htmlspecialchars($contact, ENT_QUOTES, 'UTF-8'),
    'productRequirement' => htmlspecialchars($requirement, ENT_QUOTES, 'UTF-8'),
    'type' => htmlspecialchars($type, ENT_QUOTES, 'UTF-8'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    'createdAt' => date('c'),
];

$leads[] = $newLead;
file_put_contents($leadsFile, json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

// Optional: Email notification if configured on Hostinger
// $adminEmail = 'support@electrobolt.electro';
// @mail($adminEmail, "New Enquiry: {$leadId}", "Name: {$name}\nContact: {$contact}\nRequirement: {$requirement}");

echo json_encode([
    'success' => true,
    'message' => 'Your enquiry has been securely logged with the electrobolt.electro team. A technical representative will contact you shortly.',
    'leadId' => $leadId
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
