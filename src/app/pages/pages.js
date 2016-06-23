function PagesController($anchorScroll, $stateParams, $state, ApiService, MetadataService) {
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
        apiCallFunction = ApiService.allPagesByTag($stateParams.tag);
        vm.subtitle = 'tagged with "' + $stateParams.tag + '"';
    } else if (typeof $stateParams.searchTermPages !== 'undefined') {
        apiCallFunction = ApiService.allPagesBySearchTerm($stateParams.searchTermPages);
        vm.subtitle = 'searching "' + $stateParams.searchTerm + '"';
    } else {
        apiCallFunction = ApiService.allPages();
    }


    apiCallFunction.then(function(pages) {
        vm.pages = pages;
        vm.loaded = true;
    });

    vm.scrollToTop = function() {
        $anchorScroll();
    };

    vm.searchPage = function(term) {
        $state.go('pagesBySearch', { searchTerm: term });
    };
}

angular
    .module('app')
    .controller('PagesController', PagesController);