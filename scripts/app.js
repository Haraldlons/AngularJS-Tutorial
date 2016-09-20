angular
	.module("ngClassifieds", ["ngMaterial"])
	.config(function($mdThemingProvider){

		$mdThemingProvider.theme('default') //Changes to the default theme
			.primaryPalette('teal')
			.accentPalette('orange');

	})
	.directive("helloWorld", function() {	
		return {
			template: "<h1>Hello World. This is a directive</h1>"
		}
	}); //angular will convert camelcase to cababcase -> hello-world