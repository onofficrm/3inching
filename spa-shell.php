<?php
/**
 * SPA 딥링크용 정적 셸 — 검색엔진에 title/description 제공 후 빌더 HTML 출력
 * 사용: /cases.page 등으로 rewrite 하거나 직접 호출
 */
$route = isset($_GET['r']) ? preg_replace('/[^a-z0-9\/_-]/i', '', (string) $_GET['r']) : '';
$meta = array(
    '' => array('title' => '병마장 - 병원 전문 마케팅 컨설팅', 'desc' => '병원 마케팅 전문 에이전시 병마장.'),
    'cases' => array('title' => '성공 사례 | 병마장', 'desc' => '병마장 병원 마케팅 실제 성공 사례'),
    'services' => array('title' => '서비스 | 병마장', 'desc' => 'SEO·GEO, 미디어, 커뮤니티, 지역키워드'),
    'guide' => array('title' => '상품 선택 가이드 | 병마장', 'desc' => '병원에 맞는 마케팅 상품 선택 가이드'),
    'blog' => array('title' => '인사이트 블로그 | 병마장', 'desc' => '병원 마케팅 인사이트'),
    'contact' => array('title' => '상담 신청 | 병마장', 'desc' => '병마장 상담 신청'),
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
