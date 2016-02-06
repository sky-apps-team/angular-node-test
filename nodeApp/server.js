'use strict';

var NODE_PORT = 9999;
var restify = require('restify');
var cookies = require('restify-cookies');
var validation = require('node-restify-validation');
var config = require('./config');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sky');
var db = mongoose.connection;

var server = restify.createServer({
    name: 'SkyServer'
});

// standard handlers
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(cookies.parse);

// log debug message on each request
server.use(function request(req, res, next) {
    console.log(req.method, req.url);
    return next();
});

// Demands JWT auth on EVERY request except login requests
server.use(function (req, res, next) {
    if (req.url === '/login') {
        return next();
    }
    var token = req.cookies[config.jwt.cookieName];
    if (!token) {
        res.send(401);
    }
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
            res.send(401);
        } else {
            req.decoded = decoded;
            return next();
        }
    });
});

// Make db accessible to request
server.use(function (req, res, next) {
    req.db = db;
    next();
});

// use restify validation
//noinspection JSUnusedGlobalSymbols
server.use(validation.validationPlugin({
    errorsAsArray: false,
    forbidUndefinedVariables: true,
    errorHandler: function () {
        // Throw a 400 if validation fails
        return new restify.errors.BadRequestError();
    }
}));

// routing
require('./src/routes/authenticated/router')(server);
require('./src/routes/login/router')(server);
require('./src/routes/logout/router')(server);
require('./src/routes/attempts/router')(server);

// start server
server.listen(NODE_PORT, function () {
    console.log('Server listening on port ', NODE_PORT);
});

module.exports = server;
