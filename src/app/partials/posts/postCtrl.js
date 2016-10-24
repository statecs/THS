function PostCtrl($stateParams, $rootScope, $anchorScroll, $timeout, $location, ApiService, MetadataService, spinnerService) {
    var vm = this;

    vm.post = {};

    $rootScope.loaded = false;
    spinnerService.show('loadingSpinner');

    ApiService.postById($stateParams.id).then(function(post) {

        vm.post = post;
         $rootScope.loaded = true;
         spinnerService.hide('loadingSpinner');

        MetadataService.setMetadata({
            title: post.title.rendered,
            description: post.excerpt
        });
    });
}


angular
    .module('app')
    .controller('PostCtrl', PostCtrl);