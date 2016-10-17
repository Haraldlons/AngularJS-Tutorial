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

	vm.classifieds = classifiedsFactory.ref;
	vm.classifieds.$loaded().then(function(classifieds){
		vm.categories = getCategories(classifieds);
	});


	$scope.$on('newClassified', function(event, classified){ // $on "Hører" etter newClassified, og når vi hører den kjører vi funkjsonen. 
			//newClassified blir emittet av child ctrl av funksjonen "saveClassified"
			//classified som parameter er hva som blir emittet, og vi på en måte fanger den opp
			//ved å ta den inn som paramter i funksjonen. 
		vm.classifieds.$add(classified);
		showToast('Classified saved!');
	});

	$scope.$on('editMessage', function(event, message){ //Lytter etter "editSaved".
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
			id: classified.$id
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
			console.log(classified);
			showToast("The item: \"" + classified.title + "\" deleted");
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

//For each item, send den til firebase
		angular.forEarch(data, function(item){
			firebase.$add(item);
		});



----------------------------- $http. request
	$http.get('https://api.github.com/users').then(function(response){
		console.log(response);
	});



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

	-------------------- -Example
	In newCtrl
		vm.sendMessage = function(){
				$scope.$emit('myMessage', "Hey, how are you?");
			}


	In main Ctrl

	$scope.$on('myMessage', function(event, message){
		console.log(message);
	})
	
----------------------- Adding items to firebase

var data = [
		  {
		    "id":"1",
		    "title":"20 Foot Equipment Trailer",
		    "description":"2013 rainbow trailer 20 feet x 82 inch deck area, two 5,000 lb axels, electric brakes, two pull out ramps, break away box, spare tire.",
		    "price":6000,
		    "posted":"2015-10-24",
		    "contact": {
		      "name":"John Doe",
		      "phone":"(555) 555-5555",
		      "email":"johndoe@gmail.com"
		    },
		    "categories":[
		      "Vehicles",
		      "Parts and Accessories"
		    ],
		    "image": "http://www.louisianasportsman.com/classifieds/pics/p1358549934434943.jpg",
		    "views":213
		  }
		]

		var firebase = classifiedsFactory.ref;

		//For each item, send den til firebase
		angular.forEach(data, function(value, key){  //Halvtime leting etter feil, skrev earch og ikke each
			firebase.$add(value);
		});

*/