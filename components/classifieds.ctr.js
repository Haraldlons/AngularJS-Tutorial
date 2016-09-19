//Using emiedtly function expressions

(function(){

	"use strict"; //Best practise

	angular
	.module("ngClassifieds")//Not second array. Cause then referance. Then would make another module
	.controller("classifiedsCtrl", function($scope) { //ctrl - controller, second argument "controller code"
	//Scope enables communication.  function($scope) Inject scope object. Ananamous function associated with controller



	$scope.name = {
		first:"Harald",
		last: "Lastname"
	};

	//Dependencies injection, deals with how functions get created and get hold on code....???
	});//Ikke glem alle disse hersens parantesene
})();