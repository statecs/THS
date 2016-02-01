(function () {
  'use strict';

  // Social media grid controller
  angular.module('thsApp.pageCtrl', [])
    .controller('pageCtrl', function ($scope, apiFactory, $window) {
      var instagramData, facebookData, newsData, thsData;
      var ctrl = this;

      // Start the loading indicator
      ctrl.isLoading = true;


      // MAXIMUM Number of tiles to be displayed in the grid
      ctrl.tilesShowing = 70;

      ctrl.appliedFilter = [];

      // The tiles displayed in the grid
      $scope.tiles = [];
      var height, width, lowerRes;
      for (var i = 1; i <= ctrl.tilesShowing; i++) {
        // The height and width of the tiles.
        // The first tile should be much bigger

        $scope.tiles.push({height: height,
                           width: width
                          });
      }


      // Fetch data from Facebook
      apiFactory.getFacebook().then(function(data) {
        if (data.status === 200) {
          facebookData = data.data.social;
          setUpTiles();
        }
      });

      // Fetch data from Instagram
      apiFactory.getInstagram().then(function(data) {
        if (data.status === 200) {
          instagramData = data.data.data;
          setUpTiles();
        }
      });

      // Fetch data from Armada News
      apiFactory.getNews().then(function(data) {
        if (data.status === 200) {

          newsData = data.data.news;
                 
          setUpTiles();
        }
      });

       // Fetch data from Armada News
      apiFactory.getths().then(function(data) {
      	 if (data.status === 200) {
          thsData = data.data;
          setUpTiles();
       }
      });

      $scope.navigateToUrl = function(url) {
        $window.open(url);
      };

      /*
       Open a website in this tab
       */
      $scope.openURL = function(url) {
        $window.open(url, "_self");
      }

      var SocialTile = {
        date: null, // Date created
        imageUrl: null, // URL to image
        description: 'description', // Any relevant description text
        link: "", // Link to the content
        title: "", // A title (probably only relevant for news items)
        type: null // "facebook" or "instagram" or "news"
      };


      var a = Object.create(SocialTile);
      var socialTiles = [];
      var tile;

      function setUpTiles() {
        if (thsData) {
          // Add instagram tiles
          instagramData.forEach(function (instaObj) {
            tile = Object.create(SocialTile);
            tile.link = instaObj.link;
            tile.date = instaObj.created_time * 1000;
            tile.type = "instagram";
            tile.description = instaObj.caption.text;
            tile.imageUrl = instaObj.images.standard_resolution.url;
            socialTiles.push(tile);
          });

          // Add facebook tiles
          facebookData.forEach(function (facebookObj) {
            // Ignore facebook objects that did not contain an image
            if (facebookObj.full_picture != null) {
              tile = Object.create(SocialTile);
              tile.link = facebookObj.link;
              tile.date = (new Date(facebookObj.created_time)).getTime();
              tile.imageUrl = facebookObj.full_picture;
              tile.type = "facebook";
              tile.description = facebookObj.message;
              socialTiles.push(tile);
            }
          });

console.log(thsData);
           thsData.forEach(function (thsObj) {
            tile = Object.create(SocialTile);
            tile.title = thsObj.title.rendered;
            tile.imageUrl = thsObj.featured_image_thumbnail_url;
            tile.description = thsObj.content.rendered;
            tile.date = thsObj.date;
            tile.type = "news";
            tile.link = thsObj._links.self[0].href;
            socialTiles.push(tile);
          });

          socialTiles.sort(function(a,b) {
            if (a.date < b.date) {
              return 1;
            }
            if (a.date > b.date) {
              return -1;
            }
            return 0;
          });

          // Update the grid
          $scope.socialTiles = socialTiles;

          // Stop the loading indicator
          ctrl.isLoading = false;
        }
      }

      // Only show tiles that match the relevant type parameter.
      // For example, 'instagram'.
      $scope.filterSocialTiles = function(type) {
        var filtered = [];
        if (type) {
          for (var i = 0; i < socialTiles.length; i ++) {
            if (socialTiles[i].type === type) {
              filtered.push(socialTiles[i]);
            }
            $scope.socialTiles = filtered;
          }
        } else {
          $scope.socialTiles = socialTiles;
        }
      }


          /*
          increases the limited number of pages showing
          will be called when the browser window is close to the
          end of the list
          Will not be called when the whole list is showing
        */


      ctrl.loadMore = function() {
      this.tilesShowing += 10;
            console.log(ctrl.tilesShowing);
 for (var i = 1; i <= ctrl.tilesShowing; i++) {
        $scope.tiles.push({height: height,
                           width: width
                          });

        };
    /* var last = $scope.tiles[$scope.tiles.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.tiles.push(last + i);
    }*/
  };


  });
})();