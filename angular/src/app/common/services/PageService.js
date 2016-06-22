/**
 * The PageService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function PageService($http, $sce, config) {

    function allPages() {
        return getData('wp/v2/pages?per_page=50');
    }

    function allPagesByTag(tag) {
        getData('wp/v2/pages?filter[s]=post&filter[tag]=' + tag);
    }

    function allPagesBySearchTerm(searchTerm) {
        return getData('wp/v2/pages?per_page=20&filter[s]=' + searchTerm);
    }

    function page(slug) {
        //return getData('wp/v2/pages/' + id);
        return getData('wp/v2/pages?slug=' + slug);
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
        console.log(result);
        return result;
    }

    return {
        allPages: allPages,
        allPagesByTag: allPagesByTag,
        allPagesBySearchTerm: allPagesBySearchTerm,
        page: page
    };
}

angular
    .module('app')
    .factory('PageService', PageService);