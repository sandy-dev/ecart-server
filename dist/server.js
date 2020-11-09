'use strict';

var express = require('express');
var fileUpload = require('express-fileupload');
var graphqlHTTP = require('express-graphql');
var cors = require('cors');
var schema = require('./schema/schema');
var path = require('path');

var app = express();

var mongoUrlLocal = 'mongodb://localhost:27017/test3';
var mongoUrlLive = 'mongodb://127.0.0.1:27017/test3';

// Allow cross-origin
app.use(cors());

app.use(fileUpload());
// Upload Endpoint
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

var mongoose = require('mongoose');

mongoose.connect(mongoUrlLive);

mongoose.connection.once('open', function () {
    console.log('conneted to database');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.use(express.static('public'));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

var PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    return console.log('Server started on port ' + PORT);
});