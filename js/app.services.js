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
			 * Get a fact by a specific country
			 *
			 * @param {Object} country
			 * @param {Function} cb
			 */
			getFact: function(country,cb) {
				var triviaType = this.getType();
				$http
					.get(baseUrl + triviaType.apiUrl, { params: {
						variableId: triviaType.variableId,
						filter: country.filter,
						user_key: userKey
					}})
					.success(function(data) {
						var fact = {
							type: triviaType.type,
							headline: triviaType.getHeadline(data),
							text: triviaType.getText(country.name)
						};
						cb(fact);
					});
			}
		};
	}]);
})();
