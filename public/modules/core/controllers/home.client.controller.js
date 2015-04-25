'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.Posts = "User posts of those the logged in user is friends with, otherwise recent posts by all users";
	}
]);