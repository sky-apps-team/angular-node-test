'use strict';

/**
 * Routing for /attempts
 */
module.exports = function (server) {
    var controller = require('./attemptsController');
    server.get({url: '/attempts'}, controller);
};
