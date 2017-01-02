/*****************Imports******************/

var express = require('express');
var router = express.Router();


/**************Handlers*******************/

router.get('/', function(req, res, next) {
  res.send('this is from /users!');
});



module.exports = router;