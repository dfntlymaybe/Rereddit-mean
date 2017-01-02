app.controller('NavCtrl', ['$scope', 'auth','$state',  function($scope, auth, $state){
  // debugger;   
  // var a = auth.currentUser();
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logIn = auth.logIn;
  $scope.logOut = function(){
    auth.logOut();
    $state.go('home');
  };

}]);