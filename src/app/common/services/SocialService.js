/**
 * The SocialService retrieves and processes the json response from Social Networks into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function SocialService($http, $sce, config, spinnerService, alertify, ngProgressFactory, $rootScope) {

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
        return $http
            .get(config.API_URL + url, { cache: true })
            .then(function(response) {
                //console.log(response.data);
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

angular
    .module('app')
    .factory('SocialService', SocialService);