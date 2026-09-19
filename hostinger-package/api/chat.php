<?php
/**
 * electrobolt.electro - AI Chat Advisor Endpoint for Hostinger
 * Integrates directly with Gemini API (when configured) or falls back to
 * the 100% Grounded Dialogue Engine for instant zero-config Hostinger operation.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

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
$body = json_decode($rawInput, true);

if (!isset($body['messages']) || !is_array($body['messages']) || empty($body['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Messages array is required']);
    exit;
}

// Load catalogue
$dataFile = __DIR__ . '/products.json';
$catalogue = [];
if (file_exists($dataFile)) {
    $catalogue = json_decode(file_get_contents($dataFile), true) ?: [];
}

// Extract last user message
$messages = $body['messages'];
$lastUserMessage = '';
for ($i = count($messages) - 1; $i >= 0; $i--) {
    if (($messages[$i]['role'] ?? '') === 'user') {
        $lastUserMessage = trim($messages[$i]['text'] ?? '');
        break;
    }
}

// Determine Gemini API Key
function getGeminiApiKey() {
    // 1. Check environment variables
    $key = getenv('GEMINI_API_KEY');
    if (!empty($key)) return $key;
    if (!empty($_ENV['GEMINI_API_KEY'])) return $_ENV['GEMINI_API_KEY'];
    if (!empty($_SERVER['GEMINI_API_KEY'])) return $_SERVER['GEMINI_API_KEY'];

    // 2. Check root .env file in public_html or parent
    $possibleEnvFiles = [
        __DIR__ . '/../../.env',
        __DIR__ . '/../.env',
        __DIR__ . '/.env'
    ];
    foreach ($possibleEnvFiles as $envFile) {
        if (file_exists($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (strpos($line, '#') === 0) continue;
                if (strpos($line, 'GEMINI_API_KEY=') === 0) {
                    $val = substr($line, strlen('GEMINI_API_KEY='));
                    return trim(trim($val, '"\''));
                }
            }
        }
    }
    return null;
}

$apiKey = getGeminiApiKey();

// Grounded Rule-Based Engine (Identical to Node server fallback)
function runGroundedFallback($query, $catalogue) {
    $q = mb_strtolower($query, 'UTF-8');

    // Language detection
    $isHindi = (bool)preg_match('/[\x{0900}-\x{097F}]/u', $query);
    $isHinglish = (bool)preg_match('/\b(kya|kaunsa|kitna|chahiye|batao|kripya|sasta|achha|accha|dam|kam|paise|bataiye)\b/i', $q);

    // Human Support Query
    if (preg_match('/(human|agent|call|contact|phone|number|support team|बात|कॉल|मदद)/i', $q)) {
        if ($isHindi) {
            return "ज़रूर! मैं आपको आगे की सहायता के लिए electrobolt.electro टीम से जुड़ने में मदद कर सकता हूँ।\n\n- **टोल-फ्री हेल्पलाइन**: 1800-209-BOLT (1800-209-2658) (सोम-शनि 9 AM - 8 PM)\n- **ईमेल**: support@electrobolt.electro\n- आप ऊपर दिए गए **Request Callback / Quotation** बटन पर क्लिक करके भी अपनी जानकारी दर्ज कर सकते हैं।";
        }
        return "Sure! I can help you connect with the electrobolt.electro team for further assistance.\n\n- **Toll-free Helpline**: 1800-209-BOLT (1800-209-2658) (Mon-Sat, 9:00 AM - 8:00 PM)\n- **Email**: support@electrobolt.electro\n- You can also click the **Request Callback / Quotation** button above to leave your details for our team.";
    }

    // Bulk / B2B Query
    if (preg_match('/(bulk|wholesale|dealer|contractor|hotel|school|office|project|boq|व्यापार)/i', $q)) {
        return "Thank you for reaching out regarding business/bulk requirements! electrobolt.electro offers institutional pricing and direct contractor dispatch for commercial projects.\n\nPlease share your **Name, Contact number, and required product quantities**, or reach out to our dedicated B2B Desk:\n- **Helpline**: 1800-209-BOLT\n- **Email**: corporate@electrobolt.electro\n- Or click the **Request Callback / Quotation** button to submit your project bill of quantities (BOQ).";
    }

    // Comparison Query
    if (preg_match('/(compare|difference|तुलना|अंतर)/i', $q)) {
        $fans = array_values(array_filter($catalogue, function($p) { return ($p['category'] ?? '') === 'Ceiling Fans'; }));
        if (count($fans) >= 3) {
            return "Here is a side-by-side comparison of our popular ceiling fans:\n\n" .
                "| Feature | " . $fans[0]['name'] . " | " . $fans[1]['name'] . " | " . $fans[2]['name'] . " |\n" .
                "|---|---|---|---|\n" .
                "| **Price** | " . $fans[0]['formattedPrice'] . " | " . $fans[1]['formattedPrice'] . " | " . $fans[2]['formattedPrice'] . " |\n" .
                "| **Power** | " . $fans[0]['powerRating'] . " | " . $fans[1]['powerRating'] . " | " . $fans[2]['powerRating'] . " |\n" .
                "| **Key Feature** | 5-Star Energy Saver + RF Remote | High Speed 380 RPM + Anti-Dust | Natural Teak Finish + IoT Smart App |\n" .
                "| **Warranty** | " . $fans[0]['warranty'] . " | " . $fans[1]['warranty'] . " | " . $fans[2]['warranty'] . " |\n" .
                "| **Best For** | " . $fans[0]['bestFor'] . " | " . $fans[1]['bestFor'] . " | " . $fans[2]['bestFor'] . " |\n\n" .
                "*Note: Product 1 suits energy-conscious bedrooms wanting silent remote operation; Product 2 suits high-speed airflow on a budget; Product 3 is ideal for designer living rooms.*";
        }
    }

    // Category Identification
    $category = '';
    if (preg_match('/(ceiling fan|fan|पंखा|फैन)/i', $q)) $category = 'Ceiling Fans';
    elseif (preg_match('/(ac|air conditioner|cooling|एसी)/i', $q)) $category = 'Air Conditioners';
    elseif (preg_match('/(tv|television|screen|टीवी)/i', $q)) $category = 'Televisions';
    elseif (preg_match('/(washing|washer|clothes|कपड़े)/i', $q)) $category = 'Washing Machines';
    elseif (preg_match('/(wire|cable|wiring|तार)/i', $q)) $category = 'Electrical Wires & Cables';
    elseif (preg_match('/(tubelight|batten|ट्यूब)/i', $q)) $category = 'LED Tubelights';
    elseif (preg_match('/(bulb|lamp|बल्ब)/i', $q)) $category = 'LED Bulbs';
    elseif (preg_match('/(chandelier|decorative|fancy light|strip|झूमर)/i', $q)) $category = 'Fancy / Decorative Lights';
    elseif (preg_match('/(geyser|heater|purifier|cooktop|induction|गीजर)/i', $q)) $category = 'Other Electrical & Electronic Appliances';

    // Budget match
    $budget = null;
    if (preg_match('/(?:under|below|less than|within|upto|budget)\s*(?:₹|rs\.?|inr)?\s*(\d{1,6})/i', $q, $bMatches)) {
        $budget = intval($bMatches[1]);
    }

    if (!empty($category)) {
        $items = array_values(array_filter($catalogue, function($p) use ($category) {
            return ($p['category'] ?? '') === $category;
        }));

        if ($budget !== null) {
            $budgetItems = array_values(array_filter($items, function($p) use ($budget) {
                return isset($p['price']) && $p['price'] <= $budget;
            }));
            if (!empty($budgetItems)) {
                $items = $budgetItems;
            } else {
                usort($items, function($a, $b) { return ($a['price'] ?? 0) - ($b['price'] ?? 0); });
                $closest = $items[0] ?? null;
                if ($closest) {
                    return "We currently do not have a {$category} within ₹{$budget}. Our closest available option is the **{$closest['name']}** at {$closest['formattedPrice']}.\n\nWould you like to explore this model or adjust your budget?";
                }
            }
        }

        $top = array_slice($items, 0, 3);
        $resp = "Based on your requirements, these electrobolt.electro products may be suitable:\n\n";
        foreach ($top as $idx => $p) {
            $num = $idx + 1;
            $resp .= "PRODUCT {$num}:\n";
            $resp .= "Product Name: {$p['name']}\n";
            $resp .= "Price: {$p['formattedPrice']}\n";
            $resp .= "Key Features:\n";
            if (isset($p['keyFeatures']) && is_array($p['keyFeatures'])) {
                foreach ($p['keyFeatures'] as $kf) {
                    $resp .= "• {$kf}\n";
                }
            }
            $resp .= "Why it matches: " . ($p['bestFor'] ?? '') . "\n";
            $resp .= "Warranty: " . ($p['warranty'] ?? '') . "\n";
            $resp .= "Product URL: [View Product](" . ($p['productUrl'] ?? '') . ")\n\n";
        }
        return trim($resp);
    }

    // Default conversational greeting
    if ($isHindi) {
        return "नमस्ते! मैं electrobolt.electro AI Product Advisor हूँ। कृपया मुझे बताएं कि आप किस उत्पाद श्रेणी की तलाश कर रहे हैं (जैसे सीलिंग फैन, एसी, टीवी, वाशिंग मशीन, वायर या एलईडी लाइटिंग), आपका रूम साइज और अनुमानित बजट क्या है?";
    }
    if ($isHinglish) {
        return "Haanji! Aapko kis category mein product chahiye (jaise Ceiling Fan, Inverter AC, Smart TV, Washing Machine, ya Electrical Wires)? Apna room size aur budget batayein taaki main accurate recommendations de sakun.";
    }

    return "To help you make the best choice, could you tell me a little more about your requirements?\n\n• What is the room size or application area?\n• Do you have an approximate budget in mind?\n• Are there specific features you need (e.g. BLDC energy saving, remote control, smart IoT, silent operation)?";
}

// If Gemini API Key is available, invoke Gemini via cURL
if (!empty($apiKey) && function_exists('curl_init')) {
    $systemInstruction = "You are “electrobolt.electro AI Product Advisor,” an intelligent shopping assistant for the electrobolt.electro website.
Your primary job is to help website visitors discover, compare, and choose electrical and electronic products that best match their needs, preferences, room requirements, and budget.
WEBSITE: electrobolt.electro
CORE OBJECTIVE: Help customers make an informed product choice quickly and easily. Ask relevant questions, understand customer requirements, and recommend up to 3 most suitable products from the official electrobolt.electro catalogue.
IMPORTANT GROUNDING RULES:
1. Only recommend products that actually exist in the electrobolt.electro product catalogue below.
2. Never invent names, prices, specifications, warranty, or stock.
3. If information is unavailable, clearly state so.
OFFICIAL ELECTROBOLT.ELECTRO CATALOGUE:
" . json_encode($catalogue, JSON_UNESCAPED_SLASHES);

    $formattedContents = [];
    foreach ($messages as $m) {
        $formattedContents[] = [
            'role' => ($m['role'] === 'user') ? 'user' : 'model',
            'parts' => [['text' => $m['text'] ?? '']]
        ];
    }

    $payload = [
        'contents' => $formattedContents,
        'systemInstruction' => [
            'parts' => [['text' => $systemInstruction]]
        ],
        'generationConfig' => [
            'temperature' => 0.2
        ]
    ];

    $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" . urlencode($apiKey);

    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'User-Agent: electrobolt-electro-hostinger'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 && !empty($response)) {
        $resJson = json_decode($response, true);
        $candidateText = $resJson['candidates'][0]['content']['parts'][0]['text'] ?? null;
        if (!empty($candidateText)) {
            echo json_encode([
                'text' => $candidateText,
                'model' => 'gemini-2.5-flash'
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
}

// Fallback to embedded grounded rules engine
$fallbackReply = runGroundedFallback($lastUserMessage, $catalogue);
echo json_encode([
    'text' => $fallbackReply,
    'model' => 'local-grounded-fallback',
    'warning' => 'Processed via electrobolt.electro Grounded Rules Engine'
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
