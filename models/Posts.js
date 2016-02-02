var mongoose = require('mongoose');


try {
var PostSchema = new mongoose.Schema({
	title: String,
	link: String,
	upvotes: {type: Number, default: 0},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Post', PostSchema);

}

catch (err){

	console.log(err.message);

}