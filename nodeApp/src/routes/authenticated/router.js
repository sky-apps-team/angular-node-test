'use strict';

/**
 * Routing for /authenticated
 */
module.exports = function (server) {
    var controller = require('./authenticatedController');
    server.head({url: '/authenticated'}, controller);
};
