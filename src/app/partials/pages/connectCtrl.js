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
        console.log(facebookData);
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
            tile.date = instaObj.created_time * 1000;
            tile.type = "instagram";
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
              tile.type = "facebook";
              tile.link = feedObj.link;
              socialTiles.push(tile);
            }
          });

    vm.socialTiles = socialTiles;
    console.log(vm.socialTiles);
    vm.loaded = true;
    
    }

    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});

}

angular
    .module('app')
    .controller('ConnectCtrl', ConnectCtrl);
