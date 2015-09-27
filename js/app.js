(function() {
	var underscore = angular.module('underscore', []);
	underscore.factory('_', ['$window', function($window) {
		return $window._; // assumes underscore has already been loaded on the page
	}]);

	var app = angular.module('app',
		['app.config','app.services','app.controllers','ngRoute','underscore']);

	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html'
			})
			.when('/trivia', {
				templateUrl: 'views/trivia.html'
			})
			.when('/survey', {
				templateUrl: 'views/survey.html'
			})
			.when('/game/intro', {
				templateUrl: 'views/game_intro.html'
			})
			.when('/game/play', {
				templateUrl: 'views/game_play.html'
			})
			.otherwise({redirectTo : '/'});
	}]);
})();