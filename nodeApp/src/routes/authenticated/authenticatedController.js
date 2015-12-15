'use strict';

/**
 * Controller permitting user authentication
 * This response will be intercepted if the token is invalid resulting in a 401 for unauthorised users
 */
module.exports = function (req, res, next) {
    res.send(200);
    return next();
};
