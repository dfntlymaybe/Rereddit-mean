var app = angular.module('redditFun', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/templates/home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise:  function (posts){
             posts.getAll();
          }
        }
      })
      .state('post', {
        url: '/posts/:id',
        templateUrl: '/templates/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          singlePostPromise:  function (posts, $stateParams){
           return posts.get($stateParams.id);
          }
        }
      });

      $urlRouterProvider.otherwise('home');
}]);
