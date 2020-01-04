'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    uid: String,
    name: String,
    email: String,
    image: String
});

var UserModel = exports.UserModel = mongoose.model('User', userSchema);