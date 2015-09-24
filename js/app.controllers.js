(function() {
	var appControllers = angular.module('app.controllers',['app.services','app.config','underscore', 'googlechart']);

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

			$scope.showCharts = function() {
				$scope.percentages = [];
				questionsService.getAllPercents($scope.apiUrl, function(percents) {
					angular.forEach(percents, function(value, key){
					
					});		
				});	

				$scope.showChart = true;
				$scope.chartObject = {};
		    	$scope.chartObject.type = "BarChart";

			    $scope.chartObject.data = {"cols": [
			        {id: "t", label: "Answer", type: "string"},
			        {id: "s", label: "Percent", type: "number"}
			    ], "rows": [
			        {c: [
			            {v: "Odg 1"},
			            {v: 3}
			        ]},
			        {c: [
			            {v: "Odg 2"},
			            {v: 5}
			        ]},
			        {c: [
			            {v: "Odg 3"},
			            {v: 1}
			        ]},
			        {c: [
			            {v: "Odg 4"},
			            {v: 2}
			        ]}
			    ]};

	      	  $scope.chartObject.options = {
	      	 	 'title': 'What others said'
	  		  };
			}
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

	appControllers.controller('GamePlayController',
		['$scope','gameService',
			function($scope,gameService) {
		$scope.isLoading = true;
		$scope.scene = '';
		$scope.score = 0;

		gameService.generateCharacter(function(character) {
			$scope.isLoading = false;
			$scope.character = character;
			$scope.scene = 'character';
		});

		$scope.showQuestion = function() {
			$scope.isLoading = true;
			//Reset
			$scope.selectedAnswer = null;
			$scope.answerSubmitted = false;
			//Draw (next)
			gameService.drawQuestion($scope.character.filter,function(question) {
				//Show it
				if (question) {
					$scope.question = question;
					$scope.scene = 'question';
					//Or end the game
				} else {
					$scope.scene = 'end';
				}
				$scope.isLoading = false;
			});
		};

		$scope.setSelected = function(value) {
			$scope.selectedAnswer = value;
		};

		$scope.submitAnswer = function() {
			$scope.answerSubmitted = true;
			if ($scope.selectedAnswer == $scope.question.correctAnswer) {
				$scope.score += 1;
			}
		};
	}]);
})();