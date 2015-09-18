(function() {
	var app = angular.module('AppChallenge', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/challenge', {
				templateUrl: 'views/challenge.html'
			})
			.when('/trivia', {
				templateUrl: 'views/trivia.html'
			})
			.when('/survey', {
				templateUrl: 'views/survey.html'
			})
			.otherwise({
				templateUrl: 'views/home.html'
			});
	}]);

	app.factory('questions', ['$http',function($http) {
		return {
			pickRandom: function(cb) {
				$http
					.get('/data/questions.json')//TODO caching?
					.success(function(data) {
						cb( data.questions[Math.floor(Math.random() * data.questions.length)] );
					});
			}
		};
	}]);

	app.controller('TriviaController', ['$scope', function($scope) {
		$scope.photo = 'https://snap-photos.s3.amazonaws.com/img-thumbs/960w/SS4TB1O5NQ.jpg';
		$scope.percent = 23;
		$scope.text = 'of women in Serbia are single';
	}]);

	app.controller('SurveyController', ['$scope','$http','questions',function($scope,$http,questions) {
		$scope.question = '';
		$scope.answers = [];
		$scope.apiUrl = '';

		questions.pickRandom(function(random) {
			$scope.question = random.question;
			$scope.answers = random.answers;
			$scope.apiUrl = random.apiUrl;
		});

		$scope.setSelected = function(value) {
			$scope.selected = value;
		};
		$scope.submit = function() {
			$http
				.get($scope.apiUrl + '&user_key=32c520dabe65f1a197868d539b89048b')
				.success(function(res) {
					console.log(res);
				});
		};
	}]);
})();