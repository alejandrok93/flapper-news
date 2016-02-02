var mongoose = require('mongoose');

try {
var CommentSchema = new mongoose.Schema({
	body: String,
	author: String,
	upvotes: {type: Number, default: 0},
	post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});
mongoose.model('Comment', CommentSchema);
}

catch (err) {
	console.log(err.message);
}