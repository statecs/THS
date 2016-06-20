function HomeController($scope, BlogService, SocialService, MetadataService,facebookFactory) {
    var vm = this;
    var apiCallFunction;
    
    vm.loaded = false;

    vm.posts = [];


    vm.featuredPosts = [];

    SocialService.facebookPosts().then(function(posts) {
        vm.posts = posts;
        console.log(vm.posts);
    });

     $scope.animateElementIn = function($el) {
    $el.removeClass('hidden');
    $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
  };

  $scope.animateElementOut = function($el) {
    $el.addClass('hidden');
    $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
  };

  /*  facebookFactory.getPostsFromPageById({
    page:"121470594571005,148731426526,199385490073014", // ID or name
    limit:"20", // (optional) valid values: 0-100 | default: 25
    before:"", // (optional)
    after:"", // (optional)
    access_token:"963806983710968|1b4e82243d046851a67059d2f8735b45"

	}).then(function (_data) {
    //on success
	vm.posts = decorateResult(_data);
    // $rootScope.facebookPosts = _data;
 
}).catch(function (_data) {
    //on error
});*/

  /**
     * Decorate a post to make it play nice with AngularJS
     * @param result
     * @returns {*}
     */
   /* function decorateResult(_data) {

var object1 = _data.data[121470594571005].data;
var object2 = _data.data[148731426526].data;
var object3 = _data.data[199385490073014].data;


function merge(obj1,obj2){ // Our merge function
    var result = {}; // return result
    for(var i in obj1){      // for every property in obj1 
        if((i in obj2) && (typeof obj1[i] === "object") && (i !== null)){
            result[i] = merge(obj1[i],obj2[i]); // if it's an object, merge   
        }else{
           result[i] = obj1[i]; // add it to result
        }
    }
    for(i in obj2){ // add the remaining properties from object 2
        if(i in result){ //conflict
            continue;
        }
        result[i] = obj2[i];
    }
    return result;
}
 var finalobj = merge(object1, object2);
	  //  _data = _data.data[121470594571005].data;
console.log(finalobj);
	    return finalobj;
        //result.excerpt = $sce.trustAsHtml(result.data[0].attachments.data[0].title);
       // result.content = $sce.trustAsHtml(result.data[0].attachments.data[0].description);
    
                    	
    }


  /* apiCallFunction = SocialService.facebookPosts();

 console.log(apiCallFunction);

      apiCallFunction.then(function(posts) {
        vm.posts = posts;
        console.log(posts);
        vm.loaded = true;
    });*/

    BlogService.featuredPosts().then(function(posts) {
        vm.featuredPosts = posts;
    });

    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});

}

angular
    .module('app')
    .controller('HomeController', HomeController);
