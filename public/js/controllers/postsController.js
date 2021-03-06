app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', 'singlePostPromise','auth' , function($scope, $stateParams, posts, singlePostPromise, auth) {
  
  // $scope.post = posts.posts[$stateParams.id];
  //console.log(posts.posts[$stateParams.id]);
  $scope.post = singlePostPromise;

  $scope.addComment = function() {
    if ($scope.body === '') { return; }
    var comment = {
      user: auth.currentUser(),
      text: $scope.body
    }
    posts.addComment($scope.post._id, comment);
    $scope.body = '';
  }

  $scope.incrementUpvotes = function(item) {
    posts.upvoteComment($scope.post, item);
  }

}]);