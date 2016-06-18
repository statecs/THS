/**
 * The BlogService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function BlogService($http, $sce, config) {

    function allPosts() {
        return getData('wp/v2/posts?per_page=20');
    }

    function allPostsByTag(tag) {
        // getData('wp/v2/posts?filter[category_name]=post&filter[tag]=' + tag);
        getData('wp/v2/posts?filter[s]=post&filter[tag]=' + tag);
    }

    function allPostsBySearchTerm(searchTerm) {
        return getData('wp/v2/posts?per_page=20&filter[s]=' + searchTerm);
    }

    function featuredPosts() {
        return getData('wp/v2/sticky');
    }

    function post(id) {
        return getData('wp/v2/posts/' + id);
    }

    function getData(url) {
        return $http
            .get(config.API_URL + url, { cache: true })
            .then(function(response) {
                if (response.data instanceof Array) {
                    var items = response.data.map(function(item) {
                        return decorateResult(item);
                    });
                    return items;
                } else {
                    return decorateResult(response.data);
                }
            });
    }

    /**
     * Decorate a post to make it play nice with AngularJS
     * @param result
     * @returns {*}
     */
    function decorateResult(result) {
        result.excerpt = $sce.trustAsHtml(result.excerpt.rendered);
        result.date = Date.parse(result.date);
        result.content = $sce.trustAsHtml(result.content.rendered);
        return result;
    }

    return {
        allPosts: allPosts,
        allPostsByTag: allPostsByTag,
        allPostsBySearchTerm: allPostsBySearchTerm,
        featuredPosts: featuredPosts,
        post: post
    };
}

angular
    .module('app')
    .factory('BlogService', BlogService);