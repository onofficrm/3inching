<?php
$route = isset($_GET['r']) ? preg_replace('/[^a-z0-9\/_-]/i', '', (string) $_GET['r']) : '';
$meta = array(
    '' => array('title' => '병마장 - 환자가 제 발로 찾아오는 시스템', 'desc' => '실제 클라이언트 사례로 보는 병원 마케팅.'),
    'blog' => array('title' => '인사이트 블로그 | 병마장', 'desc' => '병원 마케팅 인사이트'),
    'privacy' => array('title' => '개인정보처리방침 | 병마장', 'desc' => '병마장 개인정보처리방침'),
    'terms' => array('title' => '이용약관 | 병마장', 'desc' => '병마장 이용약관'),
);
$m = isset($meta[$route]) ? $meta[$route] : $meta[''];
$file = dirname(__FILE__) . '/plugin/onoff-builder-bridge/imports/hospitel/index.html';
if (!is_file($file)) {
    header('Location: /');
    exit;
}
$html = file_get_contents($file);
$title = htmlspecialchars($m['title'], ENT_QUOTES, 'UTF-8');
$desc = htmlspecialchars($m['desc'], ENT_QUOTES, 'UTF-8');
$html = preg_replace('#<title>.*?</title>#s', '<title>' . $title . '</title>', $html, 1);
if (strpos($html, 'name="description"') === false) {
    $html = str_replace('</title>', '</title>' . "\n    <meta name=\"description\" content=\"{$desc}\" />", $html);
}
header('Content-Type: text/html; charset=utf-8');
echo $html;
