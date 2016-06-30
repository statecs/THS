function HeaderCtrl($scope, config, $http) {


 $http.get(config.API_URL + 'wp-api-menus/v2/menu-locations/header_menu').success(function(res) {
    $scope.nav = res;
    console.log($scope.nav);
});
}

angular
    .module('app')
    .controller('HeaderCtrl', HeaderCtrl);
