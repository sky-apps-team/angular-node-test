'use strict';

var ROOT = '../../../';
var mongooseModels = require(ROOT + 'mongooseModels');

/**
 * Controller permitting admin users to get a JSON feed of auth attempts
 */
module.exports = function (req, res, next) {
    // Only allow access to admin users
    if (req.decoded.admin === false) {
        res.send(403);
        return next();
    }

    // Retrieve auth attempts
    mongooseModels.AuthAttemptModel.find(function (err, attempts) {
        /* istanbul ignore next */
        if (err) {
            throw err;
        }
        res.send(200, attempts.reverse());
        return next();
    });
};
