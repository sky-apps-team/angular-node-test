'use strict';

var _ = require('underscore');

/**
 * Provides assistance in building up restify validation objects
 * @constructor
 */
function Validate() {
    this.resources = {};
    this.content = {};
    //noinspection JSUnusedGlobalSymbols
    this.queries = {};
}

//Validate.prototype.url = function (rule) {
//  var self = this;
//  _.extend(self.resources, rule);
//  return self;
//};

Validate.prototype.payload = function (rule) {
    var self = this;
    _.extend(self.resources, rule);
    _.extend(self.content, rule);
    return self;
};

//Validate.prototype.query = function (rule) {
//  var self = this;
//  _.extend(self.resources, rule);
//  _.extend(self.queries, rule);
//  return self;
//};

module.exports = Validate;
