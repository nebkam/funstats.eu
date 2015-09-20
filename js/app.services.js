(function() {
	var appServices = angular.module('app.services',['app.config','underscore']);

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
					.get(baseUrl + triviaType.apiUrl, { params: {
						variableId: triviaType.variableId,
						filter: country.filter,
						user_key: userKey
					}})
					.success(function(data) {
						var fact = {
							type: triviaType.type,
							headline: self.getPercent(data.TimeSeries,triviaType.option)+'%',
							text: triviaType.getText(country.name)
						};
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
})();
