app.controller('MainCtrl', ['$scope','posts',  function($scope, posts){

  $scope.posts = posts.posts;

  $scope.addPost = function(){
    var post = {
      title: $scope.title,
      link: $scope.link
    }
    posts.create(post);
    $scope.title = '';
    $scope.link = '';
  }

  $scope.incrementUpvotes = function(item) {
    posts.upvote(item);
  }

}]);