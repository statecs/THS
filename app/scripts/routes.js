 'use strict'; 
angular.module('thsApp')
  .config(function ($routeProvider) {
    $routeProvider
       .when('/', {
        templateUrl: 'views/page/page.html',
        controller: 'pageCtrl',
        controllerAs: 'pageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
