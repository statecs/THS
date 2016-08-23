/**
 * Directive to encapsulate the revealing/auto-hiding search input.
 * @returns {{restrict: string, link: Function}}
 */
function revealingSearchInput($timeout) {

    return {
        restrict: 'E',
        templateUrl: 'common/directives/revealingSearchInput/revealingSearchInput.tpl.html',
        replace: true,
        scope: {
            searchCallback: "&"
        },
        link: function(scope, element) {

            scope.searchButtonClick = function() {
                if (!scope.showSearchInput) {
                    scope.showSearchInput = true;
                    element.find('input')[0].focus();
                } else if (!scope.searchTerm) {
                    scope.showSearchInput = false;
                } else {
                    scope.searchCallback({ term : scope.searchTerm });
                }
            };

            scope.searchInputBlur = function() {
                $timeout(function() {
                    scope.showSearchInput = false;
                }, 100);
            };
        }
    };
}

/**
 * Directive to DiscoverCard
 */
function discoverCard() {

    // Return the directive configuration.
        return({
            controller: "ConnectCtrl as vm",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/discover-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

      scope.element = element;
      scope.elementParent = scope.element.parent();
      scope.slidesContainer = angular.element(scope.element.find('ul')[0]);
     
      scope.currentWidth = scope.element.prop('offsetWidth');
      scope.currentHeight = scope.element.prop('offsetHeight');


        }
}

function eventsCard() {

    // Return the directive configuration.
        return({
            controller: "EventsCtrl as vm",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/events-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

            //console.log( "EventsCard directive linking." );

        }
}

function standardCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/standard-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

            //console.log( "StandardCard directive linking." );

        }
}
function membershipCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/membership-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

            //console.log( "MembershipCard directive linking." );

        }
}
function nymbleCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/nymble-menu-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

            //console.log( "NymbleCard directive linking." );

            scope.day = (new Date()).getDay();
            scope.date = (new Date());
           

        }
}
function defaultCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/default-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

           // console.log( "Card directive linking." );

        }
}
function restrictionsCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/restrictions-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

           // console.log( "restrictionsCard directive linking." );

        }
}

function galleryCard() {

    // Return the directive configuration.
        return({
            controller: "HeaderCtrl",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/gallery-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

          //  console.log( "galleryCard directive linking." );

        }
}

function karbokhandelnCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/karbokhandeln-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

           // console.log( "karbokhandelnCard directive linking." );

        }
}

function contentCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/content-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

           // console.log( "contentCard directive linking." );

        }
}
function newsCard() {

    // Return the directive configuration.
        return({
            controller: "HeaderCtrl",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/news-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

           // console.log( "newsCard directive linking." );

        }
}

function campuscompetenceCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/campuscompetence-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

           // console.log( "campuscompetenceCard directive linking." );

        }
}
function faqCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/faq-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

           // console.log( "faqCard directive linking." );

        }
}

function karxCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/karx-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

          //  console.log( "karxCard directive linking." );

        }
}

function mapCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/map-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

           // console.log( "mapCard directive linking." );

        }
}

function dirDisqus($window) {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            scope: {
                config: '='
            },
            restrict: "E",
            template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink"></a>',
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {
            console.log(scope.config);

           scope.$watch('config', configChanged, true);

                function configChanged() {

                    // Ensure that the disqus_identifier and disqus_url are both set, otherwise we will run in to identifier conflicts when using URLs with "#" in them
                    // see http://help.disqus.com/customer/portal/articles/662547-why-are-the-same-comments-showing-up-on-multiple-pages-
                    if (!scope.config.disqus_shortname ||
                        !scope.config.disqus_identifier ||
                        !scope.config.disqus_url) {
                        return;
                    }

                    $window.disqus_shortname = scope.config.disqus_shortname;
                    $window.disqus_identifier = scope.config.disqus_identifier;
                    $window.disqus_url = scope.config.disqus_url;
                    $window.disqus_title = scope.config.disqus_title;
                    $window.disqus_category_id = scope.config.disqus_category_id;
                    $window.disqus_disable_mobile = scope.config.disqus_disable_mobile;
                    $window.disqus_config = function () {
                        this.language = scope.config.disqus_config_language;
                        this.page.remote_auth_s3 = scope.config.disqus_remote_auth_s3;
                        this.page.api_key = scope.config.disqus_api_key;
                        if (scope.config.disqus_on_ready) {
                            this.callbacks.onReady = [function () {
                                scope.config.disqus_on_ready();
                            }];
                        }
                    };

                    // Get the remote Disqus script and insert it into the DOM, but only if it not already loaded (as that will cause warnings)
                    if (!$window.DISQUS) {
                        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                        dsq.src = '//' + scope.config.disqus_shortname + '.disqus.com/embed.js';
                        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                    } else {
                        $window.DISQUS.reset({
                            reload: true,
                            config: function () {
                                this.page.identifier = scope.config.disqus_identifier;
                                this.page.url = scope.config.disqus_url;
                                this.page.title = scope.config.disqus_title;
                                this.language = scope.config.disqus_config_language;
                                this.page.remote_auth_s3 = scope.config.disqus_remote_auth_s3;
                                this.page.api_key = scope.config.disqus_api_key;
                            }
                        });
                    }
                }
        }
}

function touchSubmit($window) {

     return function (scope, element, attr) {

        var textFields = element.find('input');
        element.bind('submit', function() {

            /* To dismiss onscreen keyboard */
            // In some cases, focus was needed before blur to dismiss onscreen keyboard
            textFields[0].focus();
            textFields[0].blur();

            /* To ensure status messages are visible on small screens */
            $window.scrollTo(0, 0);

      });
    };
}


function a($location, $anchorScroll) {
     return {
            restrict: 'E',
            link: function(scope, elem, attrs) {
           /* if (attrs.href && attrs.href.indexOf('wp-content') > -1){
                elem.attr("target", "_blank");
            }*/

            if (attrs.href || attrs.ngHref){
                elem.on('click', function(e){
                    $anchorScroll();
                });
            } 
        }
    };
}

function clickOutside($document) {
     return {
            restrict: 'A',
            scope: {
               clickOutside: '&'
            },
            link: function(scope, elem, attrs) {
            $document.on('click', function (e) {
                   if (elem !== e.target && !elem[0].contains(e.target)) {
                        scope.$apply(function () {
                            scope.$eval(scope.clickOutside);
                        });
                    }
               });
        }

    };
}

angular.module('app')
    .directive('revealingSearchInput', revealingSearchInput)
    .directive('dirDisqus', dirDisqus)
    .directive('touchSubmit', touchSubmit)
    .directive('clickOutside', clickOutside)
    .directive('a', a)
    .directive('discoverCard', discoverCard)
    .directive('eventsCard', eventsCard)
    .directive('standardCard', standardCard)
    .directive('defaultCard', defaultCard)
    .directive('nymbleCard', nymbleCard)
    .directive('restrictionsCard', restrictionsCard)
    .directive('contentCard', contentCard)
    .directive('galleryCard', galleryCard)
    .directive('karbokhandelnCard', karbokhandelnCard)
    .directive('newsCard', newsCard)
    .directive('campuscompetenceCard', campuscompetenceCard)
    .directive('faqCard', faqCard)
    .directive('karxCard', karxCard)
    .directive('mapCard', mapCard)
    .directive('membershipCard', membershipCard);