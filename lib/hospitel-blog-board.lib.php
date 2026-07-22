<?php
/**
 * 병마장 블로그용 column 게시판 보장
 */
if (!defined('_GNUBOARD_')) {
    exit;
}

if (!function_exists('hospitel_blog_bo_table')) {
    function hospitel_blog_bo_table()
    {
        return 'column';
    }
}

if (!function_exists('hospitel_ensure_blog_board')) {
    /**
     * column 게시판이 없으면 생성 (onoff-column 스킨, 회원 글쓰기)
     *
     * @return array{ok:bool,created?:bool,message:string,bo_table?:string,board_url?:string,write_url?:string}
     */
    function hospitel_ensure_blog_board()
    {
        global $g5;

        $bo_table = hospitel_blog_bo_table();
        $exists = sql_fetch(" select bo_table, bo_subject from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
        if (!empty($exists['bo_table'])) {
            return array(
                'ok'        => true,
                'created'   => false,
                'message'   => '이미 블로그 게시판(column)이 있습니다.',
                'bo_table'  => $bo_table,
                'board_url' => G5_BBS_URL . '/board.php?bo_table=' . rawurlencode($bo_table),
                'write_url' => G5_BBS_URL . '/write.php?bo_table=' . rawurlencode($bo_table),
            );
        }

        if (!function_exists('icrm_member_board_create_table')) {
            if (is_file(G5_LIB_PATH . '/icrm-member-board.lib.php')) {
                include_once G5_LIB_PATH . '/icrm-member-board.lib.php';
            }
        }
        if (!function_exists('icrm_member_board_create_table')) {
            return array('ok' => false, 'message' => '게시판 생성 라이브러리를 불러올 수 없습니다.');
        }

        $skin = 'onoff-column';
        if (!is_dir(G5_SKIN_PATH . '/board/' . $skin)) {
            $skin = 'basic';
        }

        $gr_id = 'community';
        $gr = sql_fetch(" select gr_id from {$g5['group_table']} where gr_id = '" . sql_real_escape_string($gr_id) . "' ");
        if (empty($gr['gr_id'])) {
            $gr_row = sql_fetch(" select gr_id from {$g5['group_table']} order by gr_order, gr_id limit 1 ");
            $gr_id = !empty($gr_row['gr_id']) ? $gr_row['gr_id'] : '';
        }

        $bo_subject = '블로그';

        sql_query(" insert into {$g5['board_table']}
            set bo_table = '" . sql_real_escape_string($bo_table) . "',
                gr_id = '" . sql_real_escape_string($gr_id) . "',
                bo_subject = '" . sql_real_escape_string($bo_subject) . "',
                bo_mobile_subject = '" . sql_real_escape_string($bo_subject) . "',
                bo_device = 'both',
                bo_admin = '',
                bo_list_level = '1',
                bo_read_level = '1',
                bo_write_level = '2',
                bo_reply_level = '10',
                bo_comment_level = '1',
                bo_upload_level = '2',
                bo_download_level = '1',
                bo_html_level = '2',
                bo_link_level = '2',
                bo_count_modify = '0',
                bo_count_delete = '0',
                bo_read_point = '0',
                bo_write_point = '0',
                bo_comment_point = '0',
                bo_download_point = '0',
                bo_use_category = '0',
                bo_category_list = '',
                bo_use_sideview = '0',
                bo_use_file_content = '0',
                bo_use_secret = '0',
                bo_use_dhtml_editor = '1',
                bo_select_editor = 'smarteditor2',
                bo_use_rss_view = '1',
                bo_use_good = '0',
                bo_use_nogood = '0',
                bo_use_name = '0',
                bo_use_signature = '0',
                bo_use_ip_view = '0',
                bo_use_list_view = '0',
                bo_use_list_file = '0',
                bo_use_list_content = '1',
                bo_table_width = '100',
                bo_subject_len = '60',
                bo_mobile_subject_len = '30',
                bo_page_rows = '10',
                bo_mobile_page_rows = '10',
                bo_new = '24',
                bo_hot = '100',
                bo_image_width = '800',
                bo_skin = '" . sql_real_escape_string($skin) . "',
                bo_mobile_skin = '" . sql_real_escape_string($skin) . "',
                bo_include_head = '_head.php',
                bo_include_tail = '_tail.php',
                bo_content_head = '',
                bo_content_tail = '',
                bo_mobile_content_head = '',
                bo_mobile_content_tail = '',
                bo_insert_content = '',
                bo_gallery_cols = '4',
                bo_gallery_width = '200',
                bo_gallery_height = '150',
                bo_mobile_gallery_width = '150',
                bo_mobile_gallery_height = '120',
                bo_upload_count = '2',
                bo_upload_size = '1048576',
                bo_reply_order = '1',
                bo_use_search = '1',
                bo_order = '0',
                bo_count_write = '0',
                bo_count_comment = '0',
                bo_write_min = '0',
                bo_write_max = '0',
                bo_comment_min = '0',
                bo_comment_max = '0',
                bo_notice = '',
                bo_upload_point = '0',
                bo_use_email = '0',
                bo_use_cert = '',
                bo_use_sns = '0',
                bo_use_captcha = '0',
                bo_sort_field = '',
                bo_1_subj = '',
                bo_2_subj = '',
                bo_3_subj = '',
                bo_4_subj = '',
                bo_5_subj = '',
                bo_6_subj = '',
                bo_7_subj = '',
                bo_8_subj = '',
                bo_9_subj = '',
                bo_10_subj = '',
                bo_1 = '',
                bo_2 = '',
                bo_3 = '',
                bo_4 = '',
                bo_5 = '',
                bo_6 = '',
                bo_7 = '',
                bo_8 = '',
                bo_9 = '',
                bo_10 = '' ", false);

        $row = sql_fetch(" select bo_table from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
        if (empty($row['bo_table'])) {
            return array('ok' => false, 'message' => 'g5_board 등록에 실패했습니다.');
        }

        if (!icrm_member_board_create_table($bo_table)) {
            sql_query(" delete from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
            return array('ok' => false, 'message' => '게시판 테이블 생성에 실패했습니다. adm/sql_write.sql 을 확인하세요.');
        }

        if (function_exists('auto_comment_ensure_board_config')) {
            auto_comment_ensure_board_config($bo_table);
        }

        return array(
            'ok'        => true,
            'created'   => true,
            'message'   => '블로그 게시판(column)을 생성했습니다.',
            'bo_table'  => $bo_table,
            'board_url' => G5_BBS_URL . '/board.php?bo_table=' . rawurlencode($bo_table),
            'write_url' => G5_BBS_URL . '/write.php?bo_table=' . rawurlencode($bo_table),
        );
    }
}
