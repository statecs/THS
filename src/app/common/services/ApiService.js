/**
 * The ApiService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function ApiService($http, $rootScope, $sce, config, spinnerService, alertify, ngProgressFactory) {

        $rootScope.progressbar = ngProgressFactory.createInstance();

    function allPosts() {
        return getData('wp/v2/posts?per_page=20');
    }

    function allPostsByTag(tag) {
        // getData('wp/v2/posts?filter[category_name]=post&filter[tag]=' + tag);
        getData('wp/v2/posts?filter[category_name]=' + tag);
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
      function allPages() {
        return getData('wp/v2/pages?per_page=50');
    }

    function allPagesByTag(tag) {
        getData('wp/v2/pages?filter[s]=post&filter[tag]=' + tag);
    }

    function allPagesBySearchTerm(searchTerm) {
        console.log(searchTerm);
         console.log("AllpagesSearch");
        return getData('wp/v2/pages?per_page=20&filter[s]=' + searchTerm);
    }

    function pageById(id) {
        return getData('wp/v2/pages/' + id);
    }
    function pageBySlug(slug) {
        return getData('wp/v2/pages/?slug=' + slug);
    }

    function facebookPosts() {
      return getSocialData('https://graph.facebook.com/v2.5/posts?ids=121470594571005,148731426526&access_token=963806983710968%7C1b4e82243d046851a67059d2f8735b45&fields=id,message,story,created_time,full_picture,from,link,description,type,shares,source,picture,object_id&limit=20');
    }

    function getData(url) {
        spinnerService.show('loadingSpinner');
        $rootScope.progressbar.start();
        return $http
            .get(config.API_URL + url, { cache: true })
            .then(function(response) {
                console.log(response.data);
                if (typeof response.data ==='object' && response.data instanceof Array) {
                     if(!response.data.length){
                        alertify.error("Error: Not Found 404");
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
                    console.log("error", e);
                    alertify.error("Error: Bad Request 400");
                    throw e;
                    
            })
            .finally(function(response) {
                 spinnerService.hide('loadingSpinner');
                  $rootScope.progressbar.complete();
            });
    }

     function getSocialData(url) {
        spinnerService.show('loadingSpinner');
        $rootScope.progressbar.start();
        return $http
            .get(url, { cache: true })
            .then(function(response) {
                if (response.data instanceof Array) {
                    var items = response.data.map(function(item) {
                        return decorateResultSocial(item);
                    });
                    return items;
                } else {
                    return decorateResultSocial(response.data);
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

    /**
     * Decorate a post to make it play nice with AngularJS
     * @param result
     * @returns {*}
     */
    function decorateResult(result) {
        result.excerpt = $sce.trustAsHtml(result.excerpt.rendered);
        result.date = Date.parse(result.date);
        result.content = $sce.trustAsHtml(result.content.rendered);
        //result = result[121470594571005].data;
        return result;
    }
        /**
     * Decorate a post to make it play nice with AngularJS
     * @param result
     * @returns {*}
     */
    function decorateResultSocial(result) {
        result = result[121470594571005].data;
        return result;
    }

    return {
        allPosts: allPosts,
        allPostsByTag: allPostsByTag,
        allPostsBySearchTerm: allPostsBySearchTerm,
        featuredPosts: featuredPosts,
        postById: postById,
        allPages: allPages,
        allPagesByTag: allPagesByTag,
        allPagesBySearchTerm: allPagesBySearchTerm,
        pageById: pageById,
        pageBySlug: pageBySlug,
        facebookPosts: facebookPosts
    };
}

angular
    .module('app')
    .factory('ApiService', ApiService);