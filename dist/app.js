'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _expressFileupload = require('express-fileupload');

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlTools = require('graphql-tools');

var _http = require('http');

var _graphql = require('graphql');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

var _schema = require('./schema/schema');

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require('./schema/resolvers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: _schema2.default,
    resolvers: _resolvers.resolvers
});

var app = (0, _express2.default)();
app.use((0, _cors2.default)());

app.use((0, _expressFileupload2.default)());
app.post('/upload', function (req, res) {

    if (req.files === null || req.files === undefined) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    var file = req.files.file;

    file.mv(__dirname + '/client/public/uploads/' + file.name, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: '/uploads/' + file.name });
    });
});

var mongoUrlLocal = 'mongodb://localhost:27017/test3';
var mongoUrlLive = 'mongodb+srv://test1:test1@tmcluster-sptsd.mongodb.net/test?retryWrites=true&w=majority';
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(mongoUrlLive);
_mongoose2.default.connection.once('open', function () {
    console.log('conneted to database');
});

var PORT = process.env.PORT || 5000;

app.use('/graphql', _bodyParser2.default.json(), (0, _expressGraphql2.default)({
    schema: schema,
    graphiql: true
}));

app.use(_express2.default.static('client/public'));
app.get('*', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, 'client', 'public', 'index.html'));
});

var server = (0, _http.createServer)(app);

server.listen(PORT, function () {
    new _subscriptionsTransportWs.SubscriptionServer({
        execute: _graphql.execute,
        subscribe: _graphql.subscribe,
        schema: schema
    }, {
        server: server,
        path: '/subscriptions'
    });
});