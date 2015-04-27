'use strict';

angular.module('core').controller('SidebarController', ['$scope', 'Authentication', 'Menus', 'Photos', 'Articles', 
	function($scope, Authentication, Menus, Photos, Articles) {
	
		// Find a list of Photos
	  //$scope.find = function() {
	  //console.log('hi');
	    $scope.popular = Photos.query();
		//console.log($scope.popular);
		console.log("hi!");
	  //};
		//$scope.popular = "popular Images! Logged in users can see all popular images, while logged out guests will only be able to view images not marked as private by the uploader";
		//$scope.blogs = "Popular Blog Posts here! Same deal as with images concerning logged in vs out";
		
		$scope.blogs = Articles.query();
	}
]);