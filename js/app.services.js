(function() {
	var appServices = angular.module('app.services',['app.config','underscore','ngStorage']);

	appServices.factory('triviaService',
		['$http','_','baseUrl','userKey','triviaTypes',
			function($http,_,baseUrl,userKey,triviaTypes) {
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
					.get(baseUrl + triviaType.apiUrl, { cache: true, params: {
						variableId: triviaType.variableId,
						filter: triviaType.filter+country.filter,
						user_key: userKey
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

	appServices.factory('myCountryService', ['$http','$localStorage', function($http,$localStorage) {
		return {
			getCode: function(cb) {
				if ($localStorage.myCountryCode) {
					cb($localStorage.myCountryCode);
				} else {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function(position) {
							$http.get('http://ws.geonames.org/countryCode', { cache: true, params: {
								lat: position.coords.latitude,
								lng: position.coords.longitude,
								type: 'JSON',
								username: 'nebkam'
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

	appServices.factory('characterService',
		['$http','_','ageGroups','genders','countryList',
		function($http,_,ageGroups,genders,countryList) {
		return {
			/**
			 * Generate a random user
			 * @param {Function} cb Receives character object or null on fail
			 */
			generate: function(cb) {
				var character = {
					age: _.shuffle(ageGroups)[0],
					gender: _.shuffle(genders)[0],
					country: _.shuffle(countryList)[0]
				};
				var gender_option = (character.gender.readable == 'man') ? 'male' : 'female';
				$http
					.get('http://api.randomuser.me/', { params: { gender: gender_option } })
					.then(function(res) {
						var name = res.data.results[0].user.name.first;
						if (name) {
							character.name = name;
							cb(character);
						} else {
							cb(null);
						}
					});
			}
		};
	}]);

	appServices.factory('questionsService', ['$http','_','surveyQuestions','baseUrl','userKey', function($http,_,surveyQuestions,baseUrl,userKey) {
		return {
			pickRandom: function() {
				return _.shuffle(surveyQuestions)[0];
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
					.get(baseUrl + apiUrl + '&user_key=' + userKey, { cache: true })
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
			}
		};
	}]);
})();
