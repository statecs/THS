/**
 * The SocialService retrieves and processes the json response from Social Networks into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function SocialService($http, $sce, config, facebookFactory) {

		var result = [];

    function facebookPosts() {
      return getData('https://graph.facebook.com/v2.5/posts?ids=121470594571005,148731426526&access_token=963806983710968%7C1b4e82243d046851a67059d2f8735b45&fields=id,message,story,created_time,full_picture,from,link,description,type,shares,source,picture,object_id&limit=20');
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
	    result = result[121470594571005].data;

	    return result;
        //result.excerpt = $sce.trustAsHtml(result.data[0].attachments.data[0].title);
       // result.content = $sce.trustAsHtml(result.data[0].attachments.data[0].description);
    
                    	
    }

    return {
        facebookPosts: facebookPosts
    };
}

angular
    .module('app')
    .factory('SocialService', SocialService);