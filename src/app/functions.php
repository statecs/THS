<?php
/**
 * @package WordPress
 * @subpackage Default_Theme
 */
/** 2016 -> **/

/*
 *
 *  FILE STRUCTURE:
 *
 *  1. ADD \ REGISTER MENUS
 *  2. ADD PAGE TEMPLATES
 *  4. ADD REQUIRED PLUGINS
 *  5. REWRITE PERMALINK
 *  6. ADD \ REMOVE ACTIONS
 *  7. ADD FRONT PAGE ENDPOINT
*/
 /* ------------
    2. ADD \ REGISTER MENUS
    --------------- */
    register_nav_menus( array(
        'header_menu' => 'Main Menu',
        'footer_menu' => 'Footer Menu',
    ) );

/* ------------
    3. ADD PAGE TEMPLATES
    Custom Page Templates can be added quickly in the array under $templates.
    When adding a custom template, angular will look for an html file in the directory
    ./partials/pages/
    For example if you add:
    'template-example' => 'Template Example"
    You will need to place your template html in:
    ./partials/pages/template-example.html
    In that file you can call all of the page information using {{post}}
    For Example: {{post.title.rendered}} will display the title
    --------------- */
    add_filter( 'custom_page_templates', function( $now_templates ) {
        $templates = array(
            'home-page'  => 'Home Page',
            'template-a' => 'Template A',
            'template-b' => 'Template B' ,
            'template-c' => 'Template C' ,
        );
        return array_merge( $now_templates, $templates );
    } );
    function get_custom_page_templates() {
        $templates = array();
        return apply_filters( 'custom_page_templates', $templates );
    }
    function custom_page_templates_init() {
        remove_action( current_filter(), __FUNCTION__ );
        if ( is_admin() && get_current_screen()->post_type === 'page' ) {
            $templates = get_custom_page_templates(); // the function above
            if ( ! empty( $templates ) )  {
                set_custom_page_templates( $templates );
            }
        }
    }
    function custom_page_templates_init_post() {
        remove_action( current_filter(), __FUNCTION__ );
        $method = filter_input( INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_STRING );
        if ( empty( $method ) || strtoupper( $method ) !== 'POST' ) return;
        if ( get_current_screen()->post_type === 'page' ) {
            custom_page_templates_init();
        }
    }
    function set_custom_page_templates( $templates = array() ) {
        if ( ! is_array( $templates ) || empty( $templates ) ) return;
        $core = array_flip( (array) get_page_templates() ); // templates defined by file
        $data = array_filter( array_merge( $core, $templates ) );
        ksort( $data );
        $stylesheet = get_stylesheet();
        $hash = md5( get_theme_root( $stylesheet ) . '/' . $stylesheet );
        $persistently = apply_filters( 'wp_cache_themes_persistently', false, 'WP_Theme' );
        $exp = is_int( $persistently ) ? $persistently : 1800;
        wp_cache_set( 'page_templates-' . $hash, $data, 'themes', $exp );
    }
     /* ------------
    4. ADD REQUIRED PLUGINS
    --------------- */
    function required_plugins() {
        $plugin_error_message = array();
        include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
        // Require the WP Rest API V2 Plugin
        if(!is_plugin_active( 'rest-api/plugin.php' )) {
            $plugin_error_message[] = 'This theme requires you to install the WP Rest API V2 plugin, <a href="https://wordpress.org/plugins/rest-api/">download it from here</a>.';
        }
        // Require the WP API Menus Plugin
        if(!is_plugin_active( 'wp-api-menus/wp-api-menus.php' )) {
            $plugin_error_message[] = 'This theme requires you to install the WP API Menus plugin, <a href="http://wordpress.org/plugins/wp-api-menus/">download it from here</a>.';
        }
        if(count($plugin_error_message) > 0) {
            echo '<div id="message" class="error">';
            foreach($plugin_error_message as $message) {
                echo '<p><strong>'.$message.'</strong></p>';
            }
            echo '</div>';
        }
    }

     /* ------------
    6. ADD \ REMOVE ACTIONS
    --------------- */
    add_action( 'edit_form_after_editor', 'custom_page_templates_init' );
    add_action( 'load-post.php', 'custom_page_templates_init_post' );
    add_action( 'load-post-new.php', 'custom_page_templates_init_post' );


function my_rest_prepare_post( $data, $post, $request ) {
    $_data = $data->data;
    $thumbnail_id = get_post_thumbnail_id( $post->ID );
    $thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'full' );
    $_data['featured_image_thumbnail_url'] = $thumbnail[0];
    $data->data = $_data;
    return $data;
}
add_filter( 'rest_prepare_post', 'my_rest_prepare_post', 10, 3 );


// Sticky posts in REST - https://github.com/WP-API/WP-API/issues/2210
function get_sticky_posts() {
    $posts = get_posts(
        array(
            'post__in' => get_option('sticky_posts')
        )
    );
    if (empty($posts)) {
        return null;
    }

    return $posts;
}
add_action( 'rest_api_init', function () {
    register_rest_route( 'wp/v2', '/sticky', array(
        'methods' => 'GET',
        'callback' => 'get_sticky_posts',
    ));
});

?>