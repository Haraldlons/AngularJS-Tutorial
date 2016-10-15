(function(){

	'use strict';

	angular
		.module('ngClassifieds')
		.controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

			var vm = this;

			vm.closeSidebar = closeSidebar;
			vm.saveClassified = saveClassified;

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

			function saveClassified(classified){
				if(classified){
					classified.contact = {
						name: "Harald",
						phone: "(555) 444-4444",
						email: "haraldlons@gmail.com"
					} 			
					$scope.$emit('newClassified', classified);
					vm.sidenavOpen = false;
				}
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