function PageController($stateParams, $anchorScroll, $timeout, $location, PageService, MetadataService) {
    var vm = this;
    vm.page = {};

    PageService.page($stateParams.slug).then(function(page) {
        console.log($stateParams);
        vm.page = page[0];

        console.log(page);

        MetadataService.setMetadata({
            title: page.title,
            description: page.excerpt
        });
    });
}


angular
    .module('app')
    .controller('PageController', PageController);