//Using emiedtly function expressions
(function(){
	"use strict"; //Best practise

	angular
	.module("ngClassifieds")//Not second array. Cause then referance. Then would make another module
	.controller("classifiedsCtrl", function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) { //ctrl - controller, second argument "controller code"
	//Scope enables communication.  function($scope) Inject scope object. Anonymous function associated with controller
	//$mdToast service 

	var vm = this;


	vm.categories;
	vm.classified;
	vm.classifieds;
	vm.closeSidenav = closeSidenav;
	vm.deleteClassified = deleteClassified;
	vm.editing;
	vm.editClassified = editClassified;
	vm.openSidebar = openSidebar;
	vm.saveClassified = saveClassified;


	//Returnes promises, cause async. 
	classifiedsFactory.getClassifieds().then(function(classifieds){ //Classifieds inneholder data fra data/classifieds.json
		vm.classifieds = classifieds.data;
		vm.categories = getCategories(vm.classifieds);
	});

	$scope.$on('newClassified', function(event, classified){ // $on "Hører" etter newClassified, og når vi hører den kjører vi funkjsonen. 
															//newClassified blir emittet av child ctrl av funksjonen "saveClassified"
															//classified som parameter er hva som blir emittet, og vi på en måte fanger den opp
															//ved å ta den inn som paramter i funksjonen. 
		classified.id = vm.classifieds.length + 1;
		vm.classifieds.push(classified);
		showToast('classified saved!');
	});

	$scope.$on('editSaved', function(event, message){ //Lytter etter "editSaved".
		showToast(message);
	});


	var contact = {
		name: "Harald",
		phone: "(555) 444-4444",
		email: "haraldlons@gmail.com"
	} 


	function openSidebar() {
		$state.go('classifieds.new'); //from md-component-id="left" 
		//Nå går man til en annen state. Def. i app.js
	}

	function closeSidenav() {
		$mdSidenav('left').close();
	}

	function saveClassified(classified) {
		if(classified){
			classified.contact = contact;
			vm.classifieds.push(classified);
			vm.classified = {};
			closeSidenav();
			showToast("New item saved!");
		}
	}

	function editClassified(classified) {
		$state.go('classifieds.edit', {
			id: classified.id,
			classified: classified
		});
	}

	function saveEdit() {
		vm.editing = false;
		vm.classified = {};
		closeSidenav();
		showToast("Edit saved!");
	}


	function deleteClassified(event, classified) {
		var confirm = $mdDialog.confirm()
			.title('Are you sure you want to delete '+ classified.title + '?')
			.ok('Yes')
			.cancel('No')
			.targetEvent(event)
		$mdDialog.show(confirm).then(function(){
		var index = vm.classifieds.indexOf(classified);//om første 0, andre 1
			vm.classifieds.splice(index,1);
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

-----------------Emitters
	$scope.$broadcast //Send to child scopes
	$scope.$emit  //To parent scope
	
	$scope.$on // Collect scope


---------------------- Before refractering

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



--------------------------
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