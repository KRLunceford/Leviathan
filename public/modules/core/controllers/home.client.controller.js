'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Photos', 'Articles', 'Users',
	function($scope, Authentication, Photos, Articles, Users) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.Posts = "User posts of those the logged in user is friends with, otherwise recent posts by all users";
		
		$scope.allPhotos = Photos.query();
		$scope.allBlogs = Articles.query();
		
		console.log($scope.allPhotos);
		
		//was attempting custom filter
		$scope.filterByThis = function(arrayName) {
			var array = arrayName;
			console.log(array);
			return function(item) {
				return (array.indexOf(item) >= 0);
			}
		};
	}
]);