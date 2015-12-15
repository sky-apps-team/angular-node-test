'use strict';

var Q = require('q');
var _ = require('underscore');

/**
 * Provides ability to easily retrieve auth tokens for unit testing purposes
 * @param agent - supertest agent
 * @param credentials - credentials for login
 * @returns promise
 */
module.exports = function (agent, credentials) {
    var def = Q.defer();
    credentials = credentials || {};
    credentials = _.extend({username: 'tester', password: 'password'}, credentials);

    // Make a request to the login API with the credentials passed in
    // or use the defaults
    agent
        .post('/login')
        .send({
            username: credentials.username,
            password: credentials.password
        })
        .end(function (err, res) {
            if (err) {
                // If an error happens then reject the promise
                def.reject(err);
            }
            // Resolve the promise with the JWT
            def.resolve(res.headers['set-cookie'][0]);
        });
    return def.promise;
};
