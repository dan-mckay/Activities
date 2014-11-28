var myApp = angular.module('myApp', [
  'shoppinpal.mobile-menu',
  'ngRoute',
  'appServices',
  'appControllers'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',                        { templateUrl: 'partials/welcome.html',         controller: 'RootCtrl'         })
      .when('/logout',                  { template: '<p>You are now logged out</p>',    controller: 'LogoutCtrl'       })
      .when('/dashboard',               { templateUrl: 'partials/dash.html',            controller: 'DashCtrl'         })
      .when('/sports',                  { templateUrl: 'partials/sports.html',          controller: 'SportsCtrl'       })
      .when('/sports/:sportID',         { templateUrl: 'partials/sport.html',           controller: 'SportCtrl'        })
      .when('/user details',            { templateUrl: 'partials/user.html',            controller: 'UserCtrl'         })
      .when('/activities',              { templateUrl: 'partials/activities.html',      controller: 'ActivitiesCtrl'   })
      .when('/activities/:activityID',  { templateUrl: 'partials/activity.html',        controller: 'ActivityCtrl'     })
      .otherwise( { redirectTo: '/logout'} );
  }]);
