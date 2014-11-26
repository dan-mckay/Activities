angular.module('appServices', ['ngResource'])
  .factory('APIBaseUrl', function() {
    var host = '127.0.0.1';
    var port = '3000';
    return host + ':' + port + '/api';
  })
  .factory('MenuItems', function() {
    return [
      { name: 'accounts',      icon: '\ud83d\udc65' },
      { name: 'cases',         icon: '\ud83d\udec6' },
      { name: 'campaigns',     icon: '\ud83d\udcf0' },
      { name: 'opportunities', icon: '\ud83c\udfaf' }
    ];
  })
  .factory('PageTitle', function() {
    var title = 'Activities';
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
