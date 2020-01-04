'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema({
    rating: Number,
    review: String,
    bookId: String,
    userId: String,
    date: String
});

var RatingModel = exports.RatingModel = mongoose.model('Rating', ratingSchema);