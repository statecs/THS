function ConnectCtrl($scope, ApiService, $http, MetadataService, SocialService) {
    var vm = this;

    vm.page = {};

    var apiCallFunction;
    var instagramData, facebookData;
    
    vm.loaded = false;

    vm.posts = [];

    vm.featuredPosts = [];


   SocialService.instagramPosts().then(function(posts) {
        instagramData = posts.data;
        //console.log(instagramData);
        setUpPosts();
    });

    SocialService.facebookPosts().then(function(posts) {
        facebookData = posts[121470594571005].data;
        //console.log(facebookData);
         setUpPosts();
    });

      var SocialTile = {
        date: null, // Date created
        imageUrl: null, // URL to image
        description: 'description', // Any relevant description text
        link: "", // Link to the content
        title: "", // A title (probably only relevant for news items)
        type: null // "facebook" or "instagram" or "news"
      };

    var socialTiles = [];
    var tile;

    function setUpPosts() {

        instagramData.forEach(function (instaObj) {
            tile = Object.create(SocialTile);
            tile.link = instaObj.link;
            tile.date = instaObj.created_time*1000;
            tile.type = "Instagram";
            tile.user = instaObj.user.username;
            tile.description = instaObj.caption.text;
            tile.imageUrl = instaObj.images.standard_resolution.url;
            socialTiles.push(tile);
          });

          facebookData.forEach(function (feedObj) {
          if (feedObj.full_picture != null) {
              tile = Object.create(SocialTile);
              tile.imageUrl = feedObj.full_picture ;
              tile.description = feedObj.message;
              tile.date = feedObj.created_time;
              tile.type = "Facebook";
              tile.user = feedObj.from.name;
              tile.link = feedObj.link;
              socialTiles.push(tile);
            }
          });

    vm.socialTiles = socialTiles;
    vm.loaded = true;
    
    }

    vm.currentMarginLeftValue = 0;
    vm.currentIndex = 0;

    vm.getCurrentWidth = function (currentWidth) {
        var currentWidth = $scope.currentWidth;
        return {'width': currentWidth + 'px'};
    };

    vm.getElementWidth = function (currentWidth) {
        var currentWidth = $scope.currentWidth;
        return {'width':currentWidth*5+'px'};
    };


    vm.restartFromLastItem = function() {
        vm.currentIndex = 4;
        vm.currentMarginLeftValue = (4 * $scope.currentWidth) * -1;
        vm.applyMarginLeft();
        
    };

     vm.restartFromFirstItem = function() {
      vm.currentIndex = 0;
      vm.currentMarginLeftValue = 0;
      vm.applyMarginLeft();
    };

    vm.navigateLeft = function() {
      vm.currentIndex--;
      vm.slidesContainer = $scope.slidesContainer;
      vm.currentMarginLeftValue += $scope.currentWidth;
      vm.applyMarginLeft();
      if (vm.currentIndex === -1) {
        vm.restartFromLastItem();
      }
    };


    vm.navigateRight = function() {
      vm.currentIndex++;
      vm.slidesContainer = $scope.slidesContainer;
      vm.currentMarginLeftValue -= $scope.currentWidth;
      vm.applyMarginLeft();
      if (vm.currentIndex === 5) {
          vm.restartFromFirstItem();
      }
    };

    vm.applyMarginLeft = function() {
      vm.slidesContainer.css( '-webkit-transform', 'translate(' + vm.currentMarginLeftValue + 'px, 0px)', 'transform', 'translate(' + vm.currentMarginLeftValue + 'px, 0px)');
    };

    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});

}

angular
    .module('app')
    .controller('ConnectCtrl', ConnectCtrl);
