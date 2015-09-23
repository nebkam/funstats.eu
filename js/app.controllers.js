(function() {
	var appControllers = angular.module('app.controllers',['app.services','app.config','underscore']);

	appControllers.controller('SurveyController', ['$scope','_','questionsService','surveyTopics',
		function($scope,_,questionsService,surveyTopics) {
			$scope.nextQuestion = function() {
				var random = questionsService.pickRandom();
				$scope.question = random.question;
				$scope.answers = random.answers;
				$scope.apiUrl = random.apiUrl;
				$scope.type = random.type;
				var topic = _.where(surveyTopics, { title: random.topic });
				if (topic[0]) {
					$scope.icon = topic[0].icon;
				}
				//Reset
				$scope.percentage = 0;
				$scope.selected = 0;
				$scope.similarAnswer = '';
			};
			$scope.nextQuestion();
			$scope.setSelected = function(value) {
				$scope.selected = value;
			};
			$scope.submit = function() {
				$scope.isLoading = true;
				var selectedOption = _.where($scope.answers,{ value: $scope.selected });
				$scope.similarAnswer = selectedOption[0].text;
				questionsService.getPercent($scope.apiUrl,$scope.selected,function(percent, percent2) {
					$scope.percentage = [percent, percent2];
					$scope.isLoading = false;
				});
			};
		}]);

	appControllers.controller('TriviaController',
		['$scope','_','countryList','triviaService','myCountryService',
			function($scope,_,countryList,triviaService,myCountryService) {

				myCountryService.getCode(function(code) {
					$scope.myCountryCode = code;
				});
				$scope.nextFact = function() {
					$scope.isLoading = true;
					$scope.compareCountries = [];//reset
					$scope.currentCountry = _.shuffle(countryList)[0];//generate random country
					$scope.triviaType = triviaService.getType();//generate pseudo-random type
					triviaService.getFact($scope.currentCountry,$scope.triviaType,function(fact) {
						fact.tweet = encodeURIComponent(fact.percent+'% '+fact.headline+' #EULife');
						$scope.fact = fact;
						$scope.isLoading = false;
					});
				};
				$scope.nextFact();
				$scope.compare = function() {
					angular.forEach(countryList,function(country) {
						triviaService.getFact(country,$scope.triviaType,function(fact) {
							$scope.compareCountries.push({
								name: country.name,
								code: country.code.toLowerCase(),
								percent: fact.percent
							});
						});
					});
				};
			}]);

	appControllers.controller('HeaderController', ['$scope', '$location',
		function($scope, $location) {
			$scope.isActive = function (viewLocation) {
				return viewLocation === $location.path();
			};
		}
	]);

	appControllers.controller('GameController',
		['$scope','characterService',
		function($scope,characterService) {

	}]);
})();