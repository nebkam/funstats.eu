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
})();