'use strict';

var ROOT = '../../../';
var config = require(ROOT + 'config');

/**
 * Controller facilitating logout
 */
module.exports = function (req, res, next) {
    // Expire the JSON web token
    res.setCookie(config.jwt.cookieName, '', {
        maxAge: 0,
        httpOnly: true
    });
    res.send(200);
    return next();
};
