'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = auth;

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function auth(req, res, next) {

    var token = req.header('x-auth-token');

    if (!token) return res.status(401).json({ msg: 'No token, authorizaton denied' });

    try {
        var decoded = _jsonwebtoken2.default.verify(token, _config2.default.get('jwtSecret'));
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}