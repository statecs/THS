function HeaderCtrl($anchorScroll, $scope, $state, config, $http, localStorageService, ApiService ) {
	var vm = this;

	var apiCallFunction;
	var posts = [];

	ApiService.allPosts().then(function(posts) {
		$scope.posts = posts;
	});

	$scope.search = function(term) {
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

$scope.openArticlesMenu = function(){
    if ($scope.menuArticleClass === "is-open")
      $scope.menuArticleClass = "";
    else
      $scope.menuArticleClass = "is-open";
  };

$scope.openMenu = function(){
    if ($scope.menuClass === "js-open-nav")
      $scope.menuClass = "";
    else
      $scope.menuClass = "js-open-nav";
  };
$scope.closeMenu = function(){
      $scope.menuClass = "";
      $scope.menuArticleClass = "";
  };
 $scope.setActive = function($index) {
   if($scope.activeMenu === $index){
 		$scope.activeMenu = "";
 	} else{
    	$scope.activeMenu = $index;
    }
 };
  $scope.setSubActive = function($index) {
 	console.log($index);
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
