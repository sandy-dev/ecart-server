'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    userId: String,
    bookId: String,
    date: String
    //book: { type: Schema.Types.ObjectId, ref: 'Book' },
});

var CartModel = exports.CartModel = mongoose.model('Cart', cartSchema);