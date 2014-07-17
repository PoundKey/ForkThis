'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('AppCtrl', ['$scope', '$location', '$localStorage', 'ezfb', '$window', '$http', '$routeParams',
   function ($scope, $location, $localStorage, ezfb, $window, $http, $routeParams) {
    $scope.locations = {};
    var resNames = [];

    $.ajax({
      type: "GET",
      url: "/getXRes",
      async:false,
    })
    .done(function(data) {
      $scope.locations = data.locations;
    });

    $scope.resIndex = undefined;
    for (var i = 0; i < $scope.locations.length; i++) {
     resNames.push($scope.locations[i].name);
   }

   $scope.resViewer = resNames;
   $scope.username = undefined;

   $scope.initial_ajax = {};


// -----------------------------------------------------------------//
    //Ajax for doRate
    $scope.getRes = function(){
    $http.get('/getRes').success(function(data, status, headers, config){
      $scope.initial_ajax = data;

      alert("AJAX Intially successed!");

    }).error(function(data, status, headers, config){
      alert("AJAX Failed!");

    });

   };

   //Ajax for doRate
   $scope.doRate = function(){
    var request = $http({
      method: "post",
      url: "/doRate",
      data: {
        id: "21",
        user: "doRate",
        rating: "3"
      }
    });

    request.success(function(data, status, headers, config){
      $scope.initial_ajax = "doRate() POST Ajax sucessufully init";
    });

   };

   //Ajax for doCom
   $scope.doCom = function(){
    // $http.post('/doCom', {id: 21, user:"CTXue"}).success(function(data, status, headers, config){
    //   $scope.initial_ajax = data;
    //   alert("AJAX Intially sucess!!!!! Ban Ban Ban");

    // }).error(function(data, status, headers, config){


    // });

    var request = $http({
      method: "post",
      url: "/doCom",
      data: {
        id: "21",
        user: "doCom",
        comment: "This is a POST Comment"
      }
    });

    request.success(function(data, status, headers, config){
      $scope.initial_ajax = "doCom() POST Ajax sucessufully init";
    });

   };


// -----------------------------------------------------------------//

   $scope.doComDel = function(){
    var request = $http({
      method: "delete",
      url: "/doCom",
    });

    request.success(function(data, status, headers, config){
      $scope.initial_ajax = "All Comments are successfully deleted";

    });

    request.error(function(data, status, headers, config){
      $scope.initial_ajax = "Comments deletion failed, please double check the server-side code";

    });

   };



// -----------------------------------------------------------------//
   $scope.doRateDel = function(){
    var request = $http({
      method: "delete",
      url: "/doRate",
    });

    request.success(function(data, status, headers, config){
      $scope.initial_ajax = "All Ratings are successfully deleted";
    });

    request.error(function(data, status, headers, config){
      $scope.initial_ajax = "Ratings deletion failed, please double check the server-side code";
    });

   };

// -----------------------------------------------------------------//

    //Ajax for doRate
    $scope.getXRes = function(){
    $http.get('/getXRes').success(function(data, status, headers, config){
      $scope.initial_ajax = data;
    }).error(function(data, status, headers, config){
      alert("AJAX Failed!");

    });

   };

   //Ajax for doRate
   $scope.doXRate = function(){
    var request = $http({
      method: "post",
      url: "/doXRate",
      data: {
        id: "21",
        user: "doRate",
        rating: "This is a POST Rating"
      }
    });

    request.success(function(data, status, headers, config){
      $scope.initial_ajax = data;
    });

   };

   //Ajax for doCom
   $scope.doXCom = function(){
    // $http.post('/doCom', {id: 21, user:"CTXue"}).success(function(data, status, headers, config){
    //   $scope.initial_ajax = data;
    //   alert("AJAX Intially sucess!!!!! Ban Ban Ban");

    // }).error(function(data, status, headers, config){


    // });

    var request = $http({
      method: "post",
      url: "/doXCom",
      data: {
        id: "21",
        user: "doCom",
        comment: "This is a POST Comment"
      }
    });

    request.success(function(data, status, headers, config){
      $scope.initial_ajax = data;
    });

   };




// -----------------------------------------------------------------//




   $scope.$watch('res.selected', function(newValue, oldValue){
      if (newValue) {
        $scope.resIndex = resNames.indexOf(newValue.name);
        $('#resItem').addClass('animated fadeInUpBig');
        setTimeout(function () {
          $('#resItem').removeClass('animated fadeInUpBig');
        }, 1000);
      }
   });


// -----------------------------------------------------------------//

   $scope.clear = function() {
     $scope.res.selected = undefined;
  };

  $scope.res = {};
   $scope.hint = function(){
      if ($scope.username){
         return "Welcome, " + $scope.username + "!";}
      else {
         return "Please login to continue.";
      }
   };

   //alert(typeof($scope.loginStatusJSON));

   //$scope.fbStatus = $scope.loginStatusJSON.status;

   $scope.refreshData = function(){
       setTimeout(function()
         {alert("Restaurant data sucessfully updated!")}, 2000);
   };



// -----------------------------------------------------------------//


// -----------------------------------------------------------------//
  updateLoginStatus(updateApiMe);

  $scope.login = function () {

    ezfb.login(function (res) {

      if (res.authResponse) {
        updateLoginStatus(updateApiMe);
      }
    }, {scope: 'email,user_likes'});


  };

  $scope.logout = function () {

    ezfb.logout(function () {
      updateLoginStatus(updateApiMe);
      $scope.username = undefined;
    });

  };

  $scope.share = function () {
    var curRes = $routeParams.id || "Please enter a resaurant view.";
    var resName = resNames[curRes];
    if (!$scope.username){
      alert("Please login to share.");
      return;
    }
    ezfb.ui(
      {
        method: 'feed',
        name: resName + " @ ForkThis!",
        picture: 'http://fork-this.appspot.com/logo.png',
        link: $location.$$absUrl,
        description: 'ForkThis! allows users to rate, comment and share opinions for restaurants around UBC Vancouver.'
      },
      function (res) {
        if (res){
          alert("Sucessfully shared " + resName + " on Facebook, " + $scope.username + "!");
        }
      }
    );
  };

  /**
   * For generating better looking JSON results
   */
  var autoToJSON = ['loginStatus', 'apiMe'];
  angular.forEach(autoToJSON, function (varName) {
    $scope.$watch(varName, function (val) {
      $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
    }, true);
  });

  /**
   * Update loginStatus result
   */
  function updateLoginStatus (more) {
    ezfb.getLoginStatus(function (res) {
      $scope.loginStatus = res;
      (more || angular.noop)();
    });
  }

  /**
   * Update api('/me') result
   */
  function updateApiMe () {
    ezfb.api('/me', function (res) {
      $scope.apiMe = res;
      $scope.username = $scope.apiMe.name;
    });
  }

  $scope.searchFocus = function(){
   $( "#searchBox" ).focus();
  };

  //pageination control over here



  }])

  .controller('DataCtrl', function ($scope, $location, $routeParams, $sce, $localStorage, $http, $firebase) {

   var cindex = $routeParams.id;
   var para = "res"+cindex;
   var ratePara = "rate"+cindex;
   $scope.ace = para;
   $scope.env = ratePara;
   $scope.currentRes = $scope.locations[cindex];
   var name = $scope.currentRes.name;
   var addr = $scope.currentRes.vicinity;
   var search = (name +" " + addr).replace(/\s/g, "+");
   $scope.locationSearch = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDoOzxNy4F7S3Zr98PO-mWuuCDZepLQGn8&q=" + search;
   $scope.locSearch = $sce.trustAsResourceUrl($scope.locationSearch);

   var curl = 'https://fork-this.firebaseio.com/';
   var fireRef = new Firebase(curl);
   $scope.coredata = $firebase(fireRef);


   $scope.coredata.$on("loaded", function() {

   });

   // $scope.$watch('coredata', function () {

   //  alert($scope.coredata.foo);

   // });


   $scope.$storage = $localStorage;

   //data for star ratings
   $scope.rate = 0;
   $scope.max = 5;
   $scope.isReadonly = false;
   $scope.hoveringOver = function(value) {
     $scope.overStar = value;
     $scope.percent = 100 * (value / $scope.max);
  };


   $scope.deleteStorage = function(){
      $localStorage.$reset();
      alert("All comments are deleted!");
   };

   $scope.submit = function() {

      if (!$scope.username){alert("Please login first!"); return}
      var comment_data = {"user": $scope.username, "comment": $scope.userinput };
      var rate_data = {"user": $scope.username, "rate": $scope.rate };
      if ($scope.$storage[para] === undefined){
         $scope.$storage[para] = {
            "comments": [],
            "rates": []
         };
      }

      if (($scope.$storage[para]) && $scope.$storage[para] !== undefined && ($scope.userinput) && ($scope.username) && ($scope.rate)){
         $scope.$storage[para].comments.push(comment_data);
         $scope.$storage[para].rates.push(rate_data);
         $scope.userinput = '';
         $scope.rate = 0;
      }else {
         alert("Please login or fill in all required fileds!");
      }

   };

   $scope.deleteResCom = function(){
      $scope.coredata.$remove(para);
      alert("All comments are deleted!");
   };

   $scope.submitFirebase = function() {

      if (!$scope.username){alert("Please login to continue."); return}
      var comment_data = {"user": $scope.username, "comment": $scope.userinput };

      if (($scope.userinput) && ($scope.username)){

         if (!$scope.coredata[para]){
           $scope.coredata[para] = [];
         }

         $scope.coredata[para].push(comment_data);
         $scope.coredata.$save(para);
         $scope.userinput = '';
      }else {
         alert("Please enter some comment.");
      }

   };

   $scope.rateRes = function(){

     if (!$scope.username){alert("Please login to continue."); return;}
     var dec = confirm("Are you sure want to rate " + name + "?");
     if (!dec){$scope.rate = 0; return;}

     var rate_data = {"user": $scope.username, "rate": $scope.rate };
     //alert(JSON.stringify(rate_data));
     if (($scope.rate) && ($scope.username)){
          if (!$scope.coredata[ratePara]){
           $scope.coredata[ratePara] = [];
         }

       $scope.coredata[ratePara].push(rate_data);
       $scope.coredata.$save(ratePara);
       $scope.rate = 0;
     }else {
      alert("Failed to rate, please enter a valid rating or login first.");
     }
   };


   $scope.overallRate = function() {
      var sumRate = 0;
      var rating = $scope.coredata[ratePara];
      if (rating){
         for (var i = 0; i < rating.length; i++) {
            sumRate = sumRate + rating[i].rate;
         }
         return "Rating: " + (sumRate/rating.length).toFixed(1);
      }else {return 'No Rating'}

   };



  })

  .controller('ProfileCtrl', function ($scope, $http, $firebase) {



     var curl = 'https://fork-this.firebaseio.com/';
     var fireRef = new Firebase(curl);
     $scope.coredata = $firebase(fireRef);

     $scope.loading = true;
     $scope.user_profile = [];
     var uid = $scope.username;

     $scope.coredata.$on("loaded", function() {
      var keys = $scope.coredata.$getIndex();

      keys.forEach(function(key, index) {

        if (key.indexOf('res') < 0) return;
        var curRes = $scope.coredata[key];
        curRes.forEach(function(obj) {
          if (!$scope.username){setTimeout(function(){}, 1000);}
          if (obj.user == $scope.username){
            obj.name = key;
            obj.uid = key.substring(3);
            //alert(JSON.stringify(obj));
            $scope.user_profile.push(obj);
          }
        });
      });
      $scope.loading = false;
     });

  })

  .controller('ModalDemoCtrl', function ($scope, $modal, $log) {


  })

  .controller('PaginationCtrl', ['$scope', function ($scope) {

  }]);





