'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Photo = mongoose.model('Photo'),
	Comment = mongoose.model('Comment'),
	_ = require('lodash');

/**
 * Create a Photo
 */
exports.create = function(req, res) {
  //console.log(req.body);
  //console.log(req.files);
  //console.log('User info: ' +req.user.username);
  var photo = new Photo(req.body);
  photo.user = req.user;
  photo.priv = req.user.priv;
  //photo.user.displayName = req.user.username;
  //photo.user.username = req.user.username;
  photo.likes.push(req.user._id);
  console.log(photo.user);
  if(req.files.image) {
    photo.image =req.files.image.path.substring(7);
    //console.log(photo.image);
  }  else
    photo.image='default.jpg';
  photo.save(function(err) {
    if (err) {
      return res.status(400).send({
	message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.redirect('/#!/photos/'+photo._id); // redirection to '/'jsonp(photo);
    }
  });
};

/**
 * Show the current Photo
 */
exports.read = function(req, res) {

  var photo = req.photo;
  console.log(photo);
  console.log("yooooo");
  //  photo = _.extend(photo , req.body);
  photo.views += 1;
  photo.save(function(err) {
    if (err) {
      console.log('Problem'+err);
      return res.status(400).send({
	message: errorHandler.getErrorMessage(err)
      });
    } else 
      res.jsonp(photo);
  });
};


/**
 * Update a Photo
 */
exports.update = function(req, res) {
	var photo = req.photo ;

	photo = _.extend(photo , req.body);

	photo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(photo);
		}
	});
};

/**
 * Delete an Photo
 */
exports.delete = function(req, res) {
	var photo = req.photo ;

	photo.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(photo);
		}
	});
};

/**
 * List of Photos
 */
exports.list = function(req, res) { 
	Photo.find().sort('-created').populate('user', 'displayName').exec(function(err, photos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(photos);
		}
	});
};
/**
 * Likes a photo
 */
exports.like = function(req, res) {
  var user = req.user;
  var containsValue = false;
  console.log(req.photo.likes);

  // Determine if user is already in 
  for(var i=0; i<req.photo.likes.length; i++) {
    console.log('Comparing ' + req.photo.likes[i] + ' to ' + req.user._id + ' is ' + req.photo.likes[i].equals(req.user._id));
    if(req.photo.likes[i].equals(req.user._id)) {
      containsValue = true;
    }
  }
  if(!containsValue) {
	req.photo.likes.push(req.user._id);
  }
  req.photo.save(function(err) {
    if (err) {
      return res.status(400).send({
		message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(req.photo);
	 }
  });
};




/**
 * Photo middleware
 */
exports.photoByID = function(req, res, next, id) {
  console.log('finding by id:'+id);
	Photo.findById(id).populate('user', 'displayName').exec(function(err, photo) {
	  if (err) return next(err);
	  if (! photo) return next(new Error('Failed to load Photo ' + id));
	  req.photo = photo;
	  next();
	});
};

/**
 * Photo authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.photo.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
