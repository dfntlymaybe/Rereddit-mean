var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  user: String,
  text: String,
  upvotes: {type: Number, default: 0},
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

CommentSchema.methods.incrementUpvotes = function(){
  this.upvotes++;
};


var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;