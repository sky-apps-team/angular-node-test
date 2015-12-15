'use strict';

/**
 * Routing for /login
 * We validate requests to ensure that credentials provided are as expected
 * Invalid requests will get a 400 response
 *
 * If the credentials provided are deemed invalid by restify validation then controller execution will not occur
 * This means that requests intercepted at this stage will go unlogged!
 * Better discuss this approach with the client
 */
var ROOT = '../../../';
var Validate = require(ROOT + 'Validate');

module.exports = function (server) {
    var controller = require('./loginController');
    var loginValidation = new Validate().payload({
        username: {isRequired: true, regex: '^[A-z]+$'},
        password: {isRequired: true}
    });
    server.post({url: '/login', validation: loginValidation}, controller);
};
