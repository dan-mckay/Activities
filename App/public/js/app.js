var myApp = angular.module('myApp', [
  'shoppinpal.mobile-menu',
  'ngRoute',
  'appServices',
  'appControllers'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',                        { templateUrl: 'partials/dash.html',            controller: 'DashCtrl'         })
      .when('/sports',                  { templateUrl: 'partials/sports.html',          controller: 'SportsCtrl'       })
      .when('/sport',                   { templateUrl: 'partials/sport.html',           controller: 'SportCtrl'        })
      .when('/activities',              { templateUrl: 'partials/activities.html',      controller: 'ActivityListCtrl' })
      .when('/activities/:activityID',  { templateUrl: 'partials/activity.html',        controller: 'ActivityCtrl'     })
      .otherwise({ redirectTo: '/dash' });
  }]);
