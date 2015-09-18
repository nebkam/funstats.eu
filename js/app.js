(function() {
	var app = angular.module('AppChallenge', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/challenge', {
				templateUrl: 'views/challenge.html'
			})
			.when('/fun-facts', {
				templateUrl: 'views/fun-facts.html'
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

	app.controller('CountryController', ['$scope','$http', function($scope,$http) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				$http.get('http://ws.geonames.org/countryCode', { params: {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
					type: 'JSON',
					username: 'nebkam'
				}}).success(function(res) {
					$scope.code = res.countryCode.toLowerCase();
					$scope.name = res.countryName;
				});
			});
		}
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