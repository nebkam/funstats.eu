(function() {
	var appConfig = angular.module('app.config',[]);

	appConfig.constant('baseUrl', 'https://api.ukdataservice.ac.uk/V1/datasets/EQLS');

	appConfig.constant('userKey', '32c520dabe65f1a197868d539b89048b');

	appConfig.constant('triviaTypes', [{
		type: "single-women",
		apiUrl: "/TimeseriesFrequency",
		variableId: 3,
		getHeadline: function(data) {
			var total = 0;
			var partial = 0;
			var value = 4.0;
			for (var i in data.TimeSeries) {
				var item = data.TimeSeries[i];
				total += item.WeightedFrequency;
				if (item.Value == value) {
					partial += item.WeightedFrequency;
				}
			}
			return Math.round((partial/total) * 100)+'%';
		},
		getText: function(country) {
			return 'of women in '+ country +' are single';
		}
	}, {
		type: "doesnt-go-to-church",
		apiUrl: "/TimeseriesFrequency",
		variableId: 105,
		getHeadline: function(data) {
			var total = 0;
			var partial = 0;
			var value = 5.0;
			for (var i in data.TimeSeries) {
				var item = data.TimeSeries[i];
				total += item.WeightedFrequency;
				if (item.Value == value) {
					partial += item.WeightedFrequency;
				}
			}
			return Math.round((partial/total) * 100)+'%';
		},
		getText: function(country) {
			return 'of people in '+ country +' never go to church';
		}
	}, {
		type: "doesnt-trust-gov",
		apiUrl: "/TimeseriesFrequency",
		variableId: 103,
		getHeadline: function(data) {
			var total = 0;
			var partial = 0;
			var value = 1.0;
			for (var i in data.TimeSeries) {
				var item = data.TimeSeries[i];
				total += item.WeightedFrequency;
				if (item.Value == value) {
					partial += item.WeightedFrequency;
				}
			}
			return Math.round((partial/total) * 100)+'%';
		},
		getText: function(country) {
			return 'of people in '+ country +' don\'t trust their government';
		}
	}, {
		type: "owns-his-house",
		apiUrl: "/TimeseriesFrequency",
		variableId: 40,
		getHeadline: function(data) {
			var total = 0;
			var partial = 0;
			var value = 1.0;
			for (var i in data.TimeSeries) {
				var item = data.TimeSeries[i];
				total += item.WeightedFrequency;
				if (item.Value == value) {
					partial += item.WeightedFrequency;
				}
			}
			return Math.round((partial/total) * 100)+'%';
		},
		getText: function(country) {
			return 'of people in '+ country +' own their own house (without mortgage)';
		}
	}]);

	appConfig.constant('countryList', [{
		"name": "Austria",
		"code": "AT",
		"filter": "2:1"
	}, {
		"name": "Belgium",
		"code": "BE",
		"filter": "2:2"
	}, {
		"name": "Bulgaria",
		"code": "BG",
		"filter": "2:3"
	}, {
		"name": "Cyprus",
		"code": "CY",
		"filter": "2:4"
	}, {
		"name": "Czech Republic",
		"code": "CZ",
		"filter": "2:5"
	}, {
		"name": "Germany",
		"code": "DE",
		"filter": "2:6"
	}, {
		"name": "Denmark",
		"code": "DK",
		"filter": "2:7"
	}, {
		"name": "Estonia",
		"code": "EE",
		"filter": "2:8"
	}, {
		"name": "Greece",
		"code": "GR",
		"filter": "2:9"
	}, {
		"name": "Spain",
		"code": "ES",
		"filter": "2:10"
	}, {
		"name": "Finland",
		"code": "FI",
		"filter": "2:11"
	}, {
		"name": "France",
		"code": "FR",
		"filter": "2:12"
	}, {
		"name": "Hungary",
		"code": "HU",
		"filter": "2:13"
	}, {
		"name": "Ireland",
		"code": "IE",
		"filter": "2:14"
	}, {
		"name": "Italy",
		"code": "IT",
		"filter": "2:15"
	}, {
		"name": "Lithuania",
		"code": "LT",
		"filter": "2:16"
	}, {
		"name": "Luxembourg",
		"code": "LU",
		"filter": "2:17"
	}, {
		"name": "Latvia",
		"code": "LV",
		"filter": "2:18"
	}, {
		"name": "Malta",
		"code": "MT",
		"filter": "2:19"
	}, {
		"name": "Netherlands",
		"code": "NL",
		"filter": "2:20"
	}, {
		"name": "Poland",
		"code": "PL",
		"filter": "2:21"
	}, {
		"name": "Portugal",
		"code": "PT",
		"filter": "2:22"
	}, {
		"name": "Romania",
		"code": "RO",
		"filter": "2:23"
	}, {
		"name": "Sweden",
		"code": "SE",
		"filter": "2:24"
	}, {
		"name": "Slovenia",
		"code": "SI",
		"filter": "2:25"
	}, {
		"name": "Slovakia",
		"code": "SK",
		"filter": "2:26"
	}, {
		"name": "UK",
		"code": "GB",
		"filter": "2:27"
	}, {
		"name": "Turkey",
		"code": "TR",
		"filter": "2:28"
	}, {
		"name": "Croatia",
		"code": "HR",
		"filter": "2:29"
	}, {
		"name": "Macedonia (FYROM)",
		"code": "MK",
		"filter": "2:30"
	}, {
		"name": "Kosovo",
		"code": "RS",
		"filter": "2:31"
	}, {
		"name": "Serbia",
		"code": "RS",
		"filter": "2:32"
	}, {
		"name": "Montenegro",
		"code": "ME",
		"filter": "2:33"
	}, {
		"name": "Iceland",
		"code": "IS",
		"filter": "2:34"
	}, {
		"name": "Norway",
		"code": "NO",
		"filter": "2:35"
	}]);
})();