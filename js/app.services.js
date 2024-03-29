(function() {
	var appServices = angular.module('app.services',['app.config','underscore','ngStorage']);

	appServices.factory('triviaService',
		['$http','_','triviaTypes','apiParams',
			function($http,_,triviaTypes,apiParams) {
		return {
			types: _.shuffle(triviaTypes),
			typeIndex: 0,
			getType: function() {
				if (this.typeIndex === this.types.length) {
					this.typeIndex = 0;
				}
				return this.types[this.typeIndex++];
			},
			/**
			 * Get a fact of a specific type for a specific country
			 * @param {Object} country
			 * @param {Object} triviaType
			 * @param {Function} cb
			 */
			getFact: function(country,triviaType,cb) {
				var self = this;
				$http
					.get(apiParams.euLife.url + triviaType.apiUrl, { cache: true, params: {
						variableId: triviaType.variableId,
						filter: triviaType.filter+country.filter,
						user_key: apiParams.euLife.key
					}})
					.success(function(data) {
						var fact = {
							type: triviaType.type,
							percent: self.getPercent(data.TimeSeries,triviaType.option),
							headline: triviaType.getHeadline(country.name)
						};
						if (triviaType.subtitle) {
							fact.subtitle = triviaType.subtitle;
						}
						cb(fact);
					});
			},
			/**
			 * Calculate percent from TimeSeries data
			 * @param {Array} data
			 * @param {Number} option
			 * @return {Number}
			 */
			getPercent: function(data,option) {
				var total = 0;
				var partial = 0;
				for (var i in data) {
					var item = data[i];
					total += item.WeightedFrequency;
					if (item.Value == option) {
						partial += item.WeightedFrequency;
					}
				}
				return Math.round((partial/total) * 100);
			}
		};
	}]);

	appServices.factory('myCountryService',
		['$http','$localStorage','apiParams',
			function($http,$localStorage,apiParams) {
		return {
			getCode: function(cb) {
				if ($localStorage.myCountryCode) {
					cb($localStorage.myCountryCode);
				} else {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function(position) {
							$http.get(apiParams.geoNames.url, { cache: true, params: {
								lat: position.coords.latitude,
								lng: position.coords.longitude,
								type: 'JSON',
								username: apiParams.geoNames.key
							}}).then(function(res) {
								if (res.data.countryCode) {
									var code = res.data.countryCode.toLowerCase();
									$localStorage.myCountryCode = code;
									cb(code);
								} else {
									cb(null);
								}
							}, function() {
								cb(null);
							});
						});
					} else {
						cb(null);
					}
				}
			}
		};
	}]);

	appServices.factory('gameService',
		['$http','$window','_','ageGroups','genders','countryList','gameQuestions','apiParams',
		function($http,$window,_,ageGroups,genders,countryList,gameQuestions,apiParams) {
		return {
			_question:[],
			generateQuestions: function() {
				this._questions = _.shuffle(gameQuestions);
			},
			/**
			 * Generate a random user
			 * @param {Function} cb Receives character object or null on fail
			 */
			generateCharacter: function(cb) {
				var self = this,
					character = {
						age: _.shuffle(ageGroups)[0],
						gender: _.shuffle(genders)[0],
						country: _.shuffle(countryList)[0]
					};

				//Decorate to avoid repetitive calculations
				character.country.code = character.country.code.toLowerCase();
				character.avatar = character.age.code + character.gender.code;
				character.filter = [character.age.filter,character.gender.filter,character.country.filter].join('|');

				$http
					.get(apiParams.behindTheName.url, { params: {
						key: apiParams.behindTheName.key,
						gender: character.gender.code,
						usage: character.country.btn,
						number: 1
					} })
					.then(function(res) {
						var xml = self._parseXML(res.data);
						try {
							character.name = xml.childNodes[0].childNodes[1].childNodes[1].innerHTML;
						} catch (e) {
							character.name = character.gender.code == 'f' ? 'Jane' : 'Joe';
						}
						cb(character);
					});
			},
			/**
			 * Cross-browser XML parsing helper
			 *
			 * @see http://stackoverflow.com/a/17604251
			 * @param {String} string
			 * @throws {Error}
			 * @return {Document}
			 */
			_parseXML: function(string) {
				if (typeof $window.DOMParser != "undefined") {
					return ( new $window.DOMParser() ).parseFromString(string, "text/xml");
				} else if (typeof $window.ActiveXObject != "undefined" &&
					new $window.ActiveXObject("Microsoft.XMLDOM")) {
					var xmlDoc = new $window.ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async = "false";
					xmlDoc.loadXML(string);
					return xmlDoc;
				} else {
					throw new Error("No XML parser found");
				}
			},
			/**
			 * @param {String} characterFilter
			 * @param {Function} cb
			 * @return {Object}
			 */
			drawQuestion: function(characterFilter,cb) {
				var question = this._questions.shift(),
					self = this;
				if (typeof question != 'undefined') {
					$http
						.get(apiParams.euLife.url+'/'+question.type, { params: {
							variableId: question.variableId,
							filter: characterFilter,
							user_key: apiParams.euLife.key
						} })
						.then(function(res) {
							var grouped = _.groupBy(res.data.TimeSeries,'Year'),
								high2007 = self._getHighestValue(grouped[2007]),
								high2011 = self._getHighestValue(grouped[2011]);

							if (high2007 && high2011) {//Both years have data, pick any
								var rand = _.random(1);
								question.correctAnswer = (rand == 0) ? high2007.Value : high2011.Value;
							} else {
								if (high2007) {
									question.correctAnswer = high2007.Value;
								} else {
									if (high2011) {
										question.correctAnswer = high2011.Value;
									} else {
										question.correctAnswer = null;
									}
								}
							}
							cb(question);
						});
				} else {
					cb(null);
				}
			},
			/**
			 * From an array of objects with `WeightedFrequency` property
			 * get an object with highest `WeightedFrequency` property
			 * or null if the answers were missing
			 * @param {Array} arr
			 * @return {Object}|null
			 * @private
			 */
			_getHighestValue: function(arr) {
				arr = _.filter(arr,function(i) { return i.Value !== null; });//Filer nulls
				if (arr.length > 0) {
					arr = _.sortBy(arr, 'WeightedFrequency').reverse();
					return arr[0];
				} else {
					return null;
				}
			},
			/**
			 * @param score
			 * @param name
			 * @param character
			 */
			saveScore: function(score,name,character) {
				$http.post(apiParams.scores.url, {
					score: score,
					name: name,
					character: {
						name: character.name,
						age: character.age.code,
						gender: character.gender.code,
						country: character.country.code
					}
				})
			},
			/**
			 * @param {Function} cb
			 */
			getHighScores: function(cb) {
				$http
					.get(apiParams.scores.url)
					.then(function(res) {
						if (res.data.success) {
							cb(res.data.scores);
						}
					});
			}
		};
	}]);

	appServices.factory('timer', ['$window',function($window) {
		return {
			init: function(options) {
				return new $window.Tock(options);
			}
		};
	}]);

	appServices.factory('questionsService',
		['$http','$localStorage','_','surveyQuestions','apiParams',
			function($http,$localStorage,_,surveyQuestions,apiParams) {
		return {
			pickRandom: function() {
				if (typeof $localStorage.questions == 'undefined') {
					$localStorage.questions = _.shuffle(surveyQuestions);
				}

				return $localStorage.questions.shift();
			},
			/**
			 * @param {String} apiUrl
			 * @param {Number} selected
			 * @param {Function} cb
			 */
			getPercent: function(apiUrl,selected,cb) {
				var total = 0,
					total2 = 0,
					myAnswerVal = 0,
					myAnswerVal2 = 0;
				$http
					.get(apiParams.euLife.url + apiUrl + '&user_key=' + apiParams.euLife.key, { cache: true })
					.success(function(res) {
						angular.forEach(res.TimeSeries, function(value, key){
							if (value.Year == 2011) {
								total = total + value.WeightedFrequency;
								if (value.Value == selected) {
									myAnswerVal = value.WeightedFrequency;
								}									
							}
							if (value.Year == 2007) {
								total2 = total2 + value.WeightedFrequency;
								if (value.Value == selected) {
									myAnswerVal2 = value.WeightedFrequency
								}	
							}
						});
						cb( Math.round((myAnswerVal/total) * 100), Math.round((myAnswerVal2/total2) * 100) );
					});
			},

			/**
			 * @param {String} apiUrl
			 * @param {Array} answers
			 * @param {Function} cb
			 */
			getAllPercents: function(apiUrl, answers, cb) {
				var total = 0;
				var ret = [];

				$http
					.get(apiParams.euLife.url + apiUrl + '&user_key=' + apiParams.euLife.key)
					.success(function(res){
						res.TimeSeries = _.sortBy(res.TimeSeries, 'Value');
						angular.forEach(res.TimeSeries, function(value, key){
							if (value.Year == 2011){
								total = total + value.WeightedFrequency;								
							}							
						});
						angular.forEach(res.TimeSeries, function(value, key){
							if (value.Year == 2011){
								var answer = _.where(answers, { value: value.Value });
								if (_.isEmpty(answer) == false){
									ret.push({ c: [
											{ v : answer[0].text },
											{ v : Math.round((value.WeightedFrequency/total) * 100)}
										]									
									});	
								}
							}							
						});
					cb (ret);
					});
			}
		};
	}]);
})();
