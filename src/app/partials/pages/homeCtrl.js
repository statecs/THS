function HomeCtrl(ApiService, $http, MetadataService, SocialService) {
    var vm = this;

    vm.page = {};

    var apiCallFunction;

  /*  ApiService.postByURL('/home').then(function(page) {
        vm.page = page[0];

       // console.log(vm.page);
        
        MetadataService.setMetadata({
            title: vm.page.title,
            description: page.excerpt
        });
    });

    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});
*/
}

angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);
