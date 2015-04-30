'use strict';

angular.module('users').controller('ProfileController', ['$scope', '$stateParams', '$http', '$location', 'Users', 'Authentication',
	function($scope, $stateParams, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;
		
		$scope.isFriend = false;

		$scope.viewProfile = function() {
			console.log("hi");
			console.log($stateParams.displayName);
			//console.log(Users);
			$scope.user2 = Users.get({
				displayName: $stateParams.displayName
			}, function() {
				console.log($scope.user2.profPic);
				console.log($scope.user2);
			});
			//console.log($scope.user2);
			
		};
		
		$scope.friendThis = function() {
			var user = $scope.user;
			$http.put('users/friend/' + user._id).success(function() {
				user.friends.push($scope.authentication.user._id);
				$scope.isFriend = true;
				console.log(user.friends);
			});
		};
	}
]);