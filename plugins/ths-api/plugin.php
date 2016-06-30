<?php
/*
 * Plugin Name: THS API
 * Plugin URI:
 * Description: JSON endpoint and shortcode for THS Website
 * Version: 1.0
 * Author: statecs
 * Author URI: http://statecreative.se
 * License: MIT
 */

/*
 *
 *  FILE STRUCTURE:
 *
 *  1. WP-API
 *  2. CUSTOM ENDPOINTS
 *  3. ADD \ REGISTER MENUS
 *  4. ADD PAGE TEMPLATES
 *  5. ADD \ REMOVE ACTIONS
 *  6. ADD REQUIRED PLUGINS
*/

/**
* Shortcode
*/

/* include static class */
include_once( __DIR__.'/inc/class-ths-postypes.php' );
/* add_shortcode('dummy', array( 'THS_Shortcode', 'seances') );
add_filter('get_the_excerpt', 'do_shortcode', 99);*/

add_filter( 'rest_url_prefix', function( $prefix ) { return 'api'; } );

/**
* 1. WP API
*/

/* include static class */
include_once( __DIR__.'/inc/class-ths-api.php' );

/**
 * Only from certain origins
 */
add_action( 'rest_api_init', function() {

	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	add_filter( 'rest_pre_serve_request', function( $value ) {

		$origin = get_http_origin();
		if ( $origin && in_array( $origin, array(
				//define some origins!
				   'http://ths.kth.se',
        			'http://dev.ths.kth.se',
        			'http://localhost:3000',
			) ) ) {
			header( 'Access-Control-Allow-Origin: ' . esc_url_raw( $origin ) );
			header( 'Access-Control-Allow-Methods: GET' );
			header( 'Access-Control-Allow-Credentials: true' );
		}

		return $value;
		
	});
}, 15 );

/**
* 2. CUSTOM ENDPOINTS
*/
add_action( 'rest_api_init', function () {
    register_rest_route( 'wp/v2', '/sticky', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => array('THS_API', 'get_sticky_posts'),
    ));
});


add_action( 'rest_api_init', function () {
    register_rest_route( 'wp/v2', '/post', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => array('THS_API', 'get_posts_from_url'),
        'args'     => array(
			'url' => array( 'required' => true )
		),
    ));
});

 /* ------------
  3. ADD \ REGISTER MENUS
 --------------- */
    register_nav_menus( array(
        'header_menu' => 'Main Menu',
        'footer_menu' => 'Footer Menu',
    ) );


/* ------------
    4. ADD PAGE TEMPLATES
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


function my_rest_prepare_post( $data, $post, $request ) {
	$_data = $data->data;
	$thumbnail_id = get_post_thumbnail_id( $post->ID );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'full' );
	$_data['featured_image_thumbnail_url'] = $thumbnail[0];
	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_post', 'my_rest_prepare_post', 10, 3 );


/* Remove X-Pingback in the HTTP header */
add_filter('wp_headers', function($headers) {
    unset($headers['X-Pingback']);
    return $headers;
});

/* Remove link to Rest API in the HTTP header */
remove_action( 'template_redirect', 'rest_output_link_header', 11, 0 );


/* ------------
    5. ADD \ REMOVE ACTIONS
--------------- */
    add_action( 'edit_form_after_editor', 'custom_page_templates_init' );
    add_action( 'load-post.php', 'custom_page_templates_init_post' );
    add_action( 'load-post-new.php', 'custom_page_templates_init_post' );

/* ------------
    6. ADD REQUIRED PLUGINS
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