'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    name: String,
    pages: Number,

    price: String,
    description: String,
    language: String,
    publishYear: String,
    category: String,

    authorID: String,
    image: String,

    averageRating: Number,
    ratingCount: Number

});

var BookModel = exports.BookModel = mongoose.model('Book', bookSchema);