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
    return $resource(APIBaseUrl + '/stats');
  }])
  .factory('StatsCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('stats');
  }])
  .factory('Activities', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + '/activities/:activityID');
  }])
  .factory('ActivitiesCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('activities');
  }])
  .factory('Map', ['$resource', 'APIBaseUrl', function($resource, APIBaseUrl) {
    return $resource(APIBaseUrl + '/map/:activityID');
  }])
  .factory('CalcStats', function() {
    return {
      getAverage: function(objArr, propName) {
        console.log("objArr[propName]", objArr[propName]);
        var sum = 0, count = 0;
        objArr[propName].forEach(function(activity) {
          console.log("activity[propName]", activity[propName]);
          sum += activity[propName];
          count ++;
        });
        return roundToTwo(sum / count);
      },

      getTotal: function(objArr, propName) {
        var sum = 0;
        objArr[propName].forEach(function(activity) {
          sum += activity[propName];
        });
        return roundToTwo(sum);
      },

      getMaximum: function(objArr, propName) {
        var max = 0, maxObj = {};
        objArr[propName].forEach(function(activity) {
          if(activity[propName] > max) {
            max = activity[propName];
            maxObj._id = activity._id;
            maxObj[propName] = roundToTwo(max);
          }
        });
        return maxObj;
      }
    }

    function roundToTwo(num) {
      return +(Math.round(num + "e+2")  + "e-2");
    }
  });
