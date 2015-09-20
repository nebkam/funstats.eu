/**
 *
 * @param {Array} arr
 * @returns {*}
 */
window.random = function(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
};

(function() {
	var underscore = angular.module('underscore', []);
	underscore.factory('_', ['$window', function($window) {
		return $window._; // assumes underscore has already been loaded on the page
	}]);

	var app = angular.module('app', ['app.config','app.services','ngRoute','underscore']);

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

	app.controller('TriviaController',
		['$scope','_','countryList','triviaService',
			function($scope,_,countryList,triviaService) {
		$scope.nextFact = function() {
			$scope.compareCountries = [];//reset
			$scope.currentCountry = _.shuffle(countryList)[0];//generate random country
			$scope.triviaType = triviaService.getType();//generate pseudo-random type
			triviaService.getFact($scope.currentCountry,$scope.triviaType,function(fact) {
				$scope.fact = fact;
			});
		};
		$scope.nextFact();
		$scope.compare = function() {
			angular.forEach(countryList,function(country) {
				triviaService.getFact(country,$scope.triviaType,function(fact) {
					$scope.compareCountries.push({
						name: country.name,
						code: country.code.toLowerCase(),
						headline: fact.headline
					});
				});
			});
		};
	}]);

	app.controller('SurveyController', ['$scope','$http','questions','baseUrl','userKey',
		function($scope,$http,questions,baseUrl,userKey) {
		$scope.question = '';
		$scope.answers = [];
		$scope.apiUrl = '';
		$scope.percentage = 0;
		questions.pickRandom(function(random) {
			$scope.question = random.question;
			$scope.answers = random.answers;
			$scope.apiUrl = random.apiUrl;
			$scope.type = random.type;
		});

		$scope.setSelected = function(value) {
			$scope.selected = value;
		};
		$scope.submit = function() {			
			total = 0;
			$http
				.get(baseUrl + $scope.apiUrl + '&user_key=' + userKey)
				.success(function(res) {
					angular.forEach(res.TimeSeries, function(value, key){
						if (value.Year == 2011){
							total = total + value.WeightedFrequency;	
							if (value.Value == $scope.selected){
								myAnswerVal = value.WeightedFrequency;
							}
						}						
					});
				
				$scope.percentage = Math.round((myAnswerVal/total) * 100)+'%';	
				});
		};
	}]);

	app.controller('HeaderController', ['$scope', '$location',
			function($scope, $location) {
				 $scope.isActive = function (viewLocation) { 
       			 return viewLocation === $location.path();
   				 };
			}
		]);
})();