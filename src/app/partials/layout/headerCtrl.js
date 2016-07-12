function HeaderCtrl($scope, config, $http) {


 $http.get(config.API_URL + 'wp-api-menus/v2/menu-locations/header_menu').success(function(res) {
    $scope.nav = res;
    console.log($scope.nav);
});


$scope.openMenu = function(){
    if ($scope.menuClass === "js-open-nav")
      $scope.menuClass = "";
    else
      $scope.menuClass = "js-open-nav";
  };
$scope.closeMenu = function(){
      $scope.menuClass = "";
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
