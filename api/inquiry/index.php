<?php
/**
 * SPA 문의 접수 — JSON → inquiry 게시판 (proc/inquiry-submit 로직 재사용)
 */
include_once dirname(__DIR__, 2) . '/common.php';
include_once G5_PATH . '/lib/hospitel-api.lib.php';

if (is_file(G5_PATH . '/_site.config.php')) {
    include_once G5_PATH . '/_site.config.php';
}

hospitel_api_cors_headers();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = bin2hex(random_bytes(16));
    set_session('onoff_inquiry_token', $token);
    hospitel_api_json(array('token' => $token));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    hospitel_api_json(array('success' => false, 'message' => '잘못된 요청입니다.'), 405);
}

hospitel_api_rate_limit('inquiry', 60, false);

$body = hospitel_api_read_json_body();
if ($body === null) {
    hospitel_api_json(array('success' => false, 'message' => 'JSON 본문이 필요합니다.'), 400);
}

/* JSON → $_POST 형태로 매핑 후 기존 로직 재사용을 위해 내부 include 불가하므로 핵심 저장만 수행 */
if (!empty($body['website_url'])) {
    hospitel_api_json(array('success' => false, 'message' => '접수할 수 없습니다.'));
}

$token = isset($body['token']) ? trim((string) $body['token']) : '';
$session_token = get_session('onoff_inquiry_token');
if ($token === '' || $session_token === '' || $token !== $session_token) {
    hospitel_api_json(array('success' => false, 'message' => '보안 토큰이 만료되었습니다. 다시 시도해 주세요.'), 403);
}

$name = isset($body['name']) ? trim(strip_tags((string) $body['name'])) : '';
$phone = isset($body['phone']) ? trim(strip_tags((string) $body['phone'])) : '';
$email = isset($body['email']) ? trim(strip_tags((string) $body['email'])) : '';
$message = isset($body['message']) ? trim(strip_tags((string) $body['message'])) : '';
$privacy_ok = !empty($body['privacy_agree']);
$referer_page = isset($body['referer_page']) ? trim(strip_tags((string) $body['referer_page'])) : '';

if ($name === '' || $phone === '' || $message === '') {
    hospitel_api_json(array('success' => false, 'message' => '이름, 연락처, 문의내용을 입력해 주세요.'), 400);
}
if (!$privacy_ok) {
    hospitel_api_json(array('success' => false, 'message' => '개인정보 수집·이용에 동의해 주세요.'), 400);
}
$digits = preg_replace('/[^0-9]/', '', $phone);
if (strlen($digits) < 9 || strlen($digits) > 15) {
    hospitel_api_json(array('success' => false, 'message' => '연락처 형식을 확인해 주세요.'), 400);
}
$msg_len = function_exists('mb_strlen') ? mb_strlen($message, 'UTF-8') : strlen($message);
if ($msg_len < 10) {
    hospitel_api_json(array('success' => false, 'message' => '문의내용을 10자 이상 입력해 주세요.'), 400);
}

$bo_table = function_exists('g5site_cfg') ? g5site_cfg('inquiry_bo_table', 'inquiry') : 'inquiry';
$bo_table = preg_replace('/[^a-z0-9_]/i', '', $bo_table);
if ($bo_table === '') {
    $bo_table = 'inquiry';
}

