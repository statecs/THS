function PageController($stateParams, $anchorScroll, $timeout, $location, ApiService, MetadataService) {
    var vm = this;
    vm.page = {};

    console.log($stateParams.id);
    if ($stateParams.id === 'id' ){

    
        ApiService.pageBySlug($stateParams.slug).then(function(page) {
        console.log($stateParams);
        vm.page = page[0];

        console.log(page);

        MetadataService.setMetadata({
            title: page.title,
            description: page.excerpt
        });
    });
    

    } else {

        ApiService.pageById($stateParams.id).then(function(page) {
        console.log($stateParams);
        vm.page = page;

        console.log(page);

        MetadataService.setMetadata({
            title: page.title,
            description: page.excerpt
        });
    });
  }

    
}


angular
    .module('app')
    .controller('PageController', PageController);