angular
	.module("ngClassifieds", ["ngMaterial",'ui.router'])
	.config(function($mdThemingProvider, $stateProvider){ //Provides us with diferent states for our app

		$mdThemingProvider.theme('default') //Changes to the default theme
			.primaryPalette('teal')
			.accentPalette('orange');

		$stateProvider
			.state('one', {
				url: '/stateone',
				template: '<h1>{{ message }}</h1>',
				controller: 'stateOneController'
			})
			.state('two',{
				url: '/statetwo',
				template: '<h1>State Two</h1> <md-button ui-sref="two.more">Go to nested state</md-button><ui-view></ui-view>'
			})
			.state('two.more', {
				url: '/more',
				template: '<p>This is the deeper state</p>'
			});

	}) //Ikke semikolon
	.controller('stateOneController', function($scope){
		$scope.message = "Hey from state one";
	});



	 //angular will convert camelcase to cababcase -> hello-world



	/*

------------------------ directives
.directive("helloWorld", function() {	//Dont put in scope even tho using scope.message
		return {
			template: "<h1>{{ message }}</h1>"
		}



------------------------------	Routing
		$stateProvider
			.state('one', {
				url: '/stateone',
				template: '<h1>State One</h1>'
			})
			.state('two',{
				url: '/statetwo',
				template: '<h1>State Two</h1> <md-button ui-sref="two.more">Go to nested state</md-button><ui-view></ui-view>'
			})
			.state('two.more', {
				url: '/more',
				template: '<p>This is the deeper state</p>'
			});






	*/