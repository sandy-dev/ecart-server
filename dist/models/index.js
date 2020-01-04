'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cart = require('./cart');

var _cart2 = _interopRequireDefault(_cart);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = {
    Cart: _cart2.default
};

exports.default = db;