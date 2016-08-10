function HeaderCtrl($anchorScroll, $scope, $state, config, $http, localStorageService, ApiService ) {
	var vm = this;

	var apiCallFunction;
	var posts = [];

	ApiService.allPosts().then(function(posts) {
		$scope.posts = posts;
	});

    $scope.change = function(searchResult) {
        var valtosend = $scope.searchText;
         apiCallFunction = ApiService.allSearchTerm(valtosend);
         apiCallFunction.then(function(results) {
          $scope.searchResults = results;
      });

        };

	$scope.search = function(term) {
		console.log("search", term);
       apiCallFunction = ApiService.allPostsBySearchTerm(term);
        
       apiCallFunction.then(function(posts) {
        	$scope.posts = posts;
        	$scope.searchTrue = true;
    	});
    };

    $scope.clearSearch = function() {
        ApiService.allPosts().then(function(posts) {
			$scope.posts = posts;
			$scope.searchTrue = false;
		});
    };


$scope.scrollToTop = function() {
        $anchorScroll();
    };

    $scope.showMobileMenu = false;

    $scope.toggleMobileMenu = function(e) {
        e.preventDefault();
        $scope.showMobileMenu = !$scope.showMobileMenu;
    };

    $scope.$on('$stateChangeSuccess', function(e, toState) {
        $scope.activeSection = toState.name;
        $scope.showMobileMenu = false;
    });



$scope.openSearch = function(){
    if ($scope.searchClass === "modal-open")
      $scope.searchClass = "";
    else
      $scope.searchClass = "modal-open";
  };

$scope.openArticlesMenu = function(){
    if ($scope.menuArticleClass === "is-open")
      $scope.menuArticleClass = "";
    else
      $scope.menuArticleClass = "is-open";
  };

$scope.closeMenu = function(){
      $scope.menuArticleClass = "";
      $scope.searchClass = "";
  };
 $scope.setActive = function($index) {
   if($scope.activeMenu === $index){
 		$scope.activeMenu = "";
 	} else{
    	$scope.activeMenu = $index;
    }
 };
  $scope.setSubActive = function($index) {
 	//console.log($index);
 	if($scope.activeSubMenu === $index){
 		$scope.activeSubMenu = "";
 	} else{
    	$scope.activeSubMenu = $index;
    }
 };

}
angular
    .module('app')
    .controller('HeaderCtrl', HeaderCtrl);
