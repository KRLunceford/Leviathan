'use strict';

angular.module('users').controller('ProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		$scope.viewProfile = function() {
			$scope.username = "Username";
			$scope.firstName = "FirstName";
			$scope.lastname = "Lastname";
			$scope.email = "Email";
			$scope.posts = "Also displaying posts/uploads";
		};
	}
]);