$board = sql_fetch(" select * from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
if (empty($board['bo_table'])) {
    /* 게시판 미준비 시에도 파일 리드로 보존 */
    $dir = G5_DATA_PATH . '/hospitel';
    @mkdir($dir, G5_DIR_PERMISSION, true);
    @file_put_contents(
        $dir . '/inquiries.jsonl',
        json_encode(array(
            'created_at' => date('c'),
            'name' => $name,
            'phone' => $phone,
            'email' => $email,
            'message' => $message,
            'referer_page' => $referer_page,
            'ip' => hospitel_api_client_ip(),
        ), JSON_UNESCAPED_UNICODE) . "\n",
        FILE_APPEND | LOCK_EX
    );
    set_session('onoff_inquiry_token', '');
    hospitel_api_rate_limit('inquiry', 60, true);
    hospitel_api_json(array(
        'success' => true,
        'message' => '문의가 접수되었습니다. 확인 후 연락드리겠습니다.',
        'fallback' => true,
    ));
}

$write_table = $g5['write_prefix'] . $bo_table;
$privacy = '동의';
$wr_subject_raw = '[상담] ' . $name;
if (function_exists('cut_str')) {
    $wr_subject_raw = cut_str($wr_subject_raw, 255);
}
$wr_content = "■ 상담 문의 (병마장 SPA)\n\n이름: {$name}\n연락처: {$phone}\n";
if ($email !== '') {
    $wr_content .= "이메일: {$email}\n";
}
$wr_content .= "개인정보 동의: {$privacy}\n";
if ($referer_page !== '') {
    $wr_content .= "접수 페이지: {$referer_page}\n";
}
$wr_content .= "\n--- 문의내용 ---\n\n" . $message;

$wr_subject = sql_real_escape_string($wr_subject_raw);
$wr_content_sql = sql_real_escape_string($wr_content);
$wr_name = sql_real_escape_string($name);
$wr_email_sql = $email !== '' ? sql_real_escape_string($email) : '';
$wr_1 = sql_real_escape_string($phone);
$wr_ip = sql_real_escape_string(hospitel_api_client_ip());
$mb_id_sql = isset($member['mb_id']) ? sql_real_escape_string($member['mb_id']) : '';

$sql = " insert into {$write_table}
            set wr_num = (SELECT IFNULL(MIN(wr_num) - 1, -1) FROM {$write_table} as sq),
                 wr_reply = '',
                 wr_comment = 0,
                 ca_name = '',
                 wr_option = '',
                 wr_subject = '{$wr_subject}',
                 wr_content = '{$wr_content_sql}',
                 wr_seo_title = '',
                 wr_link1 = '',
                 wr_link2 = '',
                 wr_link1_hit = 0,
                 wr_link2_hit = 0,
                 wr_hit = 0,
                 wr_good = 0,
                 wr_nogood = 0,
                 mb_id = '{$mb_id_sql}',
                 wr_password = '',
                 wr_name = '{$wr_name}',
                 wr_email = '{$wr_email_sql}',
                 wr_homepage = '',
                 wr_datetime = '" . G5_TIME_YMDHIS . "',
                 wr_file = 0,
                 wr_last = '" . G5_TIME_YMDHIS . "',
                 wr_ip = '{$wr_ip}',
                 wr_1 = '{$wr_1}',
                 wr_2 = '{$wr_email_sql}',
                 wr_3 = '" . sql_real_escape_string($referer_page) . "',
                 wr_4 = '" . sql_real_escape_string($privacy) . "',
                 wr_5 = '{$wr_ip}',
                 wr_6 = '신규' ";
sql_query($sql);
$wr_id = sql_insert_id();

if ($wr_id && function_exists('sql_query')) {
    sql_query(" update {$write_table} set wr_parent = '{$wr_id}' where wr_id = '{$wr_id}' ");
    sql_query(" update {$g5['board_table']} set bo_count_write = bo_count_write + 1 where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
}

if (is_file(G5_PATH . '/components/inquiry-notifier.php')) {
    include_once G5_PATH . '/components/inquiry-notifier.php';
    if (function_exists('onoff_inquiry_notify')) {
        @onoff_inquiry_notify(array(
            'name' => $name,
            'phone' => $phone,
            'email' => $email,
            'message' => $message,
            'bo_table' => $bo_table,
            'wr_id' => $wr_id,
        ));
    }
}

set_session('onoff_inquiry_token', '');
hospitel_api_rate_limit('inquiry', 60, true);

$thanks = function_exists('g5site_cfg') ? g5site_cfg('inquiry_thanks_url', '') : '';
hospitel_api_json(array(
    'success' => true,
    'message' => '문의가 접수되었습니다. 확인 후 연락드리겠습니다.',
    'redirect_url' => $thanks,
));
