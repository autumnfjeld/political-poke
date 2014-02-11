/**
 * Political Poke: a NYTimes Query apolPoke & more.....
 * My first experiment grabbing data from an api
 */

var polPoke = angular.module("PoliticalPoke", []);

polPoke.run(function($rootScope){
	$rootScope.verifyCandidate = function(data){
		_.each(data, function(item){
			var returnedName = item.candidate.name.toLowerCase();
			console.log('in verify returnedNam', returnedName);
			if (returnedName === $scope.lastname.toLowerCase() + ", " + $scope.firstname.toLowerCase()){
				console.log('we have a match');
				//TODO: store data to database
			}
		});
	};
});

polPoke.controller('GetDataController', function($scope, $http){
	var apiKeyNYTCF = "a1b62a8e2df5aa511b20dd4f1e5a8bc4:11:55466580";
	
	//var 
	//callback lookup for candidate campaign finance details
	// var verifyCandidate = function(data){
	// 	_.each(data, function(item){
	// 		var returnedName = item.candidate.name.toLowerCase();
	// 		console.log('in verfiy returnedNam', returnedName);
	// 		if (returnedName === $scope.lastname.toLowerCase() + ", " + $scope.firstname.toLowerCase()){
	// 			console.log('we have a match');
	// 			//store data to database
	// 		}
	// 	});
	// };
	// get candidate name from user input and query api for candidate id
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
				$scope.verifyCandidate(obj.data.results);
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


polPoke.controller('ShowDataController', function($scope){
	$scope.canCampaignMoney = [];
	$scope.loadCanCampaignMoney = function(){
		//$scope.candidates = 
	};
});



// each time name is called will need to get id for next data extraction,
// store name, id, and other info in db table for later extraction