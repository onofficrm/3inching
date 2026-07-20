<?php
include_once dirname(__DIR__, 2) . '/common.php';
include_once G5_PATH . '/lib/hospitel-api.lib.php';

hospitel_api_cors_headers();

$type = isset($_GET['type']) ? preg_replace('/[^a-z]/i', '', (string) $_GET['type']) : 'blog';
if (!in_array($type, array('blog', 'cases'), true)) {
    $type = 'blog';
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $items = hospitel_content_read($type);
    $id = isset($_GET['id']) ? trim((string) $_GET['id']) : '';
    if ($id !== '') {
        foreach ($items as $item) {
            if (!is_array($item)) {
                continue;
            }
            $item_id = isset($item['id']) ? (string) $item['id'] : '';
            if ($item_id === $id || (string) (isset($item['slug']) ? $item['slug'] : '') === $id) {
                hospitel_api_json(array('ok' => true, 'item' => $item));
            }
        }
        hospitel_api_json(array('ok' => false, 'error' => 'not found'), 404);
    }
    hospitel_api_json(array('ok' => true, 'items' => $items));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    hospitel_api_json(array('ok' => false, 'error' => 'Method not allowed'), 405);
}

hospitel_api_rate_limit('admin', 5, false);

$body = hospitel_api_read_json_body();
if ($body === null) {
    hospitel_api_json(array('ok' => false, 'error' => 'JSON required'), 400);
}

$token = '';
if (isset($_SERVER['HTTP_X_HOSPITEL_TOKEN'])) {
    $token = (string) $_SERVER['HTTP_X_HOSPITEL_TOKEN'];
} elseif (isset($body['token'])) {
    $token = (string) $body['token'];
}

if (!hospitel_admin_token_ok($token)) {
    hospitel_api_json(array('ok' => false, 'error' => 'unauthorized'), 401);
}

$action = isset($body['action']) ? (string) $body['action'] : 'upsert';
$items = hospitel_content_read($type);

if ($action === 'replace' && isset($body['items']) && is_array($body['items'])) {
    if (!hospitel_content_write($type, $body['items'])) {
        hospitel_api_json(array('ok' => false, 'error' => 'write failed'), 500);
    }
    hospitel_api_rate_limit('admin', 5, true);
    hospitel_api_json(array('ok' => true, 'items' => $body['items']));
}

$item = isset($body['item']) && is_array($body['item']) ? $body['item'] : null;
if ($item === null) {
    hospitel_api_json(array('ok' => false, 'error' => 'item required'), 400);
}

if (empty($item['id'])) {
    $item['id'] = (string) time();
}
$item['updated_at'] = date('c');

$found = false;
foreach ($items as $i => $row) {
    if (!is_array($row)) {
        continue;
    }
    if ((string) (isset($row['id']) ? $row['id'] : '') === (string) $item['id']) {
        $items[$i] = array_merge($row, $item);
        $found = true;
        break;
    }
}
if (!$found) {
    if (empty($item['created_at'])) {
        $item['created_at'] = date('c');
    }
    array_unshift($items, $item);
}

if (!hospitel_content_write($type, $items)) {
    hospitel_api_json(array('ok' => false, 'error' => 'write failed'), 500);
}

hospitel_api_rate_limit('admin', 5, true);
hospitel_api_json(array('ok' => true, 'item' => $item, 'items' => $items));
