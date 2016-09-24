(function(){

	'use strict';

	angular
		.module('ngClassifieds')
		.controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

			var vm = this;

			vm.closeSidebar = closeSidebar;

			$timeout(function() {
				$mdSidenav('left').open();
			});

			$scope.$watch('vm.sidenavOpen', function(sidenav){
				console.log('Sidebar Action');
				if(sidenav === false) {//closed
					console.log('Sidebar closing');
					$mdSidenav('left')
						.close()
						.then(function(){
							$state.go('classifieds');
					});
				}
			});

			function closeSidebar(){
				console.log('Closing sidebar2');
				vm.classifieds = {};
				vm.sidenavOpen = false;
			}
			
		}); //Controller end
})();

/*
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