function HeaderCtrl($scope, config, $http, localStorageService ) {



$scope.nav = localStorageService.get('nav');
$scope.cats = localStorageService.get('cats');
$scope.posts = localStorageService.get('posts');

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
