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
  })
  .controller('DashCtrl', function($scope, $location, User, CurrentUser, Stats, StatsCache, CalcStats, PageTitle) {
    console.log('DashCtrl called');
    var stats = {};
    PageTitle.setTitle('Dashboard');
    $("#appHeader").removeClass('hidden');
    var user = CurrentUser.getUser();
    console.log('User from sessionStorage', user);
    if(! user) {
      User.get(function(data) {
        user = data
        CurrentUser.setUser(user);
        $scope.user = user;
        getAppStats();
      });
    }
    else {
      $scope.user = user;
      getAppStats();
    }

    function getAppStats() {
      var appStats = StatsCache.get('stats');
      console.log('appStats 1', appStats);
      if(! appStats) {
        Stats.get(function(data) {
          console.log('appStats 2', appStats);
          appStats = data;
          StatsCache.put('stats', appStats);
          setStatsforDash(appStats);
        });
      }
      else {
        console.log('appStats 3', appStats);
        setStatsforDash(appStats);
      }
    }

    function setStatsforDash(appStats) {
      stats.activityCount = appStats.activityCount;
      stats.avgMovingSpeed = CalcStats.getAverage(appStats, "avgMovingSpeed");
      stats.avgHeartBeat = CalcStats.getAverage(appStats, "avgHeartBeat");
      stats.totalCalsBurned = CalcStats.getTotal(appStats, "calsBurned");
      stats.totalDistCovered = CalcStats.getTotal(appStats, "totalDistCovered");
      $scope.stats = stats;
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
