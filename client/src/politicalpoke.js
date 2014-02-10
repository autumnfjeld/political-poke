/**
 * NYTimesQuery app 
 * My first experiments with an api
 */




angular.module("PoliticalPoke", ['PoliticalPoke.controllers']);

angular.module('PoliticalPoke.controllers', [])
.controller('GetDataController', function($scope){

	$scope.nameQuery = function(){
		console.log('nameQuery function accessed', $scope.name);
		
	};
});
