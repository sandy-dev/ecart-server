'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: String,
    age: Number
});

var AuthorModel = exports.AuthorModel = mongoose.model('Author', authorSchema);