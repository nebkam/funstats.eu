(function() {
	var appConfig = angular.module('app.config',[]);

	appConfig.constant('baseUrl', 'https://api.ukdataservice.ac.uk/V1/datasets/EQLS');

	appConfig.constant('userKey', '32c520dabe65f1a197868d539b89048b');

	appConfig.constant('surveyQuestions', [
		{
			"id" : 1,
			"question" : "Do your working hours fit in with your family or social commitments outside work?",
			"apiUrl" : "/TimeseriesFrequency?variableId=170",
			"type" : "TimeseriesFrequency",
			"topic" : "Employment and labour - General",
			"answers" : [
				{
					"value" : 1,
					"text" : "Very Well"
				},
				{
					"value" : 2,
					"text" : "Fairly well"
				},
				{
					"value" : 3,
					"text" : "Not very well"
				},
				{
					"value" : 4,
					"text" : "Not at all well"
				}
			]
		},
		{
			"id" : 2,
			"question" : "What is your martial status?",
			"apiUrl" : "/TimeseriesFrequency?variableId=3",
			"type" : "TimeseriesFrequency",
			"topic" : "Social stratification and groupings - Family life and marriage",
			"answers" : [
				{
					"value" : 1,
					"text" : "Married or living with partner"
				},
				{
					"value" : 2,
					"text" : "Separated or divorced and not living with partner"
				},
				{
					"value" : 3,
					"text" : "Widowed and not living with partner"
				},
				{
					"value" : 4,
					"text" : "Never married and not living with partner"
				}
			]
		},
		{
			"id" : 3,
			"question" : "The area in which you live is ... ?",
			"apiUrl" : "/TimeseriesFrequency?variableId=6",
			"type" : "WeightedFrequency",
			"topic" : "Environment, conservation and land use - Land use and planning",
			"answers" : [
				{
					"value" : 1,
					"text" : "The open countryside"
				},
				{
					"value" : 2,
					"text" : "A village/small town"
				},
				{
					"value" : 3,
					"text" : "A medium to large town"
				},
				{
					"value" : 4,
					"text" : "A city or city suburb"
				}
			]
		},
		{
			"id" : 4,
			"question" : "Thinking of your immediate neighbourhood - do you have problems with air quality?",
			"apiUrl" : "/TimeseriesFrequency?variableId=49",
			"type" : "WeightedFrequency",
			"topic" : "Society and culture - Social attitudes and behaviour",
			"answers" : [
				{
					"value" : 1,
					"text" : "Major problems"
				},
				{
					"value" : 2,
					"text" : "Moderate problems"
				},
				{
					"value" : 3,
					"text" : "No problems"
				}
			]
		},
		{
			"id" : 5,
			"question" : "What is your age?",
			"apiUrl" : "/TimeseriesFrequency?variableId=12",
			"type" : "TimeseriesFrequency",
			"topic" : "Social stratification and groupings - General",
			"answers" : [
				{
					"value" : 1,
					"text" : "18-24"
				},
				{
					"value" : 2,
					"text" : "25-34"
				},
				{
					"value" : 3,
					"text" : "35-49"
				},
				{
					"value" : 4,
					"text" : "50-64"
				},
				{
					"value" : 5,
					"text" : "65+"
				}
			]
		},
		{
			"id" : 6,
			"question" : "What is your level of education?",
			"apiUrl" : "/TimeseriesFrequency?variableId=17",
			"type" : "TimeseriesFrequency",
			"topic" : "Education - general",
			"answers" : [
				{
					"value" : 1,
					"text" : "Primary or less"
				},
				{
					"value" : 2,
					"text" : "Secondary"
				},
				{
					"value" : 3,
					"text" : "Tertiary"
				},
				{
					"value" : 4,
					"text" : "Completed education abroad"
				},
				{
					"value" : 5,
					"text" : "Don't know"
				}
			]
		},
		{
			"id" : 7,
			"question" : "What is your employment status?",
			"apiUrl" : "/TimeseriesFrequency?variableId=18",
			"type" : "TimeseriesFrequency",
			"topic" : "Employment and labour - General",
			"answers" : [
				{
					"value" : 1,
					"text" : "Employed (includes on leave)"
				},
				{
					"value" : 2,
					"text" : "Unemployed"
				},
				{
					"value" : 3,
					"text" : "Unable to work - disability/illness"
				},
				{
					"value" : 4,
					"text" : "Retired"
				},
				{
					"value" : 5,
					"text" : "Homemaker"
				},
				{
					"value" : 6,
					"text" : "Student"
				},
				{
					"value" : 7,
					"text" : "Other"
				}
			]
		},
		{
			"id" : 8,
			"question" : "Financial situation of your household compared to 12 months ago?",
			"apiUrl" : "/TimeseriesFrequency?variableId=137",
			"type" : "TimeseriesFrequency",
			"topic" : "Economics - Income, property and investment",
			"answers" : [
				{
					"value" : 1,
					"text" : "Better"
				},
				{
					"value" : 2,
					"text" : "The same"
				},
				{
					"value" : 3,
					"text" : "Worse"
				}
			]
		},
		{
			"id" : 9,
			"question" : "What is your health condition?",
			"apiUrl" : "/TimeseriesFrequency?variableId=36",
			"type" : "TimeseriesFrequency",
			"topic" : "Health - General",
			"answers" : [
				{
					"value" : 1,
					"text" : "Very good"
				},
				{
					"value" : 2,
					"text" : "Good"
				},
				{
					"value" : 3,
					"text" : "Fair"
				},
				{
					"value" : 4,
					"text" : "Bad"
				},
				{
					"value" : 5,
					"text" : "Very bad"
				}
			]
		},
		{
			"id" : 10,
			"question" : "Are you limited in your daily activities by this physical or mental health problem, illness or disability?",
			"apiUrl" : "/TimeseriesFrequency?variableId=38",
			"type" : "TimeseriesFrequency",
			"topic" : "Health - Specific diseases and medical conditions",
			"answers" : [
				{
					"value" : 1,
					"text" : "Yes, severly"
				},
				{
					"value" : 2,
					"text" : "Yes, to some extent"
				},
				{
					"value" : 3,
					"text" : "No"
				}
			]
		},
		{
			"id" : 11,
			"question" : "Which of the following best describes your accommodation?",
			"apiUrl" : "/TimeseriesFrequency?variableId=40",
			"type" : "TimeseriesFrequency",
			"topic" : "Housing",
			"answers" : [
				{
					"value" : 1,
					"text" : "Own without mortgage (i.e. without any loans)"
				},
				{
					"value" : 2,
					"text" : "Own with mortgage"
				},
				{
					"value" : 3,
					"text" : "Tenant, paying rent to private landlord"
				},
				{
					"value" : 4,
					"text" : "Tenant, paying rent in social/voluntary/municipal housing"
				},
				{
					"value" : 5,
					"text" : "Accommodation is provided rent free"
				},
				{
					"value" : 6,
					"text" : "Other"
				}
			]
		},
		{
			"id" : 12,
			"question" : "Difficult to see a doctor because of distance?",
			"apiUrl" : "/TimeseriesFrequency?variableId=55",
			"type" : "TimeseriesFrequency",
			"topic" : "Health - Health services and medical",
			"answers" : [
				{
					"value" : 1,
					"text" : "Very difficult"
				},
				{
					"value" : 2,
					"text" : "A little difficult"
				},
				{
					"value" : 3,
					"text" : "Not difficult at all"
				}
			]
		},
		{
			"id" : 13,
			"question" : "Over the last 12 months, have you attended a protest or demonstration?",
			"apiUrl" : "/TimeseriesFrequency?variableId=55",
			"type" : "TimeseriesFrequency",
			"topic" : "Politics - Political behaviour and attitudes",
			"answers" : [
				{
					"value" : 1,
					"text" : "Yes"
				},
				{
					"value" : 2,
					"text" : "no"
				}
			]
		},
		{
			"id" : 14,
			"question" : "Do you feel that you are free to decide how to live your life?",
			"apiUrl" : "/TimeseriesFrequency?variableId=142",
			"type" : "TimeseriesFrequency",
			"topic" : "Society and culture - Social indicators and quality of life",
			"answers" : [
				{
					"value" : 1,
					"text" : "Strongly agree"
				},
				{
					"value" : 2,
					"text" : "Agree"
				},
				{
					"value" : 3,
					"text" : "Neither agree nor disagree"
				},
				{
					"value" : 4,
					"text" : "Disagree"
				},
				{
					"value" : 5,
					"text" : "Strongly disagree"
				}
			]
		},
		{
			"id" : 15,
			"question" : "Who is a person to get support from when feeling depressed?",
			"apiUrl" : "/TimeseriesFrequency?variableId=34",
			"type" : "TimeseriesFrequency",
			"topic" : "Social stratification and groupings - Familiy life and mariage",
			"answers" : [
				{
					"value" : 1,
					"text" : "A member of your family / relative"
				},
				{
					"value" : 2,
					"text" : "A friend, neighbour, or someone else, who does not belong to"
				},
				{
					"value" : 3,
					"text" : "A service provider, institution or organisation"
				}
			]
		},
		{
			"id" : 16,
			"question" : "Who is a person to get support from to help around the house?",
			"apiUrl" : "/TimeseriesFrequency?variableId=31",
			"type" : "TimeseriesFrequency",
			"topic" : "Social stratification and groupings - Familiy life and mariage",
			"answers" : [
				{
					"value" : 1,
					"text" : "A member of your family / relative"
				},
				{
					"value" : 2,
					"text" : "A friend, neighbour, or someone else, who does not belong to"
				},
				{
					"value" : 3,
					"text" : "A service provider, institution or organisation"
				},
				{
					"value" : 4,
					"text" : "Nobody"
				}
			]
		},
		{
			"id" : 17,
			"question" : "Thinking of your immediate neighbourhood - do you have problems with traffic congestion?",
			"apiUrl" : "/TimeseriesFrequency?variableId=53",
			"type" : "TimeseriesFrequency",
			"topic" : "Society and culture - Social indicators and quality of life",
			"answers" : [
				{
					"value" : 1,
					"text" : "Major problems"
				},
				{
					"value" : 2,
					"text" : "Moderate problems"
				},
				{
					"value" : 3,
					"text" : "No problems"
				}
			]
		},
		{
			"id" : 18,
			"question" : "How would you describe your access to banking services?",
			"apiUrl" : "/TimeseriesFrequency?variableId=61",
			"type" : "TimeseriesFrequency",
			"topic" : "Society and culture - Social attitudes and behaviour",
			"answers" : [
				{
					"value" : 1,
					"text" : "With great difficulty"
				},
				{
					"value" : 2,
					"text" : "With some difficulty"
				},
				{
					"value" : 3,
					"text" : "Easily"
				},
				{
					"value" : 4,
					"text" : "Very easily"
				},
				{
					"value" : 5,
					"text" : "Service not used"
				}
			]
		},
		{
			"id" : 19,
			"question" : "Would you say that most people can be trusted? (on a scale of 1 to 10)",
			"apiUrl" : "/TimeseriesFrequency?variableId=91",
			"type" : "TimeseriesFrequency",
			"topic" : "Society and culture - Social attitudes and behaviour",
			"answers" : [
				{
					"value" : 1,
					"text" : "1 - You can’t be too careful"
				},
				{
					"value" : 2,
					"text" : "2"
				},
				{
					"value" : 3,
					"text" : "3"
				},
				{
					"value" : 4,
					"text" : "4"
				},
				{
					"value" : 5,
					"text" : "5"
				},
				{
					"value" : 6,
					"text" : "6"
				},
				{
					"value" : 7,
					"text" : "7"
				},
				{
					"value" : 8,
					"text" : "8"
				},
				{
					"value" : 9,
					"text" : "9"
				},
				{
					"value" : 10,
					"text" : "10 - Most people can be trusted"
				}
			]
		},
		{
			"id" : 20,
			"question" : "How frequently do you use the Internet other than for work?",
			"apiUrl" : "/TimeseriesFrequency?variableId=106",
			"type" : "TimeseriesFrequency",
			"topic" : "Society and culture - Social attitudes and behaviour",
			"answers" : [
				{
					"value" : 1,
					"text" : "Every day or almost every day"
				},
				{
					"value" : 2,
					"text" : "At least once a week"
				},
				{
					"value" : 3,
					"text" : "One to three times a month"
				},
				{
					"value" : 4,
					"text" : "Less often"
				},
				{
					"value" : 5,
					"text" : "Never"
				}
			]
		},
		{
			"id" : 21,
			"question" : "How often worked unpaid for community services last 12 months?",
			"apiUrl" : "/TimeseriesFrequency?variableId=109",
			"type" : "TimeseriesFrequency",
			"topic" : "Society and culture - Social attitudes and behaviour",
			"answers" : [
				{
					"value" : 1,
					"text" : "Every week"
				},
				{
					"value" : 2,
					"text" : "Every month"
				},
				{
					"value" : 3,
					"text" : "Less often/occasionally"
				},
				{
					"value" : 4,
					"text" : "Not at all"
				}
			]
		},
		{
			"id" : 22,
			"question" : "How often woke up feeling fresh and rested last 2 weeks?",
			"apiUrl" : "/TimeseriesFrequency?variableId=157",
			"type" : "TimeseriesFrequency",
			"topic" : "Society and culture - Social indicators and quality of life",
			"answers" : [
				{
					"value" : 1,
					"text" : "All of the time"
				},
				{
					"value" : 2,
					"text" : "Most of the time"
				},
				{
					"value" : 3,
					"text" : "More than half of the time"
				},
				{
					"value" : 4,
					"text" : "Less than half of the time"
				},
				{
					"value" : 5,
					"text" : "Some of the time"
				},
				{
					"value" : 6,
					"text" : "At no time"
				}
			]
		},
		{
			"id" : 23,
			"question" : "How satisfied are you with your present job? ",
			"apiUrl" : "/TimeseriesFrequency?variableId=146",
			"type" : "TimeseriesFrequency",
			"topic" : "Society and culture - Social indicators and quality of life",
			"answers" : [
				{
					"value" : 1,
					"text" : "1 - Very dissatisfied"
				},
				{
					"value" : 2,
					"text" : "2"
				},
				{
					"value" : 3,
					"text" : "3"
				},
				{
					"value" : 4,
					"text" : "4"
				},
				{
					"value" : 5,
					"text" : "5"
				},
				{
					"value" : 6,
					"text" : "6"
				},
				{
					"value" : 7,
					"text" : "7"
				},
				{
					"value" : 8,
					"text" : "8"
				},
				{
					"value" : 9,
					"text" : "9"
				},
				{
					"value" : 10,
					"text" : "10 - Very satisfied"
				}
			]
		},
		{
			"id" : 24,
			"question" : "How often are you involved in activity outside of work? - Cooking and/or housework",
			"apiUrl" : "/TimeseriesFrequency?variableId=177",
			"type" : "TimeseriesFrequency",
			"topic" : "Society and culture - Social indicators and quality of life",
			"answers" : [
				{
					"value" : 1,
					"text" : "Every day"
				},
				{
					"value" : 2,
					"text" : "Several days a week"
				},
				{
					"value" : 3,
					"text" : "Once or twice a week"
				},
				{
					"value" : 4,
					"text" : "Less often"
				},
				{
					"value" : 5,
					"text" : "Never"
				}
			]
		}
	]);

	appConfig.constant('surveyTopics', [
		{
			"title": "Social stratification and groupings - Family life and marriage",
			"icon": "glyphicon-heart"
		},
		{
			"title": "Education - Higher and further",
			"icon": "glyphicon-education"
		},
		{
			"title": "Environment, conservation and land use - Land use and planning",
			"icon": "glyphicon-tree-conifer"
		},
		{
			"title": "Society and culture - Social attitudes and behaviour",
			"icon": "glyphicon-thumbs-up"
		},
		{
			"title": "Social stratification and groupings - General",
			"icon": "glyphicon-user"
		},
		{
			"title": "Education - general",
			"icon": "glyphicon-book"
		},
		{
			"title": "Economics - Income, property and investment",
			"icon": "glyphicon-piggy-bank"
		},
		{
			"title": "Health - General",
			"icon": "glyphicon-apple"
		},
		{
			"title": "Health - Specific diseases and medical conditions",
			"icon": "glyphicon-asterisk"
		},
		{
			"title": "Housing",
			"icon": "glyphicon-home"
		},
		{
			"title": "Health - Health services and medical",
			"icon": "glyphicon-plus"
		},
		{
			"title": "Transport",
			"icon": "glyphicon-road"
		},
		{
			"title": "Politics - Political behaviour and attitudes",
			"icon": "glyphicon-bullhorn"
		},
		{
			"title": "Society and culture - Social indicators and quality of life",
			"icon": "glyphicon-music"
		},
		{
			"title": "Employment and labour - General",
			"icon": "glyphicon-gbp"
		}
	]);

	appConfig.constant('triviaTypes', [{
		type: "single-women",
		apiUrl: "/TimeseriesFrequency",
		variableId: 3,
		filter: "13:2|",
		option: 4.0,
		getHeadline: function(country) {
			return 'of women in '+ country +' are single';
		},
		subtitle: "Never married and not living with a partner"
	},{
		type: "single-men",
		apiUrl: "/TimeseriesFrequency",
		variableId: 3,
		filter: "13:1|",
		option: 4.0,
		getHeadline: function(country) {
			return 'of men in '+ country +' are single';
		},
		subtitle: "Never married and not living with a partner"
	}, {
		type: "doesnt-go-to-church",
		apiUrl: "/TimeseriesFrequency",
		variableId: 105,
		filter: "",
		option: 5.0,
		getHeadline: function(country) {
			return 'of people in '+ country +' never go to church';
		},
		subtitle: "Never attend religious services, apart from weddings, funerals or christenings"
	}, {
		type: "doesnt-trust-gov",
		apiUrl: "/TimeseriesFrequency",
		variableId: 103,
		filter: "",
		option: 1.0,
		getHeadline: function(country) {
			return 'of people in '+ country +' don\'t trust their government';
		},
		subtitle: "On a scale 1-10, they chose 1 (Not at all)"
	}, {
		type: "owns-his-house",
		apiUrl: "/TimeseriesFrequency",
		variableId: 40,
		filter: "",
		option: 1.0,
		getHeadline: function(country) {
			return 'of people in '+ country +' own their own house';
		},
		subtitle: "Without mortgage (i.e. without any loans)"
	}, {
		type: "finished-primary-school",
		apiUrl: "/TimeseriesFrequency",
		variableId: 5,
		filter: "",
		option: 2.0,
		getHeadline: function(country) {
			return 'of people in '+ country +' completed only primary school';
		},
		subtitle: "Primary education (ISCED 1)"
	}, {
		type: "lives-in-city",
		apiUrl: "/TimeseriesFrequency",
		variableId: 6,
		filter: "",
		option: 4.0,
		getHeadline: function(country) {
			return 'of people in '+country+' live in cities and their suburbs';
		},
		subtitle: "As opposed to the ones in towns, villages and on the countryside"
	}, {
		type: "unemployed-youth",
		apiUrl: "/TimeseriesFrequency",
		variableId: 6,
		filter: "12:2|",
		option: 2.0,
		getHeadline: function(country) {
			return 'of young people in '+country+' are unemployed';
		},
		subtitle: "Aged 25-35"
	}, {
		type: "cant-afford-vacation",
		apiUrl: "/TimeseriesFrequency",
		variableId: 128,
		filter: "",
		option: 2.0,
		getHeadline: function(country) {
			return 'of people in '+country+' can\'t afford a vacation';
		},
		subtitle: "Pay for a week's annual holiday away"
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
		"name": "Serbia",
		"code": "RS",
		"filter": "2:32"
	}, {
		"name": "Kosovo",
		"code": "RS",
		"filter": "2:31"
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

	appConfig.constant('ageGroups', [{
		readable: "20-something",
		range: "18-24",
		filter: "12:1"
	}, {
		readable: "30-something",
		range: "25-34",
		filter: "12:2"
	}, {
		readable: "40-something",
		range: "35-49",
		filter: "12:3"
	}, {
		readable: "50-something",
		range: "50-64",
		filter: "12:4"
	}, {
		readable: "60-something",
		range: "65+",
		filter: "12:5"
	}]);

	appConfig.constant('genders', [{
		readable: "man",
		filter: "13:1"
	}, {
		readable: "woman",
		filter: "13:2"
	}]);
})();
