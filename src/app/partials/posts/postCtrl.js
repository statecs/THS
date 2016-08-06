function PostCtrl($stateParams, $anchorScroll, $timeout, $location, ApiService, MetadataService) {
    var vm = this;
   // console.log(vm);

    vm.post = {};

 // console.log($stateParams);

    ApiService.postById($stateParams.id).then(function(post) {
       // console.log($stateParams);
        vm.post = post;

       // console.log(post);

        MetadataService.setMetadata({
            title: post.title.rendered,
            description: post.excerpt
        });
    });
}


angular
    .module('app')
    .controller('PostCtrl', PostCtrl);