function PageCtrl($scope, $sce, $stateParams, $window, $anchorScroll, $timeout, $location, ApiService, MetadataService) {
    var vm = this;
    vm.page = {};

 //console.log($stateParams.path);

  ApiService.postByURL($stateParams.path).then(function(page) {
        vm.page = page[0];

        if (vm.page.excerpt.rendered){
          vm.page.title.rendered = $sce.getTrustedHtml(vm.page.title);
          vm.page.excerpt.rendered = $sce.getTrustedHtml(vm.page.excerpt);
        }
      /* TODO  if (typeof vm.redirect !== 'undefined'){
          console.log(vm.redirect);
            $window.location.href = vm.redirect;

        } */

         
            //console.log(vm.page);       
        /*
        getTemplate Logic
        If Default Set Default
        If Single Post or Category Don't Override
        IF Pages Then Return Correct File
        */
         $scope.pageTemplate = function() {
            if (vm.page.template == 'default' || vm.page.template == '' ) {

                return 'partials/pages/default.tpl.html';
            } else if (
                vm.page.type == 'attachment'){
                return 'partials/pages/' + vm.page.type + '.tpl.html';
            } else {
              //  console.log(vm.page.template);
                return 'partials/pages/' + vm.page.template + '.tpl.html';
            }
        }

         $scope.disqusConfig = {
            disqus_shortname: 'ths-kth',
            disqus_identifier: vm.page.id,
            disqus_title: vm.page.title.rendered,
            disqus_url: vm.page.link,
            };

    $scope.openFaq = function($index) {
          //console.log($index);
          if($scope.faqClass === $index){
            $scope.faqClass = "";
          } else{
              $scope.faqClass = $index;
            }
         };
         $scope.openSubFaq = function($index) {
          //console.log($index);
          if($scope.faqSubClass === $index){
            $scope.faqSubClass = "";
          } else{
              $scope.faqSubClass = $index;
            }
         };


       
        MetadataService.setMetadata({
            title: vm.page.title.rendered,
            url: vm.page.link,
            image: vm.page.featured_image,
            description: vm.page.excerpt.rendered,
        });
    });
    

    
}

function EventsCtrl($scope, $filter, $anchorScroll, MetadataService, $http) {
    var vm = this;
    vm.page = {};

          var gcConfig = {
            max: 10,
            hideTitle: false,
            google_key: 'AIzaSyDI9VA5xCt8FMDZV1eZuyuf2ODimyI4kfQ',
            calendar_id: 'armada.nu_3evd63ebtffpqkhkivr8d76usk@group.calendar.google.com',
            dateTimeFilter: 'd. MMM HH.mm',
            dateDayFilter: 'd',
            dateMonthFilter: 'MMM',
            dateFilter: 'd. MMM',
            htmlDesc: false,
            calendar_name: false
      };

      var fulldayFilter = function(date) {
        return $filter('date')(date, gcConfig.dateFilter)
      };
       var timedFilter = function(date) {
        return $filter('date')(date, gcConfig.dateTimeFilter);
      };
      var timedDayFilter = function(date) {
        return $filter('date')(date, gcConfig.dateDayFilter);
      };
      var timedMonthFilter = function(date) {
        return $filter('date')(date, gcConfig.dateMonthFilter);
      };

     vm.month = function(event){
          return timedMonthFilter(event.start.dateTime);
      };
      vm.day = function(event){
          return timedDayFilter(event.start.dateTime);
      };

      vm.start = function(event){
        if (event.start.date) {
          return fulldayFilter(event.start.date);
        } else if (event.start.dateTime) {
          return timedFilter(event.start.dateTime);
        }
      };

       vm.eImg = function(event){
        if (event.attachments) {
             vm.pId = event.attachments[0].fileId;
             //vm.imgUrl = vm.pId.split("/")[7]||"Unknown";

              return "https://drive.google.com/uc?export=view&id=" + vm.pId;
        }
      };

       vm.end = function(event){
        /**
         * The end date is off by one in google for entire day events
         * so we need to substract one day
         */
        if (event.end.date) {
          var d = new Date(event.end.date);
          d.setDate(d.getDate() - 1);
          return fulldayFilter(d);
        } else if (event.end.dateTime) {
          return timedFilter(event.end.dateTime);
        }

      };

      var url = "https://www.googleapis.com/calendar/v3/calendars/" + gcConfig.calendar_id + "/events?orderBy=startTime&singleEvents=true&timeMin=" + (new Date().toISOString()) + "&maxResults=" + gcConfig.max + "&key=" + gcConfig.google_key;

      $http.get(url).success(function(data){
             // console.log(gcConfig);
        vm.calendar = data;

        if (!gcConfig.hideTitle && !gcConfig.calendar_name)
          angular.extend(gcConfig, { calendar_name: data.summary })
      });

}

