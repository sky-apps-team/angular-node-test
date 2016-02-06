'use strict';

/**
 * Routing for /logout
 */
module.exports = function (server) {
    var controller = require('./logoutController');
    server.post({url: '/logout'}, controller);
};
