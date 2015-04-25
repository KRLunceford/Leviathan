'use strict';

angular.module('core').controller('SidebarController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.popular = "popular Images! Logged in users can see all popular images, while logged out guests will only be able to view images not marked as private by the uploader";
		$scope.blogs = "Popular Blog Posts here! Same deal as with images concerning logged in vs out";
	}
]);