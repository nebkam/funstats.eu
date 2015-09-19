/**
 *
 * @param {Array} arr
 * @returns {*}
 */
window.random = function(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
};

(function() {
	var app = angular.module('app', ['app.config','ngRoute']);

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

	app.controller('TriviaController', ['$scope','$http','triviaTypes','countryList','baseUrl','userKey',
		function($scope,$http,triviaTypes,countryList,baseUrl,userKey) {
		$scope.init = function() {
			var triviaType = random(triviaTypes);
			var country = random(countryList);
			$http
				.get(baseUrl + triviaType.apiUrl, { params: {
					variableId: triviaType.variableId,
					filter: country.filter,
					user_key: userKey
				}})
				.success(function(data) {
					$scope.type = triviaType.type;
					$scope.headline = triviaType.getHeadline(data);
					$scope.text = triviaType.getText(country.name);
				});
		};
		$scope.init();
	}]);

	app.controller('SurveyController', ['$scope','$http','questions','baseUrl','userKey',
		function($scope,$http,questions,baseUrl,userKey) {
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
				.get(baseUrl + $scope.apiUrl + '&user_key=' + userKey)
				.success(function(res) {
					console.log(res);
				});
		};
	}]);
})();