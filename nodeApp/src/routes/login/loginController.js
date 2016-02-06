'use strict';

var ROOT = '../../../';
var users = require(ROOT + 'users');
var _ = require('underscore');
var jwt = require('jsonwebtoken');
var config = require(ROOT + 'config');

var mongooseModels = require(ROOT + 'mongooseModels');

/**
 * Controller facilitating login
 */
module.exports = function (req, res, next) {
    var username = req.params.username;
    var password = req.params.password;
    var user = _.findWhere(users, {username: username.toLowerCase()});
    var authenticated = user != null && user.password === password;
    var action = authenticated ? "AUTH_SUCCESS" : "AUTH_FAILURE";
    var responseCode = authenticated ? 200 : 401;

    /**
     * An IIFE which encapsulates IP deterministic logic
     * TODO: This logic is too heavy for a controller and should be moved to the model
     */
    var ip = (function (req) {
        var ipaddr = require('ipaddr.js');
        var ipString = (req.headers["X-Forwarded-For"] ||
            req.headers["x-forwarded-for"] ||
            '').split(',')[0] ||
            req.connection.remoteAddress;

        if (ipaddr.isValid(ipString)) {
            try {
                var addr = ipaddr.parse(ipString);
                if (ipaddr.IPv6.isValid(ipString) && addr.isIPv4MappedAddress()) {
                    return addr.toIPv4Address().toString();
                }
                return addr.toNormalizedString();
            } catch (e) {
                return ipString;
            }
        }
        return 'unknown';
    }(req));

    // Populate an object which stores authentication attempt data
    var authModelData = {
        "IP": ip,
        "Datetime": Date.now(),
        "Action": action,
        "Username": username
    };

    // Save our authentication attempt data
    var attempt = new mongooseModels.AuthAttemptModel(authModelData);
    attempt.save(function (err) {
        /* istanbul ignore next */
        if (err) {
            throw err;
        }

        // If the user is authenticated then send back
        // a JSON web token which will be used for all subsequent requests
        if (authenticated) {
            var token = jwt.sign(user, config.jwt.secret, {
                expiresIn: config.jwt.expiresIn
            });
            res.setCookie(config.jwt.cookieName, token, {
                maxAge: config.jwt.expiresIn,
                httpOnly: true
            });
        }

        res.send(responseCode);
        return next();
    });
};
