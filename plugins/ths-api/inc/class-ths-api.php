<?php
/**
* Class THS_API
*
* @author statecs
*/

class THS_API  {

  /**
  * Get a collection of items
  *
  * @param WP_REST_Request $request Full data about the request.
  * @return WP_Error|WP_REST_Response
  */
  
  public static function get_posts_from_url(  WP_REST_Request $request ) {

    //$params = $request->get_params();

    $url = $request['url'];

    $postid = url_to_postid( $url );

    $post = get_post($postid);

    // if $data empty or wp_error then return error response with 404 status code
    if ( empty( $post ) || is_wp_error( $post ) ) {
      return new WP_Error( 'rest_post_invalid_id', __( 'Invalid post id.' ), array( 'status' => 404 ) ); // new WP_REST_Response( array( ), 404 );
    }

    // foreach throught them to get relevant data and add these to response array
    $data = array();
    $data[] = self::prepare_item_for_response( $post, $request );

    // return response array + status
    return new WP_REST_Response( $data, 200 );
  }

  // Sticky posts in REST - https://github.com/WP-API/WP-API/issues/2210
  public static function get_sticky_posts() {
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

  /**
  * Prepare the item for the REST response
  *
  * @param mixed $item WordPress representation of the item.
  * @param WP_REST_Request $request Request object.
  * @return mixed
  */

  private static function prepare_item_for_response( $post, $request ) {
   // Base fields for every post.
    $postdata = array(
      'id'           => $post->ID,
      'date'         => self::prepare_date_response( $post->post_date_gmt, $post->post_date ),
      'date_gmt'     => self::prepare_date_response( $post->post_date_gmt ),
      'guid'         => array(
        'rendered' => apply_filters( 'get_the_guid', $post->guid ),
      ),
      'modified'     => self::prepare_date_response( $post->post_modified_gmt, $post->post_modified),
      'modified_gmt' => self::prepare_date_response( $post->post_modified_gmt ),
      'slug'         => $post->post_name,
      'status'       => $post->post_status,
      'type'         => $post->post_type,
      'link'         => get_permalink( $post->ID ),
      'acf'          => get_fields($post->ID),
      'template'     => get_page_template_slug( $post->ID ),
      'author'       => (int) $post->post_author,
      'comment_status'   => $post->comment_status,
      'sticky'       => is_sticky( $post->ID ),
    );

    $postdata['title'] = array(
        'rendered' => get_the_title( $post->ID ),
      );

    $postdata['content'] = array(
        /** This filter is documented in wp-includes/post-template.php */
        'rendered' => apply_filters( 'the_content', $post->post_content ),
      );

      $postdata['format'] = get_post_format( $post->ID );
      // Fill in blank post format.
      if ( empty( $postdata['format'] ) ) {
        $postdata['format'] = 'standard';
      }

      $postdata['excerpt'] = array(
        'raw'      => $post->post_excerpt,
        'rendered' => $post->post_excerpt,
      );

      $response = rest_ensure_response( $postdata );

   // $schema = WP_REST_Posts_Controller::get_item_schema();

    return $postdata;
  }

  /**
   * Check the post_date_gmt or modified_gmt and prepare any post or
   * modified date for single post output.
   *
   * @param string       $date_gmt
   * @param string|null  $date
   * @return string|null ISO8601/RFC3339 formatted datetime.
   */
  protected function prepare_date_response( $date_gmt, $date = null ) {
    // Use the date if passed.
    if ( isset( $date ) ) {
      return mysql_to_rfc3339( $date );
    }

    // Return null if $date_gmt is empty/zeros.
    if ( '0000-00-00 00:00:00' === $date_gmt ) {
      return null;
    }

    // Return the formatted datetime.
    return mysql_to_rfc3339( $date_gmt );
  }

}


