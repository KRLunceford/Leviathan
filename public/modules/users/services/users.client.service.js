'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('users').factory('UserProf', ['$resource',
	function($resource) {
		return $resource('users/:displayName', {displayName: '@_id'}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);