'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Photos', 'Articles',
	function($scope, Authentication, Photos, Articles) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.Posts = "User posts of those the logged in user is friends with, otherwise recent posts by all users";
		
		$scope.allPhotos = Photos.query();
		$scope.allBlogs = Articles.query();
		//console.log($scope.allPhotos);
		//$scope.Posts = $scope.allPhotos.concat($scope.allBlogs);
		//console.log($scope.Posts);
	}
]);