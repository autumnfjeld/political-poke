/**
 * Political Poke: a NYTimes Query apolPoke & more.....
 * My first experiment grabbing data from an api
 */

var polPoke = angular.module("PoliticalPoke", []);

// Service to handle initial candidate name & id info
polPoke.service('BasicInfoService', function($http){
	var self = this;
	this.candidateStore = [];
	this.current = {};
	this.message = '';

	this.nameQuery = function(fn, ln, year){
		var apiKeyNYTCand = "a1b62a8e2df5aa511b20dd4f1e5a8bc4:11:55466580";
		var apikey = "&api-key=" + apiKeyNYTCand;
		// In angular, must have callback specified directly in string
		var url = "http://api.nytimes.com/svc/elections/us/v3/finances/" + year
				 + "/candidates/search.json?query=" + ln + apikey + '&callback=JSON_CALLBACK';
		
		return $http.jsonp(url)   // use $http.jsonp !!! 
		.then(function(obj){
			if (obj.data.results.length !== 0){
				return self.verifyCandidate(fn, ln, obj.data.results);
			}else{
				$scope.message = "Sorry, we couldn't find <b>" + fn + ln + "</b> in our database"; 
			}
		})
		.catch(function(e){
			throw e;
		});
	};

	//callback lookup for candidate campaign finance details
	// WIERD: variables defined above are not available with a foreach 
	this.verifyCandidate = function(fn, ln, data){
		//angular.forEach(data, function(item){
		for (var i = 0; i < data.length; i ++){
		 	var item = data[i];
			var returnedName = item.candidate.name.toLowerCase();
			// add all returned candidates to candidateStore
			var obj = {};
			obj.firstname = returnedName.split(", ")[1];
			obj.lastname  = returnedName.split(",")[0];
			obj.id = item.candidate.id;
			obj.campaignFinance = {};  //to be filled with subsequent query data
			this.candidateStore.push(obj);
			if (returnedName === ln + ", " + fn){
				console.log('we have a match', returnedName, obj.id);
				this.current = obj;
				return this.getCandCampFin(obj.id);
			}
		}
	};

	// http get request to NYTimes api for candidate campaign finance data 
	this.getCandCampFin = function(candID){
		var apiKeyNYTCFin = "a1b62a8e2df5aa511b20dd4f1e5a8bc4:11:55466580";
		var apikey = "&api-key=" + apiKeyNYTCFin;
		var year = "2012";
		var url = "http://api.nytimes.com/svc/elections/us/v3/finances/" +
				year + "/candidates/" + candID + ".json?" + apikey + '&callback=JSON_CALLBACK';
		
		return $http.jsonp(url)
		.then(function(obj){
			console.log("Got campaignFinance data", obj.data.results[0]);
			return self.handleCandCampFinData(obj.data.results[0]);
		})
		.catch(function(e){
			throw e;
			console.log("REEEE-JEC-TION");
		});
	};

	// add relevant data to local storage/database
	this.handleCandCampFinData = function(finData){
		console.log('finData:',finData);
		this.current.campaignFinance = finData;
		//look thru existing data and add to correct candidate
		
		for (var i = 0; i < this.candidateStore.length; i++){
			if (this.candidateStore[i].id === finData.id){
				this.candidateStore[i].campaignFinance = finData;
			}
		}
		return this.current;
		console.log('Updated storage with findata', this.candidateStore);
	};
});

polPoke.controller('GetDataController', function($scope, $http, BasicInfoService){
	$scope.displayResults = function(){
		console.log('current', BasicInfoService.current.campaignFinance.party);
		$scope.party = BasicInfoService.current.campaignFinance.party;
		$scope.state = BasicInfoService.current.campaignFinance.mailing_state;
		$scope.total_contributions = accounting.formatMoney(BasicInfoService.current.campaignFinance.total_contributions);
		$scope.total_disbursements = accounting.formatMoney(BasicInfoService.current.campaignFinance.total_disbursements, 0);
		$scope.from_individuals = accounting.formatMoney(BasicInfoService.current.campaignFinance.total_from_individuals, 0);
		$scope.from_pacs = accounting.formatMoney(BasicInfoService.current.campaignFinance.total_from_pacs, 0);
	};

	$scope.nameQuery = function(){
		var queryFN = $scope.name.split(" ")[0];
		var queryLN = $scope.name.split(" ")[1];
		var year = "2012";

		BasicInfoService.nameQuery(queryFN, queryLN, year)
		.then(function(data){
			//console.log('coming back to controller after data processing', data);
			$scope.displayResults();
		})
		.catch(function(e){
			throw(e);
		})
	};
});

polPoke.controller('ShowDataController', function($scope, BasicInfoService){
	//console.log('BasicInfoService.current', BasicInfoService.current);
		$scope.firstname = BasicInfoService.firstname;
	$scope.canCampaignMoney = [];
	$scope.loadCanCampaignMoney = function(){
		//$scope.candidates = 
	};
});



// each time name is called will need to get id for next data extraction,
// store name, id, and other info in db table for later extraction