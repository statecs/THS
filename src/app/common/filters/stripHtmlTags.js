/**
 * Strip HTML tags from a string. Used when displaying content meta tags.
 * @returns {Function}
 */
function stripHtmlTags() {
    return function(text) {
        return String(text).replace(/<[^>]+>/gm, '');
    };
}

/**
 * Strip HTML tags from a string. Used when displaying content meta tags.
 * @returns {Function}
 */
function sanitizeHtml($sce) {
     return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
    };
}


angular
    .module('app')
    .filter('stripHtmlTags', stripHtmlTags)
    .filter('sanitizeHtml', sanitizeHtml);