<?php
include_once dirname(__DIR__, 2) . '/common.php';
include_once G5_PATH . '/lib/hospitel-api.lib.php';

hospitel_api_cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    hospitel_api_json(array('error' => 'POST only'), 405);
}

hospitel_api_rate_limit('chat', 8, false);

$body = hospitel_api_read_json_body();
if ($body === null) {
    hospitel_api_json(array('error' => 'JSON body required'), 400);
}

$message = isset($body['message']) ? (string) $body['message'] : '';
$history = isset($body['history']) && is_array($body['history']) ? $body['history'] : array();

$result = hospitel_gemini_chat($message, $history);
hospitel_api_rate_limit('chat', 8, true);

if (empty($result['ok'])) {
    hospitel_api_json(array('error' => $result['message']), 500);
}

hospitel_api_json(array('text' => $result['text']));
