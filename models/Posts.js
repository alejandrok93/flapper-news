var mongoose = require('mongoose');


try {
var PostSchema = new mongoose.Schema({
	title: String,
	link: String,
	upvotes: {type: Number, default: 0},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Post', PostSchema);

PostSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};

}

catch (err){

	console.log(err.message);

}