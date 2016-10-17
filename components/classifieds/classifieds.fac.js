(function(){

	'use strict';

	angular // Dette er bare måten en factory skrives på. 
		.module("ngClassifieds")
		.factory("classifiedsFactory", function($http, $firebaseArray){
			
			var ref = new Firebase('https://haraldistesting.firebaseio.com/');
			//console.log(ref);

			return {
				ref: $firebaseArray(ref)
			}
		});

})();

/*
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