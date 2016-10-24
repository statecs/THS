/**
 * The ApiService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function ApiService($http, $rootScope, $sce, $state, config, spinnerService, alertify, ngProgressFactory, $location, $timeout, CacheFactory) {


    $rootScope.progressbar = ngProgressFactory.createInstance();


    function allDocuments() {
        return getData('wp/v2/documents?per_page=100');
    }

    function documentBySlug(title) {
        return getData('wp/v2/documents?slug=' + title);
    }

    function allPosts() {
        return getData('wp/v2/posts?per_page=20');
    }

    function allPostsBySearchTag(searchTerm) {
        return getData('wp/v2/posts?per_page=20&filter[tag]=' + searchTerm);
    }

    function allPostsBySearchCategory(searchTerm) {
        return getData('wp/v2/posts?per_page=20&filter[category_name]=' + searchTerm);
    }

    function allPostsBySearchTerm(searchTerm) {
        return getData('wp/v2/posts?per_page=20&filter[s]=' + searchTerm);
    }

    function featuredPosts() {
        return getData('wp/v2/sticky');
    }

    function postById(id) {
        return getData('wp/v2/posts/' + id);
    }

    function postByURL(url) {
        return getData('wp/v2/post' + url);
    }

    function getData(url) {
        $rootScope.progressbar.start();
        $rootScope.progressbar.setColor('#fff');
        var apiCache = CacheFactory.info('apiCache');
        if (!CacheFactory.get('apiCache')) { CacheFactory.createCache('apiCache')}
        return $http
            .get(config.API_URL + url, { cache: CacheFactory.get('apiCache') })
            .then(function(response) {
                if (typeof response.data ==='object' && response.data instanceof Array) {
                     if(!response.data.length){
                         $state.go('root.404', null, {location: false});
                        throw "Error: Not Found 404";
                     } else{
                        var items = response.data.map(function(item) {
                           return decorateResult(item);
                        });
                        return items;
                    }
                   
                } else {
                    return decorateResult(response.data);
                }
            })
            .catch(function (e) {
                    $state.go('root.404', null, {location: false});
                    throw e;
                    
            })
            .finally(function(response) {
                  $rootScope.progressbar.complete();

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
        result.title = $sce.trustAsHtml(result.title.rendered);
        //result = result[121470594571005].data;
        return result;
    }

    return {
        allPosts: allPosts,
        allDocuments: allDocuments,
        documentBySlug: documentBySlug,
        allPostsBySearchTag: allPostsBySearchTag,
        allPostsBySearchTerm: allPostsBySearchTerm,
        allPostsBySearchCategory: allPostsBySearchCategory,
        featuredPosts: featuredPosts,
        postById: postById,
        postByURL: postByURL,
    };
}

angular
    .module('app')
    .factory('ApiService', ApiService);