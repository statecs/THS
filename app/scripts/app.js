'use strict';

/**
 * @ngdoc overview
 * @name thsApp
 * @description
 * # thsApp
 *
 * Main module of the application.
 */
angular
  .module('thsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'thsApp.apiFactory',
    'thsApp.pageCtrl',
  ])
