(function() {
	var appServices = angular.module('app.services',['app.config','underscore']);

	appServices.factory('triviaService',
		['$http','_','baseUrl','userKey','triviaTypes','countryList',
			function($http,_,baseUrl,userKey,triviaTypes,countryList) {
		return {
			types: _.shuffle(triviaTypes),
			typeIndex: 0,
			getType: function() {
				if (this.typeIndex === this.types.length) {
					this.typeIndex = 0;
				}
				return this.types[this.typeIndex++];
			},
			getFact: function(cb) {
				var triviaType = this.getType();
				var country = _.shuffle(countryList)[0];
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
