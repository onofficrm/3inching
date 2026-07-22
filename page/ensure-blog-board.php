<?php
/**
 * 최고관리자 전용 — 블로그(column) 게시판 생성
 * 접속: /page/ensure-blog-board.php
 */
include_once '../common.php';

if ($is_admin !== 'super') {
    alert('최고관리자만 실행할 수 있습니다.', G5_URL);
}

include_once G5_LIB_PATH . '/hospitel-blog-board.lib.php';
$result = hospitel_ensure_blog_board();

$msg = isset($result['message']) ? $result['message'] : '완료';
if (!empty($result['ok'])) {
    $board_url = isset($result['board_url']) ? $result['board_url'] : (G5_BBS_URL . '/board.php?bo_table=column');
    $write_url = isset($result['write_url']) ? $result['write_url'] : (G5_BBS_URL . '/write.php?bo_table=column');
    alert($msg . "\\n목록: {$board_url}\\n글쓰기: {$write_url}", $write_url);
}

alert('실패: ' . $msg, G5_URL);
