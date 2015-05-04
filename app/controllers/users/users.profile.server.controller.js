'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Comment = mongoose.model('Comment'),
	User = mongoose.model('User');
//console.log("jakldjf;a");
	
/**
 * Update user details
 */
 exports.friend = function(req, res) {
	var user = req.user;
	console.log('user' + req.user);
	console.log(req.params.user2Id);
	User.findOne({ '_id' : req.params.user2Id }, '_id friends', function(err, user2) {
		console.log(user2);
		//console.log(user.friends.length);
		var containsValue = false;
		for (var i=0; i<user.friends.length; i++) {
			if (user.friends[i].equals(req.params.user2Id)) {
				//console.log("kaldfjw;oiefjiojij");
				containsValue = true;
			}
			//console.log("lksjdf;alfjdk");
		}
		if (!containsValue) {
			//console.log("jkdjfa;wjefoiaj");
			user.friends.push(req.params.user2Id);
		}
		for (var k=0; k<user2.friends.length; k++) {
			if (user2.friends[k].equals(user._id)) {
				containsValue = true;
			}
		}
		if (!containsValue) {
			user2.friends.push(user._id);
		}
		console.log(user.friends);
		console.log(user2.friends);
		
		user.save(function(err) {
			if (err) {
			  return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			  });
			};
		});
		user2.save(function(err) {
			if (err) {
			  return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			  });
			}
		});
      res.jsonp(req.user);
  });
};

exports.viewProf = function(req, res) {
	
	console.log(req.params.displayName);
	//console.log(req.user);
	var displayName = req.params.displayName;
	//console.log(displayName);
	User.findOne( {'displayName': displayName}, 'username displayName profPic friends', function(err, User2) {
		console.log(User2);
		res.jsonp(User2);
	});
	//res.jsonp(displayName);
};

exports.update = function(req, res) {
	// Init Variables
	//console.log("yo");
	var user = req.user;
	console.log(req.body);
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;
		//console.log(req.body);

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};
