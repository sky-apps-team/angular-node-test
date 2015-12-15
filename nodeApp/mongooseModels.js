'use strict';

var mongoose = require('mongoose');
var authAttemptSchema = mongoose.Schema({
    "IP": String,
    "Datetime": Date,
    "Action": String,
    "Username": String
});
var AuthAttemptModel = mongoose.model('AuthAttemptModel', authAttemptSchema);

module.exports = {
    AuthAttemptModel: AuthAttemptModel
};
