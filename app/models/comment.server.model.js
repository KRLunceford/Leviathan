'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	commentText: {
		type: String,
		default: '',
		required: 'Please fill Comment name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	what: {
		type: String,
		default: '',
	}
});

mongoose.model('Comment', CommentSchema);