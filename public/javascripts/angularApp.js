var app = angular.module('flapperNews', ['ui.router']);

app.config ([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('home', 
		{
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		});

		$urlRouterProvider.otherwise('home');
	
	$stateProvider
	.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'

		});	
	}
	
	])

app.factory('posts', [function(){
	//service body
	var o = {
		posts: []
	};
	return o;
}]);

app.controller('MainCtrl', [
	'$scope',
	'posts',
	function($scope, posts) {
	//	$scope.test = "Hello World - Flapper News";

		$scope.addPost = function() {
			if(!$scope.title || $scope.title === '') {
				return;
			}
			$scope.posts.push({
				title: $scope.title,
				link: $scope.link, 
				upvotes: 0,
				comments: [
				{author: 'Joe', body: 'Cool Post!', upvotes: 0},
				{author: 'Alejandro', body: 'Great post', upvotes: 0},
				]
			});
			$scope.title ='';
			$scope.link = '';
		};

		$scope.incrementUpvotes = function(post) {
			post.upvotes += 1;
		};

		$scope.posts = posts.posts;

	}]);



app.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts) {
		$scope.posts = posts.posts[$stateParams.id];

		$scope.addComment = function(){
		  if($scope.body === '') { return; }
			  $scope.posts.comments.push({
			    body: $scope.body,
			    author: 'user',
			    upvotes: 0
		  });
		  
		  $scope.body = '';
		};


	}]);




