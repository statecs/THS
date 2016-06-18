

function HomeController(BlogService, SocialService, MetadataService) {
    var vm = this;

    vm.socialPosts = [];


    vm.featuredPosts = [];

    SocialService.thsFacebookPosts().then(function(posts) {
        vm.socialPosts = posts;
        console.log(vm.socialPosts);
    });

    BlogService.featuredPosts().then(function(posts) {
        vm.featuredPosts = posts;
    });

    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});

}

angular
    .module('app')
    .controller('HomeController', HomeController);
