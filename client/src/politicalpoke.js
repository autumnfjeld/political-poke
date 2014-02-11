/**
 * Political Poke: a NYTimes Query apolPoke & more.....
 * My first experiment grabbing data from an api
 */

var polPoke = angular.module("PoliticalPoke", []);

// Service to handle initial candidate name & id info
polPoke.service('BasicInfoService', function(){
	this.candidateStore = [];

	//callback lookup for candidate campaign finance details
	// WIERD: variables defined above are not available with a foreach 
	this.verifyCandidate = function(fn, ln, data){
		//angular.forEach(data, function(item){
		for (var i = 0; i < data.length; i ++){
		 	var item = data[i];
			var returnedName = item.candidate.name.toLowerCase();
			// add all incoming data to candidateStore
			var obj = {};
			obj.firstname = returnedName.split(", ")[1];
			obj.lastname  = returnedName.split(",")[0];
			obj.id = item.candidate.id;
			this.candidateStore.push(obj);
			if (returnedName === ln + ", " + fn){
				console.log('we have a match', returnedName);
				//store data to database
			}
		}
		console.log('this data', this.candidateStore);	
	};	
});


polPoke.controller('GetDataController', function($scope, $http, BasicInfoService){
	var apiKeyNYTCF = "a1b62a8e2df5aa511b20dd4f1e5a8bc4:11:55466580";
	console.log('checking global variable', BasicInfoService.firstname)
	
	// //callback lookup for candidate campaign finance details
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
		//BasicInfoService.inputname = $scope.name;
		var queryFN = $scope.name.split(" ")[0];
		var queryLN = $scope.name.split(" ")[1];
		console.log('BasicInfoService', BasicInfoService.lastname);
		// $scope.firstname = $scope.name.split(" ")[0];
		// $scope.lastname = $scope.name.split(" ")[1];
		
		console.log( $scope.firstname, $scope.lastname);
		var year = "2012";
		var apikey = "&api-key=" + apiKeyNYTCF;
		// In angular, must have callback specified directly in string
		var url = "http://api.nytimes.com/svc/elections/us/v3/finances/" +
				year + "/candidates/search.json?query=" 
				+ queryLN + apikey + '&callback=JSON_CALLBACK';

		// use $http.jsonp !!!
		return $http.jsonp(url)
		.then(function(obj){
			console.log('got the data', obj.data.results);
			if (obj.data.results.length !== 0){
				BasicInfoService.verifyCandidate(queryFN, queryLN, obj.data.results);
			}else{
				$scope.message = "Sorry, we couldn't find <b>" + $scope.name + "</b> in our database"; 
			}
		})
		.catch(function(e){
			throw e;
			console.log("REEEE-JEC-TION")
		});
	};
});

polPoke.controller('ShowDataController', function($scope, BasicInfoService){
	$scope.firstname = BasicInfoService.firstname;
	$scope.canCampaignMoney = [];
	$scope.loadCanCampaignMoney = function(){
		//$scope.candidates = 
	};
});



// each time name is called will need to get id for next data extraction,
// store name, id, and other info in db table for later extraction