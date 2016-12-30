
app.factory('posts', ['$http', function($http) {
  var postService = {
    posts: [],

    //for GETting all the posts list
    getAll: function() {
      return $http.get('/posts').then(function(data){
        angular.copy(data.data, postService.posts);
        // return postService.posts;
      });
    },

    // for GETting one post and it's comments 
    get: function(id) {
      return $http.get('/posts/' + id).then(function(data){
        var post = {};
        angular.copy(data.data, post);
        for(var i = 0; i < postService.posts.length; i++){
          if(postService.posts[i]._id == id){
            postService.posts[i] = post;
            return postService.posts[i];
          }
        }
      });
    },

    // for POSTing one new post
    create: function(post) {
      $http.post('/posts', post).then(function(data){
        var newPost = {};
        angular.copy(data.data, newPost);
        postService.posts.push(newPost);
      })
    },

    // for increasing the upvotes to one post
    upvote: function(post) {
      $http.put('/posts/' + post._id).then(function(data){
        for(var i = 0; i < postService.posts.length; i++){
          if(postService.posts[i]._id == post._id){
            postService.posts[i].upvotes++;
          }
        }
      });
    },

    // for adding a comment to one post
    addComment: function(id, comment) {
      $http.post('/posts/' + id + '/comments', comment).then(function(data){
        debugger;
        for(var i = 0; i < postService.posts.length; i++){
          if(postService.posts[i]._id == id){
            var newComment = {};
            angular.copy(data.data, newComment);
            postService.posts[i].comments.push(newComment);
            return;
          }
        }      
      })
    },

    // for upvoting a comment on a specific post
    upvoteComment: function(post, comment) {
      $http.put('/posts/' + post._id + '/comments/' + comment._id).then(function(data){
        for(var i = 0; i < postService.posts.length; i++){
          if(postService.posts[i]._id == post._id){
            for(var j in postService.posts[i].comments){
              if(postService.posts[i].comments[j]._id == comment._id){
                postService.posts[i].comments[j].upvotes++;
              }
            }
          }
        }
      });
    }

  };
  
  return postService;
}]);