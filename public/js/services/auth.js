app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {};

   auth.getToken = function (){
    return $window.localStorage['rereddit-jwt'];
   }

   auth.saveToken = function (token) {
     $window.localStorage['rereddit-jwt'] = token;
   };

   auth.register = function (user) {
     return $http.post('/register', user).then(function(data){
       auth.saveToken(data.data.token);
     });
   };

   auth.logIn = function(user){
    return $http.post('/login', user).then(function(data){
      auth.saveToken(data.data.token);
    });
   }

   auth.isLoggedIn = function(){
    var token = auth.getToken();

    if(token){
      return true;
    }else{
      return false;
    }
   }

   auth.currentUser = function(){
     if(auth.isLoggedIn()){
       var token = auth.getToken();
       var decodedToken = JSON.parse($window.atob(token.split('.')[1]));

       return decodedToken.username;
     }else{
      return "Guest";
     }
   };

   auth.logOut = function(){
     $window.localStorage.removeItem('rereddit-jwt');
   };

  return auth;
}]);