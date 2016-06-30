angular.module('app', ['ui.router', 'ngAnimate', 'angularUtils.directives.dirPagination', 'jtt_facebook', 'angular-scroll-animate', 'angularSpinners', 'ngAlertify', 'ngProgress']);

/**
 *
 * @param $stateProvider
 * @param $locationProvider
 * @param $urlRouterProvider
 * @ngInject
 */
function routesConfig($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('root', {
                url: '',
                abstract: true,
                views: {
                    'header': {
                        controller: 'HeaderCtrl'
                    }
                }
            })
            .state('root.home', {
                url: '/',
                views: {
                    'container@': {
                        templateUrl: 'partials/pages/home-page.tpl.html',
                        controller: 'HomeCtrl',
                        controllerAs: 'vm'
                    }
                }

            })
            .state('root.news', {
            url: "/news",
            views: {
                    'container@': {
                        templateUrl: 'partials/posts/news.tpl.html',
                        controller: 'NewsCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('root.newsBySearch', {
                url: "/news/search/:searchTerm",
                views: {
                 'container@': {
                        templateUrl: 'partials/posts/news.tpl.html',
                        controller: 'NewsCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('root.newsPost',{
                url: '/news/:id/:title',
                views: {
                    'container@': {
                        templateUrl: 'partials/posts/single-post.tpl.html',
                        controller: 'PostCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('blogcategory', {
                url: '/news/category/:id',
                views: {
                    'container@': {
                        templateUrl: 'partials/posts/category.tpl.html',
                        controller: 'CategoryCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
           /* .state('root.page', {
                url: '/:parent/:slug',
                //url: ':link',
                views: {
                    'container@': {
                        controller: 'PageCtrl',
                        controllerAs: 'vm',
                        template: '<div ng-include="getTemplateUrl()"></div>' // Make Dynamic
                    }
                }
            })*/
            .state('root.otherwise', {
                url: '*path',
                views: {
                    'container@': {
                        controller: 'PageCtrl',
                        controllerAs: 'vm',
                        template: '<div ng-include="getTemplateUrl()"></div>' // Make Dynamic
                    }
                }
            });
       
    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.rule(function ($injector, $location) {
        var slashHashRegex,
            matches,
            path = $location.url();

        // check to see if the path already has a slash where it should be
        if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
            return path.substring(0, path.length - 1);
        }

        // if there is a trailing slash *and* there is a hash, remove the last slash so the route will correctly fire
        slashHashRegex = /\/(#[^\/]*)$/;
        matches = path.match(slashHashRegex);
        if (1 < matches.length) {
            return path.replace(matches[0], matches[1]);
        }
    });
}

var config = {
    // global constant config values live here
    ROOT_URL: '%%ROOT_URL%%',
    API_URL: '%%API_URL%%'
};

function AppController($rootScope, $window, $location, $timeout, MetadataService) {
    var vm = this;

    vm.showMobileMenu = false;

    vm.toggleMobileMenu = function(e) {
        e.preventDefault();
        vm.showMobileMenu = !vm.showMobileMenu;
    };

    $rootScope.$on('$stateChangeSuccess', function(e, toState) {
        vm.activeSection = toState.name;
        vm.showMobileMenu = false;
    });

    $rootScope.$watchCollection( function() {
        return MetadataService.getMetadata();
    }, function (meta) {
        if (typeof meta.title !== 'undefined') {
            $rootScope.meta = meta;
            $timeout(function () {
                // push event to google analytics. This is done in a $timeout
                // so the current $digest loop has a chance to actually update the
                // HTML with the correct page title etc. Check for localhost to prevent
                // dev sessions from being recorded in analytics.
                if ($location.host() !== 'localhost') {
                    $window.ga('send', 'pageview', {page: $location.path()});
                }
            });
        }
    });
}

angular
    .module('app')
    .config(routesConfig)
    .constant('config', config)
    .controller('AppController', AppController);