function ContactCtrl($scope, $http, MetadataService, vcRecaptchaService, ApiService) {
    var vm = this;
    vm.page = {};

       ApiService.postByURL('/contact').then(function(page) {
        vm.page = page[0];
        
        MetadataService.setMetadata({
            title: vm.page.title,
            description: page.excerpt
        });
    });

    $scope.openFaq = function($index) {
          //console.log($index);
          if($scope.faqClass === $index){
            $scope.faqClass = "";
          } else{
              $scope.faqClass = $index;
            }
         };
         $scope.openSubFaq = function($index) {
          //console.log($index);
          if($scope.faqSubClass === $index){
            $scope.faqSubClass = "";
          } else{
              $scope.faqSubClass = $index;
            }
         };


        vm.publicKey = "6Lf68iYTAAAAAIFMPKffFO9vYNJ7KRgQVWP9H_ac";

               vm.signup = function(){
                   /* vcRecaptchaService.getResponse() gives you the g-captcha-response */
            
            if(vm.name == null || vm.email == null || vm.message == null || vm.subject_to == null ){ //if string is empty
                vm.error = "Please fill in the required fields";
                //alert("Please resolve the captcha and submit!")
            } else if (vcRecaptchaService.getResponse() === "" ){
                vm.error = "Please resolve the captcha and submit!";
            } else {
                var post_data = {  //prepare payload for request
                    'name':vm.name,
                    'email':vm.email,
                    'message':vm.message,
                    'subject_to':vm.subject_to,
                    'pnumber':vm.pnumber,
                    'g-recaptcha-response':vcRecaptchaService.getResponse()  //send g-captcah-reponse to our server
                }

                /* MAKE AJAX REQUEST to our server with g-captcha-string */
                $http.post('http://ths.kth.se/assets/scripts/xhr-contact-form.php',post_data).success(function(response){
                    if(response.error === 0){
                        vm.success = "Email sent! We will get back to you shortly!"
                        vm.error = "";
                        //alert("Successfully verified and signed up the user");
                        console.log(response);
                    }else{
                        vm.error = "Error email not sent";
                        vm.success = "";
                        //alert("User verification failed");
                    }
                })
                .error(function(error){
                
                })
                
            }

        }
    
}

function SearchCtrl($scope, $http, $stateParams, MetadataService, SearchService, $state) {
    var vm = this;
    vm.page = {};

      var apiCallFunction;
      vm.stateSearchTerm = $stateParams.searchTerm;

        if (typeof $stateParams.tags !== 'undefined') {
        apiCallFunction = SearchService.allSearchTerm($stateParams.tag);
        vm.subtitle = 'tagged with "' + $stateParams.tag + '"';
    } else if (typeof $stateParams.searchTerm !== 'undefined' && typeof $stateParams.searchCat !== 'undefined') {
        apiCallFunction = SearchService.allSearchCat($stateParams.searchTerm, $stateParams.searchCat);
        apiCallFunction.then(function(results) {
          $scope.searchResults = results;
        });
        vm.subtitle = 'searching "' + $stateParams.searchTerm + '"';
    } else {
       apiCallFunction = SearchService.allSearchTerm($stateParams.searchTerm);
        apiCallFunction.then(function(results) {
          $scope.searchResults = results;
        });
        vm.subtitle = 'searching "' + $stateParams.searchTerm + '"';
    }

  // Switch the search type/state
    $scope.switchSearchType = function(aSearchType) {
    vm.typeOfSearch = aSearchType;
    var valtosend = $scope.searchText;
    $state.go('root.searchCat', {searchTerm: valtosend, searchCat: vm.typeOfSearch});
    };

    if ( $stateParams.searchCat == 'posts') {
      vm.typeOfSearch = 'posts';
    } else if( $stateParams.searchCat == 'pages'){
      vm.typeOfSearch = 'pages';
    } else if( $stateParams.searchCat == 'documents'){
      vm.typeOfSearch = 'documents';
    } else if( $stateParams.searchCat == 'faq'){
      vm.typeOfSearch = 'faq';
    } else{
      vm.typeOfSearch = 'all';
    }


     $scope.change = function(searchResult) {
      var valtosend = $scope.searchText;
      $state.go('root.searchCat', {searchTerm: valtosend, searchCat: vm.typeOfSearch});

}




}

angular
    .module('app')
    .controller('PageCtrl', PageCtrl)
    .controller('EventsCtrl', EventsCtrl)
    .controller('SearchCtrl', SearchCtrl)
    .controller('ContactCtrl', ContactCtrl);