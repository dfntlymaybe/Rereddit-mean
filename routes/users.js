/*****************Imports******************/

var express = require('express');
var passport = require('passport');
var expressJWT = require('express-jwt');

require('../config/passport');

var User = require('../models/Users');
var router = express.Router();
var auth = expressJWT({secret: 'myLittleSecret'});


/**************middleware***********************/

//Create the user object(by ID) and hand it to the next func
router.param('user', function(req, res, next, id) {
  var query = User.findById(id);

  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    req.user = user;
    console.log(req.user);//dev
    return next();
  });
});

/**************Handlers*******************/

router.get('/', function(req, res, next) {
  res.send('this is from /users!');
});

//Get specific user with friends
router.get('/:userID', function(req, res, next) {
  console.log("get user: " + req.params.userID);//dev
  User.findById(req.params.userID).populate('friends').exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find post')); }
    console.log(user);//dev
    req.user = user;
    res.json(user);    
  });
});

//Add friend to specific user
router.post('/:user/friends' , function(req, res, next) {

  console.log('save new friend for user: ' + req.user._id);//dev
  
  User.findById(req.body.id).exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    var friend = user;
    req.user.friends.push(friend);

    req.user.save(function(err, me) {
      if(err){ return next(err); }
      
      friend.friends.push(req.user);
      friend.save(function(err, myFriend) {
        if(err){ return next(err); }
        res.json(me);
      });
    });
    
  });
  

});



module.exports = router;