/********************imports*******************/

var Post = require('../models/posts');
var Comment = require('../models/comments');
var express = require('express');
var router = express.Router();


/**************middleware***********************/

//Create the post object(by ID) and hand it to the next func
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

/*******************Event handlers*********************/

//Get specific post
router.get('/:postID', function(req, res, next) {

  //Getting the post include all comments:
  Post.findById(req.params.postID).populate('comments').exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    res.json(post);    
  });
});

//Increment upvotes for a specific post
router.put('/:post', function(req, res, next) {

  req.post.incrementUpvotes();
  req.post.save(function(err, post){
    if(err){
      console.log(err);
    }else{
      res.send(post);
    }
  })
});

//Increment upvotes by 1 to specific comment
router.put('/:post/comments/:comment', function(req, res, next) {

  Comment.findById(req.params.comment, function(err, comment){
    comment.incrementUpvotes();
    comment.save(function(err, com){
      if(err){
        console.log(err);
      }else{
        res.send(com);
      }
    })
  })
});

//Save new comment to a specific post
router.post('/:post/comments', function(req, res, next) {

  var comment = new Comment(req.body);
  comment.post = req.post._id;

  comment.save(function(err, com){
    if(err){ return next(err); }
    req.post.comments.push(com);
    req.post.save(function(err, post) {
      if(err){ return next(err); }
      res.json(post);
    });
  });
});

//Save new post
router.post('/', function(req, res, next) {
  var post = new Post(req.body);
  post.save(function(err, post){
    if(err){
      console.log(err);
    }else{
      res.send(post);
    }
  })
});

//Get all posts
router.get('/', function (req, res, next) {
  console.log("Send All posts");//dev
  
  Post.find(function (error, posts){
    if(error){ return next(err); }
    res.send(posts);
  
  });
});

module.exports = router;