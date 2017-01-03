
/********************imports*******************/

var express = require('express');
var passport = require('passport');
var expressJWT = require('express-jwt');

require('../config/passport');

var Post = require('../models/posts');
var Comment = require('../models/comments');
var User = require('../models/Users');
var router = express.Router();
var auth = expressJWT({secret: 'myLittleSecret'});


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
router.get('/:postID', auth, function(req, res, next) {
  console.log("get post: " + req.params.postID);//dev
  //Getting the post include all comments:
  Post.findById(req.params.postID).populate('comments').exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    res.json(post);    
  });
});

//Increment upvotes for a specific post
router.put('/:post', auth, function(req, res, next) {
  console.log('Increment upvotes for post: ' + req.post._id);//dev

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
router.put('/:post/comments/:comment', auth, function(req, res, next) {

  console.log('Increment upvotes for comment: ' + req.params.comment);//dev
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
router.post('/:post/comments',auth , function(req, res, next) {

  console.log('save new comment for post: ' + req.post._id);//dev
  var comment = new Comment(req.body);
  comment.post = req.post._id;

  comment.save(function(err, com){
    if(err){ return next(err); }
    req.post.comments.push(com);
    req.post.save(function(err, post) {
      if(err){ return next(err); }
      res.json(com);
    });
  });
});

//Save new post
router.post('/', auth, function(req, res, next) {
  var post = new Post(req.body);
  console.log('save new post: ' + post._id);//dev
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