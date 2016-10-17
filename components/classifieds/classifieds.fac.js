(function(){

	'use strict';

	angular // Dette er bare måten en factory skrives på. 
		.module("ngClassifieds")
		.factory("classifiedsFactory", function($http){
			
			function getClassifieds(){
				return $http.get("data/classifieds.json");
			}

			return {
				getClassifieds: getClassifieds
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