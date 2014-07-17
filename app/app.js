'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ezfb',
  'ngRoute',
  'ngSanitize',
  'ui.select',
  'ngAnimate',
  'ngStorage',
  'ngResource',
  'ui.bootstrap',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'firebase'

]);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	// if(window.history && window.history.pushState){
	// 	$locationProvider.html5Mode(true);
	// }
  $routeProvider.when('/', {templateUrl: 'partials/overview.html', controller: 'AppCtrl'});
  $routeProvider.when('/res/:id', {templateUrl: 'partials/data-template.html', controller: 'DataCtrl'});
  $routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: 'ProfileCtrl'});
  $routeProvider.when('/chat', {templateUrl: 'partials/chat.html', controller: 'ChatCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

myApp.config(function (ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: '1499902720241736'
    //appId: '252462194950968'

  });
});

myApp.config(function(uiSelectConfig) {
  uiSelectConfig.theme = 'bootstrap';
});

myApp.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});



