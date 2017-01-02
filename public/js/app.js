// var app = angular.module('redditFun', ['ui.router']);

// app.config([
//   '$stateProvider',
//   '$urlRouterProvider',
//   function($stateProvider, $urlRouterProvider) {
//     $stateProvider
//       .state('home', {
//         url: '/home',
//         templateUrl: '/templates/home.html',
//         controller: 'MainCtrl',
//         resolve: {
//           postPromise:  function (posts){
//              posts.getAll();
//           }
//         }
//       })
//       .state('post', {
//         url: '/posts/:id',
//         templateUrl: '/templates/posts.html',
//         controller: 'PostsCtrl',
//         resolve: {
//           singlePostPromise:  function (posts, $stateParams){
//            return posts.get($stateParams.id);
//           }
//         }
//       });

//       $urlRouterProvider.otherwise('home');
// }]);


var app = angular.module('redditFun', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
       }
    })
    .state('post', {
      url: '/posts/:id',
      templateUrl: '/templates/posts.html',
      controller: 'PostsCtrl',
      resolve: {
        singlePostPromise: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'AuthCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'AuthCtrl'
    })

  $urlRouterProvider.otherwise('home');
}]);