<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataFile = __DIR__ . '/wholesale_store.json';
$configFile = __DIR__ . '/wholesale_config.json';

// Get current config
$config = ['supplierEmail' => ''];
if (file_exists($configFile)) {
    $c = json_decode(file_get_contents($configFile), true);
    if (is_array($c)) {
        $config = array_merge($config, $c);
    }
}

// GET Request: fetch orders and config for admin
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $orders = [];
    if (file_exists($dataFile)) {
        $parsed = json_decode(file_get_contents($dataFile), true);
        if (is_array($parsed)) {
            $orders = $parsed;
        }
    }
    echo json_encode([
        'success' => true,
        'orders' => $orders,
        'config' => $config
    ]);
    exit(0);
}

// POST Request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Update config request from Admin
    if (isset($data['action']) && $data['action'] === 'update_config') {
        if (isset($data['supplierEmail'])) {
            $config['supplierEmail'] = trim($data['supplierEmail']);
            file_put_contents($configFile, json_encode($config, JSON_PRETTY_PRINT));
            echo json_encode(['success' => true, 'config' => $config]);
            exit(0);
        }
    }

    // Submit new wholesale wishlist order
    if (isset($data['selectedSizes']) && is_array($data['selectedSizes']) && count($data['selectedSizes']) > 0) {
        $orderId = 'WS-' . rand(10000, 99999);
        
        $newOrder = [
            'id' => $orderId,
            'buyerName' => trim($data['buyerName'] ?? 'Anonymous Buyer'),
            'companyName' => trim($data['companyName'] ?? ''),
            'phone' => trim($data['phone'] ?? ''),
            'email' => trim($data['email'] ?? ''),
            'address' => trim($data['address'] ?? ''),
            'notes' => trim($data['notes'] ?? ''),
            'selectedSizes' => $data['selectedSizes'],
            'totalTires' => array_reduce($data['selectedSizes'], function($sum, $item) { return $sum + intval($item['qty'] ?? 0); }, 0),
            'status' => 'Pending Supplier Quote',
            'createdAt' => date('Y-m-d H:i:s')
        ];

        // Save order to store
        $existing = [];
        if (file_exists($dataFile)) {
            $parsed = json_decode(file_get_contents($dataFile), true);
            if (is_array($parsed)) {
                $existing = $parsed;
            }
        }
        array_unshift($existing, $newOrder);
        file_put_contents($dataFile, json_encode($existing, JSON_PRETTY_PRINT));

        // Prepare email bodies
        
        // 1. Size list formatted HTML
        $sizesHtml = '<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:100%; max-width:600px; font-family:sans-serif;">';
        $sizesHtml .= '<tr style="background:#1e293b; color:#ffffff;"><th>Rim Group</th><th>Tire Size</th><th>Requested Quantity</th></tr>';
        foreach ($data['selectedSizes'] as $s) {
            $sizesHtml .= '<tr><td>' . htmlspecialchars($s['rimGroup'] ?? '') . '</td><td><strong>' . htmlspecialchars($s['size'] ?? '') . '</strong></td><td style="color:#ef4444; font-weight:bold;">' . htmlspecialchars($s['qty'] ?? 0) . ' tires</td></tr>';
        }
        $sizesHtml .= '</table>';

        // 2. Email to Tony & Developer (Full Details)
        $headersFull  = "MIME-Version: 1.0\r\n";
        $headersFull .= "Content-type: text/html; charset=utf-8\r\n";
        $headersFull .= "From: Tony's Tire Box Wholesale <noreply@tonystirebox.com>\r\n";

        $fullBody = "<h2>📦 New Wholesale Wishlist Order {$orderId}</h2>";
        $fullBody .= "<p><strong>Buyer Name:</strong> " . htmlspecialchars($newOrder['buyerName']) . "</p>";
        if ($newOrder['companyName']) $fullBody .= "<p><strong>Company:</strong> " . htmlspecialchars($newOrder['companyName']) . "</p>";
        $fullBody .= "<p><strong>Phone:</strong> <a href=\"tel:{$newOrder['phone']}\">" . htmlspecialchars($newOrder['phone']) . "</a></p>";
        $fullBody .= "<p><strong>Email:</strong> " . htmlspecialchars($newOrder['email']) . "</p>";
        if ($newOrder['address']) $fullBody .= "<p><strong>Shipping Address/Zip:</strong> " . htmlspecialchars($newOrder['address']) . "</p>";
        if ($newOrder['notes']) $fullBody .= "<p><strong>Notes/Instructions:</strong> " . htmlspecialchars($newOrder['notes']) . "</p>";
        $fullBody .= "<h3>Requested Tires List (Total: {$newOrder['totalTires']} tires):</h3>";
        $fullBody .= $sizesHtml;

        @mail('Tony@tonystirebox.com', "New Wholesale Wishlist Order {$orderId} - " . $newOrder['buyerName'], $fullBody, $headersFull);
        @mail('adeelshare1243@gmail.com', "New Wholesale Wishlist Order {$orderId} - " . $newOrder['buyerName'], $fullBody, $headersFull);

        // 3. Email to Supplier (DOUBLE-BLIND PRIVACY - NO BUYER CONTACT INFO)
        $supplierEmail = !empty($config['supplierEmail']) ? $config['supplierEmail'] : '';
        if ($supplierEmail) {
            $headersSupplier  = "MIME-Version: 1.0\r\n";
            $headersSupplier .= "Content-type: text/html; charset=utf-8\r\n";
            $headersSupplier .= "From: Tony's Tire Box <orders@tonystirebox.com>\r\n";

            $supplierBody = "<h2>📦 Wholesale Tire Availability Request (Ref ID: {$orderId})</h2>";
            $supplierBody .= "<p>Hello! Tony's Tire Box is requesting stock availability and quote for the following tire sizes list (Total: {$newOrder['totalTires']} tires):</p>";
            $supplierBody .= $sizesHtml;
            $supplierBody .= "<br/><p>Please reply to Tony's Tire Box with what sizes & quantities you can fulfill from this list and your best tier pricing.</p>";
            $supplierBody .= "<p>Thank you,<br/><strong>Tony's Tire Box Wholesale Team</strong></p>";

            @mail($supplierEmail, "Stock Quote Request Ref {$orderId} - Tony's Tire Box", $supplierBody, $headersSupplier);
        }

        echo json_encode([
            'success' => true,
            'orderId' => $orderId,
            'message' => 'Wholesale wishlist submitted successfully!'
        ]);
        exit(0);
    }

    echo json_encode(['success' => false, 'error' => 'Invalid order data']);
    exit(0);
}
