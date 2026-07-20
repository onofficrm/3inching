<?php
include_once dirname(__DIR__, 2) . '/common.php';
include_once G5_PATH . '/lib/hospitel-api.lib.php';

hospitel_api_cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    hospitel_api_json(array('error' => 'POST only'), 405);
}

hospitel_api_rate_limit('recommend', 15, false);

$body = hospitel_api_read_json_body();
if ($body === null) {
    hospitel_api_json(array('error' => 'JSON body required'), 400);
}

$answers = isset($body['answers']) && is_array($body['answers']) ? $body['answers'] : null;
if ($answers === null) {
    hospitel_api_json(array('error' => 'answers is required'), 400);
}

$result = hospitel_gemini_recommend($answers);
hospitel_api_rate_limit('recommend', 15, true);

if (empty($result['ok'])) {
    hospitel_api_json(array('error' => $result['message']), 500);
}

/* 진단 리드 저장 (영업용) */
hospitel_diagnosis_append(array(
    'type' => 'recommend',
    'created_at' => date('c'),
    'ip' => hospitel_api_client_ip(),
    'answers' => $answers,
    'recommendedServices' => $result['recommendedServices'],
    'reason' => $result['reason'],
));

hospitel_api_json(array(
    'recommendedServices' => $result['recommendedServices'],
    'reason' => $result['reason'],
));
