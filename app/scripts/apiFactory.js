(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name thsApp.apiFactory
   * @description
   */
  angular.module('thsApp.apiFactory', [])
    .factory('apiFactory', function($http, $rootScope) {
      var factoryFunctions = {};

      var ths ="http://ths.kth.se/wp-json/wp/v2/posts";
      var facebook = "https://graph.facebook.com/121470594571005/posts?access_token=963806983710968|1b4e82243d046851a67059d2f8735b45&fields=attachments&limit=100";

      var path = "http://armada.nu/api/";
      var pages = path + "pages";
      var news = path + "news";
      var social = path + "social/";
      //var facebook = social + "facebook";
      var instagram = social + "instagram";

      var pagesStrings = path + "pages";


      /*
         Fetch from THS Armada's Facebook
       */
      factoryFunctions.getFacebook = function() {
        return $http.get(facebook, {cache: true});
      };

      /*
         Fetch from THS Armada's Instagram
       */
      factoryFunctions.getInstagram = function() {
        return $http.get(instagram, {cache: true});
      };

      /*
         Fetch from Armada's News
       */
      factoryFunctions.getNews = function() {
        return $http.get(news, {cache: true});
      };


      /*
        Fetch all ths news
       */
      factoryFunctions.getths = function(){
          return $http.get(ths, {cache: true});
      };

      /*
        Fetch pages from backend
       */
      factoryFunctions.getPages = function() {
        return $http.get(pages, {cache: true});
      };

      var visitorType = "";
      factoryFunctions.visitorType = function(){
        return visitorType;
      };
      factoryFunctions.setVisitor = function(type){
        visitorType = type;
      };

      // Fetch the dynamic strings from the backend
      // The idea is that these strings should be changeable without needing to redeploy
      var pageStrings = [];
      function fetchPageStrings() {
        $http.get(pagesStrings, {cache: true}).success(function(data) {
          pageStrings = data.pages;
          $rootScope.$emit('page-strings-ready');
        });
      }

      fetchPageStrings();
      // Get all the strings from the backend
      // You probably want to use the getStringsForID function instead
      factoryFunctions.getPageStrings = function() {
          return pageStrings;
      };

      // Get the strings associated with a specific id from the backend
      factoryFunctions.getStringsForID = function(id) {
          for (var i = 0; i < pageStrings.length; i ++) {
            if (pageStrings[i].id == id) {
              return pageStrings[i];
            }
          }
          return null;
      }


      return factoryFunctions;
    });
})();