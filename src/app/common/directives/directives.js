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

            console.log( "DiscoverCard directive linking." );

        }
}

function eventsCard() {

    // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/cards/events-card.tpl.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

            console.log( "EventsCard directive linking." );

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

            console.log( "StandardCard directive linking." );

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

            console.log( "MembershipCard directive linking." );

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

            console.log( "Card directive linking." );

        }
}

angular.module('app')
    .directive('revealingSearchInput', revealingSearchInput)
    .directive('discoverCard', discoverCard)
    .directive('eventsCard', eventsCard)
    .directive('standardCard', standardCard)
    .directive('defaultCard', defaultCard)
    .directive('membershipCard', membershipCard);