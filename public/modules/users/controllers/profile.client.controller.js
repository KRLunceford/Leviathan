'use strict';

angular.module('users').controller('ProfileController', ['$scope', '$stateParams', '$http', '$location', 'Users', 'Authentication', 'UserProf',
	function($scope, $stateParams, $http, $location, Users, Authentication, UserProf) {
		$scope.user = Authentication.user;
		
		$scope.isFriend = false;

		$scope.viewProfile = function() {
			console.log("hi");
			console.log($stateParams.displayName);
			//console.log(Users);
			$scope.user2 = UserProf.get({
				displayName: $stateParams.displayName
			}, function() {
				//console.log($scope.user2.profPic);
				//console.log($scope.user2);
				//console.log($scope.user2.displayName);
			});
			//console.log($scope.user2);
			
		};
		
		$scope.friendThis = function() {
			Users.requestFriend(user._id, $scope.user2._id, function() {
				console.log('kdfjl;ad');
			});
			/*var user2 = $scope.user2;
			console.log('yo: ' +$scope.user2.username);
			console.log(user2._id);
			console.log(user._id);
			$http.put('users/friend/' + user2._id).success(function() {
				user2.friends.push($scope.user._id);
				$scope.isFriend = true;
				console.log(user.friends);
			});*/
		};
	}
]);