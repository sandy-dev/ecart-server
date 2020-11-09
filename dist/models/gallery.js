'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gallerySchema = new Schema({
    userId: String,
    userName: String,
    timeStamp: String,
    date: String,
    url: String,
    title: String,
    subHeader: String,
    description: String
});

var GalleryModel = exports.GalleryModel = mongoose.model('Gallery', gallerySchema);