angular
	.module("ngClassifieds", ["ngMaterial"])
	.config(function($mdThemingProvider){

		$mdThemingProvider.theme('default') //Changes to the default theme
			.primaryPalette('teal')
			.accentPalette('orange');

	})
	.directive("helloworld", function($scope) {	
		return {
			template: "<h1>{{ message }}</h1>"
		}
	}); //angular will convert camelcase to cababcase -> hello-world
