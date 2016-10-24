(function(){

	'use strict';

	angular
		.module('ngClassifieds')
		.controller('editClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

			var vm = this;
			vm.classifieds = classifiedsFactory.ref;

			vm.closeSidebar = closeSidebar;
			vm.saveEdit = saveEdit;
			vm.classified = vm.classifieds.$getRecord($state.params.id); //Record associated with firebase object
				console.log(vm.classified);
		

			$timeout(function() { //Pga Javascript asynkronsk. 
				$mdSidenav('left').open(); //Setter denne til open etter litt tid, om jeg har forstått riktig...
			});

					//Watch ser hele tiden på verdien og gjør noe når den merker en forskjell
			$scope.$watch('vm.sidenavOpen', function(sidenav){
				console.log('Sidebar Action');
				if(sidenav === false) {//closed
					console.log('Sidebar closing');
					$mdSidenav('left')
						.close()
						.then(function(){
							$state.go('classifieds');//For å gå til ny URL
					});
				}
			});

			function closeSidebar(){ //Når man trykker Cancel
				console.log('Closing sidebar2');
				vm.classifieds = {};
				vm.sidenavOpen = false;
			}

			function saveEdit(){
					vm.classifieds.$save(vm.classified).then(function() {
						$scope.$emit('editMessage','Item was edited');
						vm.sidenavOpen = false;
					});
				
				}

			
	

			
		}); //Controller end
})();

/*
------------------ Emitters

	<md-button ng-click="vm.sendMessage()">Send Message</md-button>

			vm.sendMessage = function(){
				$scope.$emit('myMessage', 'hey, how are you?')
			}


	$scope.$on('myMessage', function(event, message){
		console.log(message);
	})



----------------------- Watcher
$scope.$watch('vm.valueToChange',function(value){
				if(value === 2){
					console.log("Value changed to 2");
				}
			});

			vm.valueToChange = 1;

			$timeout(function(){
				vm.valueToChange = 2;
			}, 2000);


*/



/*(function(){

	'use strict';

	angular
		.module('ngClassifieds')
		.controller('editClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

			var vm = this;

			vm.closeSidebar = closeSidebar;
			vm.saveEdit = saveEdit;
			vm.classified = $state.params.classified;

			$timeout(function() { //Pga Javascript asynkronsk. 
				$mdSidenav('left').open(); //Setter denne til open etter litt tid, om jeg har forstått riktig...
			});

			$scope.$watch('vm.sidenavOpen', function(sidenav){
				console.log('Sidebar Action');
				if(sidenav === false) {//closed
					console.log('Sidebar closing');
					$mdSidenav('left')
						.close()
						.then(function(){
							$state.go('classifieds');//For å gå til ny URL
					});
				}
			});

			function closeSidebar(){ //Når man trykker Cancel
				console.log('Closing sidebar2');
				vm.classifieds = {};
				vm.sidenavOpen = false;
			}

			function saveEdit(){
				$scope.$emit('editSaved', 'Edit saved!');
				vm.sidenavOpen = false;
			}


	

			
		}); //Controller end
})();

/*
------------------ Emitters

	<md-button ng-click="vm.sendMessage()">Send Message</md-button>

			vm.sendMessage = function(){
				$scope.$emit('myMessage', 'hey, how are you?')
			}


	$scope.$on('myMessage', function(event, message){
		console.log(message);
	})



----------------------- Watcher
$scope.$watch('vm.valueToChange',function(value){
				if(value === 2){
					console.log("Value changed to 2");
				}
			});

			vm.valueToChange = 1;

			$timeout(function(){
				vm.valueToChange = 2;
			}, 2000);


*/