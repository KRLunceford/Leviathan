'use strict';

angular.module('users').controller('ProfileController', ['$scope', '$stateParams', '$http', '$location', 'Users', 'Authentication', 'UserProf', 'Photos', 'Articles',
	function($scope, $stateParams, $http, $location, Users, Authentication, UserProf, Photos, Articles) {
		$scope.user = Authentication.user;
		
		$scope.isFriend = false;
		$scope.friends = 0;

		$scope.viewProfile = function() {
			console.log("hi");
			console.log($stateParams.displayName);
			//console.log(Users);
			$scope.user2 = UserProf.get({
				displayName: $stateParams.displayName
			}, function() {
				console.log($scope.user2.friends);
				$scope.friends = $scope.user2.friends.length;
				var containsValue = false;
				for (var i=0; i<$scope.friends; i++) {
					if ($scope.user2.friends[i]===user._id) {
						containsValue = true;
					}
				}
				$scope.isFriend = containsValue;
				$scope.userPhotos = Photos.query();
				$scope.userBlogs = Articles.query();
				
			});
			//console.log($scope.user2);
			
		};
		
		$scope.friendThis = function() {
			var user2 = $scope.user2;
			console.log('yo: ' +$scope.user2.username);
			console.log(user2._id);
			console.log(user._id);
			$http.put('users/friend/' + user2._id).success(function() {
				user2.friends.push($scope.user._id);
				$scope.isFriend = true;
				console.log(user.friends);
			});
		};
		//attempting custom filter
		$scope.filterThis = function(id) {
			console.log(id);
			return function(user) {
				return user.id == id;
			}
			//return name;
		}
	}
]);