(function() {
	var appServices = angular.module('app.services',['app.config']);

	appServices.factory('triviaService',
		['$http','baseUrl','userKey','triviaTypes','countryList',
			function($http,baseUrl,userKey,triviaTypes,countryList) {
		return {
			getFact: function(cb) {
				var triviaType = random(triviaTypes);
				var country = random(countryList);
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
