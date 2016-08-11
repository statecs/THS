function CategoryCtrl($stateParams, $anchorScroll, $timeout, $location, ApiService, MetadataService) {
    var vm = this;
    //console.log(vm);

    vm.posts = [];

 // console.log($stateParams);

 ApiService.allPostsBySearchCategory($stateParams.term).then(function(post) {
        //console.log($stateParams);
        vm.posts = post;

        //console.log(vm.posts);

        MetadataService.setMetadata({
            title: post.title,
            description: post.excerpt
        });
    });

 
}
function TagsCtrl($stateParams, $anchorScroll, $timeout, $location, ApiService, MetadataService) {
    var vm = this;
    //console.log(vm);

    vm.posts = [];

 // console.log($stateParams);

 ApiService.allPostsBySearchTag($stateParams.term).then(function(post) {
        //console.log($stateParams);
        vm.posts = post;

        //console.log(vm.posts);

        MetadataService.setMetadata({
            title: post.title,
            description: post.excerpt
        });
    });

 
}


angular
    .module('app')
    .controller('CategoryCtrl', CategoryCtrl)
    .controller('TagsCtrl', TagsCtrl);