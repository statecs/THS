function PageCtrl($scope, $sce, $stateParams, $window, $anchorScroll, $timeout, $location, ApiService, MetadataService) {
    var vm = this;
    vm.page = {};

 //console.log($stateParams.path);

  ApiService.postByURL($stateParams.path).then(function(page) {
        vm.page = page[0];

        vm.page.title.rendered = $sce.getTrustedHtml(vm.page.title);
        vm.page.excerpt.rendered = $sce.getTrustedHtml(vm.page.excerpt);

       // $window.location.href = vm.page.link;
            
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
                vm.page.template == 'single-post'    ||
                vm.page.template == 'category'){
                return;
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
             vm.pId = event.attachments[0].fileUrl;
             vm.imgUrl = vm.pId.split("/")[7]||"Unknown";

              return "https://docs.google.com/uc?id=" + vm.imgUrl;
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

      $http.get(url, { cache: true }).success(function(data){
             // console.log(gcConfig);
        vm.calendar = data;

        if (!gcConfig.hideTitle && !gcConfig.calendar_name)
          angular.extend(gcConfig, { calendar_name: data.summary })
      });

}



angular
    .module('app')
    .controller('PageCtrl', PageCtrl)
    .controller('EventsCtrl', EventsCtrl);