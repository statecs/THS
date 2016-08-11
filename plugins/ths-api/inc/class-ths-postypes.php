<?php
/**
* Postypes class
*
* @author statecs
*/

add_action( 'init', 'codex_event_init' );

/**
 * Register a event post type.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_post_type
 */
function codex_event_init() {
    $labels = array(
        'name'               => _x( 'Events', 'post type general name', 'your-plugin-textdomain' ),
        'singular_name'      => _x( 'Event', 'post type singular name', 'your-plugin-textdomain' ),
        'menu_name'          => _x( 'Events', 'admin menu', 'your-plugin-textdomain' ),
        'name_admin_bar'     => _x( 'Event', 'add new on admin bar', 'your-plugin-textdomain' ),
        'add_new'            => _x( 'Add Event', 'event', 'your-plugin-textdomain' ),
        'add_new_item'       => __( 'Add New Event', 'your-plugin-textdomain' ),
        'new_item'           => __( 'New Event', 'your-plugin-textdomain' ),
        'edit_item'          => __( 'Edit Event', 'your-plugin-textdomain' ),
        'view_item'          => __( 'View Event', 'your-plugin-textdomain' ),
        'all_items'          => __( 'All Events', 'your-plugin-textdomain' ),
        'search_items'       => __( 'Search Events', 'your-plugin-textdomain' ),
        'parent_item_colon'  => __( 'Parent Event:', 'your-plugin-textdomain' ),
        'not_found'          => __( 'No events found.', 'your-plugin-textdomain' ),
        'not_found_in_trash' => __( 'No events found in Trash.', 'your-plugin-textdomain' )
    );
 
    $args = array(
        'labels'             => $labels,
                'description'        => __( 'Description.', 'your-plugin-textdomain' ),
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'event' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
    );
 
    register_post_type( 'event', $args );
}
function wpsd_add_event_args() {
    global $wp_post_types;
 
    $wp_post_types['event']->show_in_rest = true;
    $wp_post_types['event']->rest_base = 'event';
    $wp_post_types['event']->rest_controller_class = 'WP_REST_Posts_Controller';
}
add_action( 'init', 'wpsd_add_event_args', 30 );

/*
function sb_add_cpts_to_api() {
    global $wp_post_types;
    
    // Add CPT slugs here
    $arr = ['fake','movie','events'];
    
    foreach( $arr as $key ) {
        
    // If the post type doesn't exist, skip it
    if( !$wp_post_types[$key] )
        continue;
            
        $wp_post_types[$key]->show_in_rest = true;
    $wp_post_types[$key]->rest_base = $key;
    }
}
add_action( 'init', 'sb_add_cpts_to_api', 30 );

*/
/*class THS_Postypes {


}*/
