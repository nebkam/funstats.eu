(function() {
	var app = angular.module('AppChallenge', []);
	app.controller('CountryController', ['$scope','$http', function($scope,$http) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				$http.get('http://ws.geonames.org/countryCode', { params: {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
					type: 'JSON',
					username: 'demo'
				}}).success(function(res) {
					$scope.code = res.countryCode.toLowerCase();
					$scope.name = res.countryName;
				});
			});
		}
		}]);
})();