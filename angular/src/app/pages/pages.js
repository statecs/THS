function PagesController($anchorScroll, $stateParams, $state, PageService, MetadataService) {
    var vm = this;
    var apiCallFunction;

    vm.pages = [];
    vm.loaded = false;
    vm.subtitle = '';

    MetadataService.setMetadata({
        title: 'Pages',
        description: 'A collection of articles on some topics.'
    });

    if (typeof $stateParams.tags !== 'undefined') {
        apiCallFunction = PageService.allPagesByTag($stateParams.tag);
        vm.subtitle = 'tagged with "' + $stateParams.tag + '"';
    } else if (typeof $stateParams.searchTerm !== 'undefined') {
        apiCallFunction = PageService.allPagesBySearchTerm($stateParams.searchTerm);
        vm.subtitle = 'searching "' + $stateParams.searchTerm + '"';
    } else {
        apiCallFunction = PageService.allPages();
    }


    apiCallFunction.then(function(pages) {
        vm.pages = pages;
        console.log(pages);
        vm.loaded = true;
    });

    vm.scrollToTop = function() {
        $anchorScroll();
    };

    vm.search = function(term) {
        $state.go('pagesBySearch', { searchTerm: term });
    };
}

angular
    .module('app')
    .controller('PagesController', PagesController);