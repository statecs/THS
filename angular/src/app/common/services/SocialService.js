/**
 * The SocialService retrieves and processes the json response from Social Networks into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function SocialService($http, $sce, config) {

    function thsFacebookPosts() {
        return getData('https://graph.facebook.com/121470594571005/posts?access_token=963806983710968|1b4e82243d046851a67059d2f8735b45&fields=attachments&limit=100');
    }

    function getData(url) {
        return $http
            .get(url, { cache: true })
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

		result.id = result.data[0].id;
	    result.data = result.data[0].attachments.data[0];
	        return result;
        //result.excerpt = $sce.trustAsHtml(result.data[0].attachments.data[0].title);
       // result.content = $sce.trustAsHtml(result.data[0].attachments.data[0].description);
    
                    	
    }

    return {
        thsFacebookPosts: thsFacebookPosts
    };
}

angular
    .module('app')
    .factory('SocialService', SocialService);