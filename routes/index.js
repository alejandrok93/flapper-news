var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

module.exports = router;


/*GET all posts */
router.get('/posts', function(req, res, next) {
	Post.find(function(err, posts) {
		if(err) {return next(err); }

		res.json(posts);
	});
});


/*POST method to save new post to db */
router.post('/posts', function(req, res, next) {
	var post = new Post(req.body);

	post.save(function(err, post) {
		if(err) {return next(err); }

		res.json(post);

	});
});

/*Express param function to get post and be able to use :post */
router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);

	query.exec(function (err, post) {
		if (err) {return next(err); }
		if (!post) {return next(new Error('cant find post')); }

		req.post = post;
		return next();
	});
});

/*Express param function to get comment use :comment */
router.param('comment', function(req, res, next, id) {
	var query = Comment.findById(id);

	query.exec(function (err, comment) {
		if (err) { return next(err); }
		if (!comment) { return next(new Error('cant find comment')); }

		req.comment = comment;
		return next();
	})
})


/*Populate method to retrieve comments along with post */
router.get('/posts/:post', function (req, res, next) {
	req.post.populate('comments', function(err, post) {
		if (err) { return next(err); }

		res.json(post);
	});
});

/*GET method to get a single post */
router.get('/posts/:post', function(req, res) {
	res.json(req.post);
})

/*PUT method to update upvote for a post */
router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

/* PUT method to update upvote for a comment */
router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
	req.comment.upvote(function(err, comment) {
		if (err) { return next(err); }

		res.json(comment);
	});
});


/*POST method for adding a new comment to a post */
router.post('/posts/:post/comments', function(req, res, next) {
	//comment object from Comment schema object
	var comment = new Comment(req.body);
	comment.post = req.post;

	//Save comment to db
	comment.save(function(err, comment) {
		if(err) { return next(err); }

		req.post.comments.push(comment);

		req.post.save(function(err, post) {
			if (err) { return next(err); }

			res.json(comment);
		});
	});
});

// /*Populate method to retrieve comments along with post */
// router.get('/posts/:post', function (req, res, next) {
// 	req.post.populate('comments', function(err, post) {
// 		if (err) { return next(err); }

// 		res.json(post);
// 	});
// });
