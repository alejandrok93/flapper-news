var mongoose = require('mongoose');

try {
var CommentSchema = new mongoose.Schema({
	body: String,
	author: String,
	upvotes: {type: Number, default: 0},
	post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});


CommentSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};


/* mongoose.model MUST go at the end, after all methods!!!! */
mongoose.model('Comment', CommentSchema);

}

catch (err) {
	console.log(err.message);
}