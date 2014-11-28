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
      //if(path == "/user details") path = "user";
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
  .controller('DashCtrl', function($scope, $location, User, CurrentUser, PageTitle) {
    PageTitle.setTitle('Dashboard');
    $("#appHeader").removeClass('hidden');
    var user = CurrentUser.getUser();
    if(! user) {
      user = User.get(function (user) {
        CurrentUser.setUser(user);
      });
    }
    $scope.user = user;
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
