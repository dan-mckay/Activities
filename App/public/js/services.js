angular.module('appServices', ['ngResource'])
  .factory('APIBaseUrl', function() {
    var protocol = 'http'
    var host = '127.0.0.1';
    var port = '3000';
    return protocol + '://' + host + ':' + port + '/api';
  })
  .factory('MenuItems', function() {
    return [
      { name: 'dashboard',      icon: 'fa-area-chart' },
      { name: 'sports',         icon: 'fa-bicycle'    },
      { name: 'activities',     icon: 'fa-trophy'     },
      { name: 'user details',   icon: 'fa-user'       },
      { name: 'logout',         icon: 'fa-trash'      }
    ];
  })
  .factory('PageTitle', function() {
    var title = 'Welcome'; // inital page title for "login" screen
    return {
      getTitle: function() { // call from the view
        return title;
      },
      setTitle: function(newTitle) {  // call from the controller
        title = newTitle
      }
    };
  })
  .factory('CurrentUser', function() {
    return {
      getUser: function() {
        var user = JSON.parse(sessionStorage.getItem('currentUser'));
        return user;
      },
      setUser: function(user) {
        sessionStorage.setItem('currentUser',  JSON.stringify(user));
      },
      clear: function() {
        sessionStorage.removeItem('currentUser');
      }
    };
  })
  .factory('User', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl){
    return $resource(APIBaseUrl + '/user');
  }])
  .factory('Stats', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + 'stats');
  }])
  .factory('Activities', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + '/activities/:activityID');
  }])
  .factory('ActivitiesCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('activities');
  }])
  .factory('Map', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + '/map/:activityID');
  }]);
