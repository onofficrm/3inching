<?php
/**
 * 병마장(hospitel) SPA API 공통 — Gemini, rate limit, JSON, content store
 */
if (!defined('_GNUBOARD_')) {
    exit;
}

if (!function_exists('hospitel_api_json')) {
    function hospitel_api_json($payload, $status = 200)
    {
        http_response_code((int) $status);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        echo json_encode($payload, JSON_UNESCAPED_UNICODE);
        exit;
    }
}

if (!function_exists('hospitel_api_read_json_body')) {
    function hospitel_api_read_json_body()
    {
        $raw = file_get_contents('php://input');
        $body = json_decode((string) $raw, true);
        return is_array($body) ? $body : null;
    }
}

if (!function_exists('hospitel_api_cors_headers')) {
    function hospitel_api_cors_headers()
    {
        header('Access-Control-Allow-Origin: ' . (defined('G5_URL') ? G5_URL : '*'));
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-Hospitel-Token');
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}

if (!function_exists('hospitel_api_client_ip')) {
    function hospitel_api_client_ip()
    {
        return isset($_SERVER['REMOTE_ADDR']) ? trim((string) $_SERVER['REMOTE_ADDR']) : '';
    }
}

if (!function_exists('hospitel_api_rate_limit')) {
    /**
     * @param string $bucket  chat|recommend|inquiry|diagnosis|admin
     * @param int    $seconds
     * @param bool   $record
     */
    function hospitel_api_rate_limit($bucket, $seconds = 20, $record = false)
    {
        $ip = hospitel_api_client_ip();
        if ($ip === '' || !defined('G5_DATA_PATH')) {
            return;
        }

        $dir = G5_DATA_PATH . '/cache';
        if (!is_dir($dir) && !@mkdir($dir, G5_DIR_PERMISSION, true)) {
            return;
        }

        $file = $dir . '/hospitel_' . preg_replace('/[^a-z0-9_]/i', '', $bucket) . '_' . md5($ip) . '.txt';
        $now = time();

        if (is_file($file) && is_readable($file)) {
            $last = (int) @file_get_contents($file);
            if ($last > 0 && ($now - $last) < (int) $seconds) {
                hospitel_api_json(array('error' => '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.'), 429);
            }
        }

        if ($record && is_writable($dir)) {
            @file_put_contents($file, (string) $now, LOCK_EX);
        }
    }
}

if (!function_exists('hospitel_gemini_api_key')) {
    function hospitel_gemini_api_key()
    {
        if (!function_exists('onoff_builder_config_load') && is_file(G5_PATH . '/lib/onoff-builder-config.lib.php')) {
            include_once G5_PATH . '/lib/onoff-builder-config.lib.php';
        }
        if (function_exists('onoff_builder_config_get')) {
            $key = trim((string) onoff_builder_config_get('gemini_api_key', ''));
            if ($key !== '') {
                return $key;
            }
        }
        $env = getenv('GEMINI_API_KEY');
        return ($env !== false) ? trim((string) $env) : '';
    }
}

if (!function_exists('hospitel_gemini_model')) {
    function hospitel_gemini_model()
    {
        $default = 'gemini-2.5-flash';
        if (!function_exists('onoff_builder_config_load') && is_file(G5_PATH . '/lib/onoff-builder-config.lib.php')) {
            include_once G5_PATH . '/lib/onoff-builder-config.lib.php';
        }
        if (function_exists('onoff_builder_config_get')) {
            $model = trim((string) onoff_builder_config_get('gemini_model', $default));
            return $model !== '' ? $model : $default;
        }
        return $default;
    }
}

if (!function_exists('hospitel_gemini_http_post')) {
    function hospitel_gemini_http_post($url, array $payload, $timeout = 45)
    {
        $body = json_encode($payload, JSON_UNESCAPED_UNICODE);
        if ($body === false) {
            return array('ok' => false, 'message' => '요청 JSON 인코딩 실패');
        }

        if (function_exists('curl_init')) {
            $ch = curl_init($url);
            curl_setopt_array($ch, array(
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => $body,
                CURLOPT_HTTPHEADER => array('Content-Type: application/json'),
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => (int) $timeout,
            ));
            $raw = curl_exec($ch);
            $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $err = curl_error($ch);
            curl_close($ch);

            if ($raw === false) {
                return array('ok' => false, 'message' => $err !== '' ? $err : 'API 연결 실패');
            }

            $decoded = json_decode($raw, true);
            if (!is_array($decoded)) {
                return array('ok' => false, 'message' => 'API 응답 파싱 실패', 'http_code' => $code);
            }
            if ($code < 200 || $code >= 300) {
                $message = isset($decoded['error']['message']) ? (string) $decoded['error']['message'] : 'API 오류';
                return array('ok' => false, 'message' => $message, 'http_code' => $code);
            }
            return array('ok' => true, 'data' => $decoded);
        }

        $ctx = stream_context_create(array(
            'http' => array(
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n",
                'content' => $body,
                'timeout' => (int) $timeout,
            ),
        ));
        $raw = @file_get_contents($url, false, $ctx);
        if ($raw === false) {
            return array('ok' => false, 'message' => 'API 연결 실패');
        }
        $decoded = json_decode($raw, true);
        if (!is_array($decoded)) {
            return array('ok' => false, 'message' => 'API 응답 파싱 실패');
        }
        return array('ok' => true, 'data' => $decoded);
    }
}

if (!function_exists('hospitel_gemini_extract_text')) {
    function hospitel_gemini_extract_text(array $data)
    {
        if (empty($data['candidates'][0]['content']['parts']) || !is_array($data['candidates'][0]['content']['parts'])) {
            return '';
        }
        $text = '';
        foreach ($data['candidates'][0]['content']['parts'] as $part) {
            if (isset($part['text'])) {
                $text .= (string) $part['text'];
            }
        }
        return trim($text);
    }
}

if (!function_exists('hospitel_gemini_generate')) {
    function hospitel_gemini_generate($system_instruction, $contents, array $gen_config = array(), $timeout = 45)
    {
        $api_key = hospitel_gemini_api_key();
        if ($api_key === '') {
            return array('ok' => false, 'message' => 'GEMINI_API_KEY가 없습니다. data/onoff-builder.config.php에 ONOFF_BUILDER_GEMINI_API_KEY를 설정하세요.');
        }

        $model = hospitel_gemini_model();
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . rawurlencode($model) . ':generateContent?key=' . rawurlencode($api_key);

        $generation = array_merge(array(
            'temperature' => 0.7,
            'maxOutputTokens' => 2048,
        ), $gen_config);

        $payload = array(
            'contents' => $contents,
            'generationConfig' => $generation,
        );
        if ($system_instruction !== '') {
            $payload['systemInstruction'] = array(
                'parts' => array(array('text' => (string) $system_instruction)),
            );
        }

        $resp = hospitel_gemini_http_post($url, $payload, $timeout);
        if (empty($resp['ok'])) {
            return $resp;
        }

        $text = hospitel_gemini_extract_text($resp['data']);
        if ($text === '') {
            return array('ok' => false, 'message' => 'AI 응답이 비어 있습니다.');
        }
        return array('ok' => true, 'text' => $text);
    }
}

if (!function_exists('hospitel_gemini_chat')) {
    function hospitel_gemini_chat($message, array $history = array())
    {
        $message = trim((string) $message);
        if ($message === '') {
            return array('ok' => false, 'message' => 'message is required');
        }

        $contents = array();
        foreach ($history as $row) {
            if (!is_array($row)) {
                continue;
            }
            $text = isset($row['text']) ? trim((string) $row['text']) : '';
            if ($text === '') {
                continue;
            }
            $contents[] = array(
                'role' => (isset($row['role']) && $row['role'] === 'user') ? 'user' : 'model',
                'parts' => array(array('text' => $text)),
            );
        }
        $contents[] = array('role' => 'user', 'parts' => array(array('text' => $message)));

        $system = "당신은 '병마장'이라는 병원 마케팅 전문 에이전시의 수석 컨설턴트입니다.\n"
            . "사용자의 병원 상황(진료과목, 지역, 현재 고민 등)을 듣고, 어떤 마케팅 전략이 필요한지 전문적이고 친절하게 진단해줍니다.\n"
            . "답변은 너무 길지 않게, 핵심을 짚어주고 다음 질문을 유도하여 2~3번의 대화 후 우리 서비스(SEO, 유튜브, 지역키워드 등)를 추천해주세요.\n"
            . "단, 무조건적인 영업보다는 실질적인 조언을 바탕으로 제안하세요.";

        return hospitel_gemini_generate($system, $contents, array('temperature' => 0.7));
    }
}

if (!function_exists('hospitel_gemini_recommend')) {
    function hospitel_gemini_recommend(array $answers)
    {
        $goal = isset($answers['goal']) ? (string) $answers['goal'] : '(미응답)';
        $problem = isset($answers['problem']) ? (string) $answers['problem'] : '(미응답)';
        $budget = isset($answers['budget']) ? (string) $answers['budget'] : '(미응답)';

        $prompt = "다음은 병원 원장님이 작성한 마케팅 고민 설문 응답입니다.\n"
            . "- 목표: {$goal}\n"
            . "- 문제점: {$problem}\n"
            . "- 예산: {$budget}\n\n"
            . "이 응답을 분석하여 우리 '병마장'의 4가지 주요 서비스 중 1~2가지를 추천하고 그 이유를 3~4줄로 설명해주세요.\n"
            . "[서비스 목록]\n"
            . "1. SEO·GEO (네이버 플레이스, 구글 검색 상위 노출)\n"
            . "2. 미디어 (유튜브 등 영상 콘텐츠 제작 및 채널 관리)\n"
            . "3. 커뮤니티 (지역 맘카페, 환자 커뮤니티 여론 형성)\n"
            . "4. 지역키워드 (세부 지역 기반 키워드 선점)\n\n"
            . "반드시 아래 JSON만 출력하세요:\n"
            . "{\n  \"recommendedServices\": [\"서비스명1\", \"서비스명2\"],\n  \"reason\": \"추천 이유 설명\"\n}";

        $contents = array(
            array('role' => 'user', 'parts' => array(array('text' => $prompt))),
        );

        $result = hospitel_gemini_generate('', $contents, array(
            'temperature' => 0.2,
            'responseMimeType' => 'application/json',
        ));

        if (empty($result['ok'])) {
            return $result;
        }

        $parsed = json_decode($result['text'], true);
        if (!is_array($parsed)) {
            return array('ok' => false, 'message' => '추천 결과 파싱 실패');
        }

        return array(
            'ok' => true,
            'recommendedServices' => isset($parsed['recommendedServices']) && is_array($parsed['recommendedServices'])
                ? $parsed['recommendedServices'] : array(),
            'reason' => isset($parsed['reason']) ? (string) $parsed['reason'] : '',
        );
    }
}

if (!function_exists('hospitel_content_runtime_dir')) {
    function hospitel_content_runtime_dir()
    {
        return G5_DATA_PATH . '/hospitel/content';
    }
}

if (!function_exists('hospitel_content_seed_dir')) {
    function hospitel_content_seed_dir()
    {
        return G5_PLUGIN_PATH . '/onoff-builder-bridge/imports/hospitel/content';
    }
}

if (!function_exists('hospitel_content_file')) {
    function hospitel_content_file($name)
    {
        $name = preg_replace('/[^a-z0-9_-]/i', '', (string) $name);
        $runtime = hospitel_content_runtime_dir() . '/' . $name . '.json';
        if (is_file($runtime)) {
            return $runtime;
        }
        $seed = hospitel_content_seed_dir() . '/' . $name . '.json';
        return $seed;
    }
}

if (!function_exists('hospitel_content_read')) {
    function hospitel_content_read($name)
    {
        $file = hospitel_content_file($name);
        if (!is_file($file) || !is_readable($file)) {
            return array();
        }
        $data = json_decode((string) file_get_contents($file), true);
        return is_array($data) ? $data : array();
    }
}

if (!function_exists('hospitel_content_write')) {
    function hospitel_content_write($name, array $data)
    {
        $dir = hospitel_content_runtime_dir();
        if (!is_dir($dir) && !@mkdir($dir, G5_DIR_PERMISSION, true)) {
            return false;
        }
        $name = preg_replace('/[^a-z0-9_-]/i', '', (string) $name);
        $file = $dir . '/' . $name . '.json';
        $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        return $json !== false && @file_put_contents($file, $json . "\n", LOCK_EX) !== false;
    }
}

if (!function_exists('hospitel_admin_token_ok')) {
    function hospitel_admin_token_ok($token)
    {
        $token = trim((string) $token);
        if ($token === '') {
            return false;
        }
        if (!function_exists('onoff_builder_config_load') && is_file(G5_PATH . '/lib/onoff-builder-config.lib.php')) {
            include_once G5_PATH . '/lib/onoff-builder-config.lib.php';
        }
        $expected = '';
        if (function_exists('onoff_builder_config_get')) {
            $expected = trim((string) onoff_builder_config_get('hospitel_admin_token', ''));
        }
        if ($expected === '' && function_exists('g5site_cfg')) {
            $expected = trim((string) g5site_cfg('hospitel_admin_token', ''));
        }
        if ($expected === '') {
            // 미설정 시 그누보드 최고관리자 세션만 허용
            global $is_admin;
            return !empty($is_admin);
        }
        return hash_equals($expected, $token);
    }
}

if (!function_exists('hospitel_diagnosis_append')) {
    function hospitel_diagnosis_append(array $row)
    {
        $dir = G5_DATA_PATH . '/hospitel';
        if (!is_dir($dir) && !@mkdir($dir, G5_DIR_PERMISSION, true)) {
            return false;
        }
        $file = $dir . '/diagnoses.jsonl';
        $line = json_encode($row, JSON_UNESCAPED_UNICODE);
        if ($line === false) {
            return false;
        }
        return @file_put_contents($file, $line . "\n", FILE_APPEND | LOCK_EX) !== false;
    }
}
