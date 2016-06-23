function BlogController($anchorScroll, $stateParams, $state, ApiService, MetadataService) {
    var vm = this;
    var apiCallFunction;

    vm.posts = [];
    vm.loaded = false;
    vm.subtitle = '';

    MetadataService.setMetadata({
        title: 'Blog',
        description: 'A collection of articles on some topics.'
    });

    if (typeof $stateParams.tags !== 'undefined') {
        apiCallFunction = ApiService.allPostsByTag($stateParams.tag);
        vm.subtitle = 'tagged with "' + $stateParams.tag + '"';
    } else if (typeof $stateParams.searchTerm !== 'undefined') {
        console.log("searchBlog");
        apiCallFunction = ApiService.allPostsBySearchTerm($stateParams.searchTerm);
        vm.subtitle = 'searching "' + $stateParams.searchTerm + '"';
    } else {
        apiCallFunction = ApiService.allPosts();
    }


    apiCallFunction.then(function(posts) {
        vm.posts = posts;
        vm.loaded = true;
    });

    vm.scrollToTop = function() {
        $anchorScroll();
    };

    vm.search = function(term) {
        $state.go('postsBySearch', { searchTerm: term });
    };
}

angular
    .module('app')
    .controller('BlogController', BlogController);