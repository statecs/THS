/**
 * Strip HTML tags from a string. Used when displaying content meta tags.
 * @returns {Function}
 */
function limitHtml() {
    return function(text, limit) {

            var changedString = String(text).replace(/<[^>]+>/gm, '');
            var length = changedString.length;
            var suffix = ' ...';

            return length > limit ? changedString.substr(0, limit - 1) + suffix : changedString;
        };
}

angular
    .module('app')
    .filter('limitHtml', limitHtml);