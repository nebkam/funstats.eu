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
			.when('/home', {
				templateUrl: 'views/home.html'
			})
			.otherwise({
				templateUrl: 'views/home.html'
			});
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

	app.controller('SurveyController', ['$scope','$http',function($scope,$http) {
		$scope.question = 'Do your working hours fit in with your family or social commitments outside work?';
		$scope.questions = [
			{ value: 1, text: 'Very well' },
			{ value: 2, text: 'Fairly well' },
			{ value: 3, text: 'Not very well' },
			{ value: 4, text: 'Not at all well' }
		];
		$scope.setSelected = function(value) {
			$scope.selected = value;
		};
		$scope.submit = function() {
			//console.log($scope.selected);
			$http
				.get('https://api.ukdataservice.ac.uk/V1/datasets/EQLS/TimeseriesFrequency?variableId=170&filter=&user_key=32c520dabe65f1a197868d539b89048b')
				.success(function(res) {
					for (var prop in res.TimeSeries) {
						var item = res.TimeSeries[prop];
						if (item.Year == 2011) {
							//console.log(item);
						}
					}
				});
		};
	}]);
})();