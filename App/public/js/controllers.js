/* Controllers */
angular.module('appControllers', [
  'appServices'
  ])
  .controller('HeaderCtrl', function($scope, $location, PageTitle) {
    $scope.PageTitle = PageTitle;
    $scope.go = function(path) {
      $location.path(path);
    }
  })
  .controller('MenuCtrl', function($scope, $location, MenuItems) {
    $scope.menuItems = MenuItems;
    $scope.go = function(path, $spMenu) {
      $location.path(path);
      console.log(path);
      $spMenu.hide();
    }
  })
  .controller('RootCtrl', function($scope, $location, User, CurrentUser, PageTitle) {
    PageTitle.setTitle('Welcome');
    $("#appHeader").addClass('hidden');
    $scope.welcome = "COME ON IN!";
    $scope.go = function(path) {
      $location.path(path);
    }
    // Get from session storage if it is there
    var user = CurrentUser.getUser();
    if(! user) {
      User.get(function(data) {
        user = data
        CurrentUser.setUser(user);
        $scope.user = user;
      });
    }
    else {
      $scope.user = user;
    }

  })
  .controller('DashCtrl', function($scope, $location, User, CurrentUser, Stats, CalcStats, CalcActivities, Activities,  PageTitle) {
    PageTitle.setTitle('Dashboard');
    $("#appHeader").removeClass('hidden');
    // Get from session storage if it is there
    $scope.user = CurrentUser.getUser();

    getAppStats();
    getActivities();

    function getAppStats() {
      var stats = {};
      Stats.get(function(data) {
        stats.activityCount = data.activityCount;
        stats.avgMovingSpeed = CalcStats.getAverage(data, "avgMovingSpeed");
        stats.avgHeartBeat = CalcStats.getAverage(data, "avgHeartBeat");
        stats.totalCalsBurned = Math.round(CalcStats.getTotal(data, "calsBurned"));
        stats.totalDistCovered = CalcStats.getTotal(data, "totalDistCovered");
        stats.totalTimeMoving = CalcStats.getTotal(data, "totalTimeMoving");
        stats.totalTime = CalcStats.getTotal(data, "totalTime");
        $scope.stats = stats;
      });
    }

    function getActivities() {
      Activities.query(function(data) {
        $scope.activities = CalcActivities.orderByNumDesc(data, "beginTimeRaw", 5);
      });
    }
  })
  .controller('ActivitiesCtrl', function($scope, $location, PageTitle, PageTitle) {
    PageTitle.setTitle('Activities');
    // $scope.accounts = AccountsCache.get('accounts');
    // if(!$scope.accounts) {
    //   $scope.accounts = Accounts.query();
    //   AccountsCache.put('accounts', $scope.accounts);
    // }
    $scope.go = function(path) {
      $location.path(path);
    }
  })
  .controller('ActivityCtrl', function($scope, $routeParams, Accounts, PageTitle) {
    PageTitle.setTitle('Activities');
  })
  .controller('SportsCtrl', function($scope, $location, PageTitle) {
    PageTitle.setTitle('Sports');
    // $scope.accounts = AccountsCache.get('accounts');
    // if(!$scope.accounts) {
    //   $scope.accounts = Accounts.query();
    //   AccountsCache.put('accounts', $scope.accounts);
    // }
    $scope.go = function(path) {
      $location.path(path);
    }
  })
  .controller('SportCtrl', function($scope, $routeParams, PageTitle) {
    PageTitle.setTitle('Sport');
    console.log('SportCtrl')
  })
  .controller('UserCtrl', function($scope, CurrentUser, PageTitle) {
    PageTitle.setTitle('User Details');
    $scope.user = CurrentUser.getUser();
    PageTitle.setTitle('User Details');
  })
  .controller('LogoutCtrl', function($scope, $location, CurrentUser, PageTitle) {
    console.log('LogoutCtrl')
    CurrentUser.clear();
    $location.path('/');
  });
