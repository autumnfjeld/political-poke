/**
 * Political Poke: a NYTimes Query app & more.....
 * My first experiment grabbing data from an api
 */

angular.module("PoliticalPoke", ['PoliticalPoke.controllers']);

angular.module('PoliticalPoke.controllers', [])
.controller('GetDataController', function($scope, $http){
	var apiKeyNYTCF = "a1b62a8e2df5aa511b20dd4f1e5a8bc4:11:55466580";
	
	//callback lookup for candidate campaign finance details
	var verifyCandidate = function(data){
		_.each(data, function(item){
			console.log('in verfiy', item.candidate);
			var returnedName = item.candidate.name.toLowerCase();
			if (returnedName === $scope.lastname+ ", " + $scope.firstname){
				console.log('we have a match');
			}
		});
	};

	// name Query will return candidate id
	$scope.nameQuery = function(){
		console.log('nameQuery function accessed', $scope.name);
		$scope.firstname = $scope.name.split(" ")[0];
		$scope.lastname = $scope.name.split(" ")[1];
		console.log( $scope.firstname, $scope.lastname);
		var year = "2012";
		var apikey = "&api-key=" + apiKeyNYTCF;
		// In angular, must have callback specified directly in string
		var url = "http://api.nytimes.com/svc/elections/us/v3/finances/" +
				year + "/candidates/search.json?query=" 
				+ $scope.lastname + apikey + '&callback=JSON_CALLBACK';
				console.log(url);

		// use $http.jsonp !!!
		return $http.jsonp(url)
		.then(function(obj){
			console.log('got the data', obj.data.results);
			//if data is returned process it. maybe this can be handled with promises?
			if (obj.data.results.length !== 0){
				verifyCandidate(obj.data.results);
			}else{
				$scope.message = "Sorry, we couldn't find <b>" + $scope.name + "</b> in our database"; 
			}
		})
		.catch(function(e){
			throw e;
			console.log("REEEE-JEC-TION")
		});
	};
	console.log('just checking scope', $scope);
});

// each time name is called will need to get id for next data extraction,
// store name, id, and other info in db table for later extraction