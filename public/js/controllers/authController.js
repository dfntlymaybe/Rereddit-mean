app.controller('AuthCtrl', ['$scope', 'auth', '$state', function($scope, auth, $state){
  $scope.user = {};

  $scope.register = function () {
    auth.register($scope.user).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function () {
    auth.logIn($scope.user).then(function(){
      $state.go('home');
    });
  };

}])

