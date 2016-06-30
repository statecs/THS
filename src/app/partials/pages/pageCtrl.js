function PageCtrl($scope, $stateParams, $anchorScroll, $timeout, $location, ApiService, MetadataService) {
    var vm = this;
    vm.page = {};


 console.log($stateParams.path);

  ApiService.pageBySlug($stateParams.path).then(function(page) {
        console.log($stateParams);
        vm.page = page[0];

        console.log(vm.page);
   
/*
        getTemplate Logic
        If Default Set Default
        If Single Post or Category Don't Override
        IF Pages Then Return Correct File
        */
         $scope.getTemplateUrl = function() {
            if (vm.page.template == 'default' || vm.page.template == ''  ) {
                return 'partials/pages/default.tpl.html';
            } else if (
                vm.page.template == 'single-post'    ||
                vm.page.template == 'category'){
                return;
            } else {
                console.log(vm.page.template);
                return 'partials/pages/' + vm.page.template + '.tpl.html';
            }
        }

        MetadataService.setMetadata({
            title: page.title,
            description: page.excerpt
        });
    });
    
 
   
  /*  if ($stateParams.id === 'id' ){
    
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
console.log(page.template);
    

        MetadataService.setMetadata({
            title: page.title,
            description: page.excerpt
        });
    });
  }*/



    
}


angular
    .module('app')
    .controller('PageCtrl', PageCtrl);