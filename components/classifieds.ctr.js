//Using emiedtly function expressions
(function(){
	"use strict"; //Best practise

	angular
	.module("ngClassifieds")//Not second array. Cause then referance. Then would make another module
	.controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) { //ctrl - controller, second argument "controller code"
	//Scope enables communication.  function($scope) Inject scope object. Ananamous function associated with controller
	//$mdToast service

	//Returnes promises, cause async. 
	classifiedsFactory.getClassifieds().then(function(classifieds){
		$scope.classifieds = classifieds.data;
		$scope.categories = getCategories($scope.classifieds);
	});

	var contact = {
		name: "Harald",
		phone: "(555) 444-4444",
		email: "haraldlons@gmail.com"
	} 


	$scope.openSidebar = function(){
		$mdSidenav('left').open(); //from md-component-id="left"
	}

	$scope.closeSidenav = function(){
		$mdSidenav('left').close();
	}

	$scope.saveClassified = function(classified){
		if(classified){
			classified.contact = contact;
			$scope.classifieds.push(classified);
			$scope.classified = {};
			$scope.closeSidenav();
			showToast("New item saved!");
		}
	}

	$scope.editClassified = function(classified){
		$scope.editing = true;
		$scope.openSidebar();
		$scope.classified = classified;
	}

	$scope.saveEdit = function (){
		$scope.editing = false;
		$scope.closeSidenav();
		$scope.classified = {};
		showToast("Edit saved!");
	}


	$scope.deleteClassified = function(event,classified){
		var confirm = $mdDialog.confirm()
			.title('Are you sure you want to delete '+ classified.title + '?')
			.ok('Yes')
			.cancel('No')
			.targetEvent(event)
		$mdDialog.show(confirm).then(function(){
		var index = $scope.classifieds.indexOf(classified);//om første 0, andre 1
			$scope.classifieds.splice(index,1);
		},function(){ //We clicked No

		});
	}
	//Use splice(start,numberOfItems)

	function showToast(message){
		$mdToast.show(
			$mdToast.simple()
					.content(message)
					.position('top, right')
					.hideDelay(2000)
			);
	}

	function getCategories(classifieds) {

		var categories = [];

		angular.forEach(classifieds, function(item) {
			angular.forEach(item.categories, function(category) {
				categories.push(category);
			});
		});

		return _.uniq(categories);
	}
	

	});//Ikke glem alle disse hersens parantesene
})();


/*

	$scope.name = {
		first:"Harald",
		last: "Lastname"
	};

	$scope.message = "Hello World, using message";


	POST - Sending
	GET - Retriving
	DELETE - Deleting
	PUT - Editing

	$http.get('https://adress.com').then(function(classifieds){
		$scope.classifieds = classifieds.data;
	});
	
	Slippe skrive adresse hele tiden -> service

	if(confirm("Are you sure?")){
			$scope.classifieds.splice(index,1);
		}

*/