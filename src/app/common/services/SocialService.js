/**
 * The SocialService retrieves and processes the json response from Social Networks into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function SocialService($http, $sce, config, spinnerService, alertify, ngProgressFactory, $rootScope, CacheFactory) {

    var result = [];

    function facebookPosts() {
      return getData('wp/v2/social?type=facebook');
    }
    function instagramPosts() {
      return getData('wp/v2/social?type=instagram');
    }
   
    function getData(url) {
        spinnerService.show('loadingSpinner');
        $rootScope.progressbar.start();
        if (!CacheFactory.get('socialCache')) {CacheFactory.createCache('socialCache', {maxAge: 60 * 60 * 1000})}
        return $http
            .get(config.API_URL + url, { cache: CacheFactory.get('socialCache') })
            .then(function(response) {
                if (typeof response.data ==='object' && response.data instanceof Array) {
                     if(!response.data.length){
                        alertify.error("Error: Not Found 404");
                        throw "Error: Not Found 404";
                     } else{
                        var items = response.data.map(function(item) {
                            return item;
                        });
                        return items;
                    }
                   
                } else {
                    return response.data;
                }
            })
            .catch(function (e) {
                    console.log("error", e);
                    alertify.error("Error: Bad Request 400");
                    throw e;
                    
            })
            .finally(function(response) {
                 spinnerService.hide('loadingSpinner');
                  $rootScope.progressbar.complete();
            });
    }

    return {
        facebookPosts: facebookPosts,
        instagramPosts: instagramPosts
    };
}
/**
 * The SearchService retrieves and processes the json response from Search into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{ allSearchTerm: allSearchTerm, allSearchCat: allSearchCat}}
 * @constructor
 */
function SearchService($http, $sce, config, spinnerService, alertify, ngProgressFactory, $rootScope, CacheFactory) {

    var result = [];

    function allSearchTerm(searchResult) {
        return getData('wp/v2/search?s=' + searchResult);
    }
     function allSearchCat(searchResult, searchCat) {
        return getData('wp/v2/search?s=' + searchResult + '&engine=' + searchCat + '&posts_per_page=40');
    }
    function allSearchDate(searchResult, year, month, day) {
        return getData('wp/v2/search?s=' + searchResult + '&date_query[year]=' + year + '&date_query[month]=' + month + '&date_query[day]=' + day);
    }
   
    function getData(url) {
        spinnerService.show('loadingSpinner');
        $rootScope.progressbar.start();
        $rootScope.notfound = false;
        if (!CacheFactory.get('searchCache')) {CacheFactory.createCache('searchCache', {maxAge: 60 * 60 * 1000})}
        return $http
            .get(config.API_URL + url, { cache: CacheFactory.get('searchCache') })
            .then(function(response) {
                if (typeof response.data ==='object' && response.data instanceof Array) {
                     if(!response.data.length){
                        $rootScope.notfound = true;
                        //alertify.error("Error: Not Found 404");
                        throw "Error: Not Found 404";
                     } else{
                        var items = response.data.map(function(item) {
                            return decorateResult(item);
                        });
                        return items;
                    }
                   
                } else {
                    return response.data;
                }
            })
            .catch(function (e) {
                    $rootScope.notfound = true;
                    throw e;
                    
            })
            .finally(function(response) {
                 spinnerService.hide('loadingSpinner');
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
        allSearchTerm: allSearchTerm,
        allSearchCat: allSearchCat,
    };
}

angular
    .module('app')
    .factory('SocialService', SocialService)
    .factory('SearchService', SearchService);