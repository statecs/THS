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

    function allPosts() {
        return getData('wp/v2/posts?per_page=20');
    }

    function allSearchTerm(searchResult) {
        return getData('wp/v2/search?s=' + searchResult);
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
        $rootScope.loaded = false;
        $rootScope.notfound = false;
        spinnerService.show('loadingSpinner');
        $rootScope.progressbar.start();
        $rootScope.progressbar.setColor('#fff');
        var apiCache = CacheFactory.info('apiCache');
        if (!CacheFactory.get('apiCache')) { CacheFactory.createCache('apiCache')}
        return $http
            .get(config.API_URL + url, { cache: CacheFactory.get('apiCache') })
            .then(function(response) {
                if (typeof response.data ==='object' && response.data instanceof Array) {
                     if(!response.data.length){
                        //$location.path('/404');
                         $state.go('root.404', null, {location: false});
                         $rootScope.notfound = true;
                        //alertify.error("Error: Not Found 404");
                        throw "Error: Not Found 404";
                     } else{
                        var items = response.data.map(function(item) {
                            //console.log(item);
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
                    $rootScope.notfound = true;
                    //alertify.error("Error: Not Found 404");
                    //$location.path('/404');
                    throw e;
                    
            })
            .finally(function(response) {
                 spinnerService.hide('loadingSpinner');
                  $rootScope.progressbar.complete();
                   $timeout(function () {
                        $rootScope.loaded = true;
                    }, 1500);
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
        allPostsBySearchTag: allPostsBySearchTag,
        allPostsBySearchTerm: allPostsBySearchTerm,
        allPostsBySearchCategory: allPostsBySearchCategory,
        featuredPosts: featuredPosts,
        postById: postById,
        allSearchTerm: allSearchTerm,
        postByURL: postByURL,
    };
}

angular
    .module('app')
    .factory('ApiService', ApiService);