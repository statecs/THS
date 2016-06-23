function PostController($stateParams, $anchorScroll, $timeout, $location, BlogService, MetadataService) {
    var vm = this;
    console.log(vm);

    vm.post = {};

  console.log($stateParams);

    BlogService.post($stateParams.id).then(function(post) {
        console.log($stateParams);
        vm.post = post;

        console.log(post);

        MetadataService.setMetadata({
            title: post.title,
            description: post.excerpt
        });
    });
}


angular
    .module('app')
    .controller('PostController', PostController);