/**
 * NYTimesQuery app 
 * My first experiments with an api
 */

angular.module("nytquery", ['firebase'])
.controller("MyController", function($scope, $firebase){
	 // Firebase URL
	  var candiates = new Firebase("https://scorching-fire-2722.firebaseio.com/")
	  	"https://ng-newsletter.firebase.com";
	  // Synchronizing the items on our $scope
	  $scope.items = $firebase(new Firebase(URL + '/items'));
		}
]);
