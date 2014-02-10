/**
 * Political Poke: a NYTimes Query app & more.....
 * My first experiment grabbing data from an api
 */

angular.module("PoliticalPoke", ['PoliticalPoke.controllers']);

angular.module('PoliticalPoke.controllers', [])
.controller('GetDataController', function($scope, $http){
	var apiKeyNYTCF = "a1b62a8e2df5aa511b20dd4f1e5a8bc4:11:55466580";
	console.log('show header info:', $http.defaults.headers.common);
	// $http.defaults.headers.common.Accept = "application/jsonp, text/javascript, */*"; 
	console.log('after change header info:', $http.defaults.headers.common);

	$scope.nameQuery = function(){
		console.log('nameQuery function accessed', $scope.name);
		var query = "query=" + $scope.name;
		var apikey = "&api-key=" + apiKeyNYTCF;
		// In angular, must have callback specified directly in string
		var url = "http://api.nytimes.com/svc/elections/us/v3/finances/2012/candidates/search.json?" 
				+ query + apikey + '&callback=JSON_CALLBACK';

		// use $http.jsonp !!!
		return $http.jsonp(url)
		.then(function(obj){
			console.log('got the data', obj.data.results);
		})
		.catch(function(e){
			throw e;
			console.log("REEEE-JEC-TION")
		});
	};



});
