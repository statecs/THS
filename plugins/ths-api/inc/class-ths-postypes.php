<?php
/**
* Postypes class
*
* @author statecs
*/

add_action( 'init', 'codex_document_init' );

/**
 * Register a document post type.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_post_type
 */
function codex_document_init() {
    $labels = array(
        'name'               => _x( 'Meeting documents', 'ths_documents' ),
        'singular_name'      => _x( 'Documents', 'ths_documents'),
        'menu_name'          => _x( 'Meeting documents', 'ths_documents' ),
        'name_admin_bar'     => _x( 'Documents', 'ths_documents'),
        'add_new'            => _x( 'Add Document', 'ths_documents' ),
        'add_new_item'       => __( 'Add New Document', 'ths_documents' ),
        'new_item'           => __( 'New Document', 'ths_documents' ),
        'edit_item'          => __( 'Edit Document', 'ths_documents' ),
        'view_item'          => __( 'View Document', 'ths_documents' ),
        'all_items'          => __( 'All Documents', 'ths_documents' ),
        'search_items'       => __( 'Search Documents', 'ths_documents' ),
        'parent_item_colon'  => __( 'Parent Document:', 'ths_documents' ),
        'not_found'          => __( 'No documents found.', 'ths_documents' ),
        'not_found_in_trash' => __( 'No documents found in Trash.', 'ths_documents' )
    );
 
    $args = array(
        'labels'             => $labels,
         'description'        => __( 'Description.', 'ths_documents' ),
        'public'             => true,
        'taxonomies' => array('category'),
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'documents' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => true,
        'menu_position'      => null,
        'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments', 'page-attributes' )
    );
 
    register_post_type( 'documents', $args );
}
function wpsd_add_event_args() {
    global $wp_post_types;
 
    $wp_post_types['documents']->show_in_rest = true;
    $wp_post_types['documents']->rest_base = 'documents';
    $wp_post_types['documents']->rest_controller_class = 'WP_REST_Posts_Controller';
}
add_action( 'init', 'wpsd_add_event_args', 30 );
