/**
 *
 * @param {Array} arr
 * @returns {*}
 */
window.random = function(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
};
window.baseUrl = 'https://api.ukdataservice.ac.uk/V1/datasets/EQLS';
window.userKey = "32c520dabe65f1a197868d539b89048b";

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
						cb( random(data.questions) );
					});
			}
		};
	}]);

	app.controller('TriviaController', ['$scope','$http', function($scope,$http	) {
		var triviaType = random(window.trivia);
		$scope.type = triviaType.type;
		var country = random(window.countries);
		$http
			.get(window.baseUrl + triviaType.apiUrl, { params: {
				variableId: triviaType.variableId,
				filter: country.filter,
				user_key: window.userKey
			}})
			.success(function(data) {
				$scope.percent = triviaType.getPercent(data);
				$scope.text = triviaType.getText(country.name);
			});
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
				.get(window.baseUrl + $scope.apiUrl + '&user_key=' + window.userKey)
				.success(function(res) {
					console.log(res);
				});
		};
	}]);
})();