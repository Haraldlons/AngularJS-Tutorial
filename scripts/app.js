angular
	.module("ngClassifieds", ["ngMaterial",'ui.router','firebase']) //Rem. to include firebase
	.config(function($mdThemingProvider, $stateProvider){ //Provides us with diferent states for our app

		$mdThemingProvider.theme('default') //Changes to the default theme. 
			.primaryPalette('teal')
			.accentPalette('orange');

	  $stateProvider
        .state('classifieds', {
          url: '/classifieds',
          templateUrl: 'components/classifieds/classifieds.tpl.html',
          controller: 'classifiedsCtrl as vm'
        })
         .state('classifieds.new', {
          url: '/new', //classifieds.new makes new substate
          templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
          controller: 'newClassifiedsCtrl as vm' //NEWclassifiedsCtrl, legg merke til at det er new forran
          								//Det kan være lett å overse
        })
          .state('classifieds.edit', {
          url: '/edit/:id', //Colon ahead then id variable 
          templateUrl: 'components/classifieds/edit/classifieds.edit.tpl.html',
          controller: 'editClassifiedsCtrl as vm',
          params: { //For at det ikke skal bli kluss når man editer.
          	classified: null
          } //I ctrl. $state.params.classified (for å referer det man overfører)
        });



	}); //Ikke semikolon
	
/*

//angular will convert camelcase to cababcase -> hello-world





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

------------------------ -Demo routing
.controller('stateOneController', function(){
		var vm = this; //View Model
		vm.message = "Hey from state one";
	});

	.state('two',{
				url: '/statetwo',
				template: '<h1>State Two</h1> <md-button ui-sref="two.more">Go to nested state</md-button><ui-view></ui-view>'
			})
			.state('two.more', {
				url: '/more',
				template: '<p>This is the deeper state</p>'
			});

--------------------------




	*/