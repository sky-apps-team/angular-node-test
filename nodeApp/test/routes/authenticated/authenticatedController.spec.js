"use strict";

var ROOT = '../../../';
var supertest = require('supertest');
var server = require(ROOT + 'server');
var agent = supertest.agent(server);
var config = require(ROOT + 'config');
var mockLogin = require('../../mockLogin');

var authCookie;

describe('authenticatedController', function () {

    before(function (done) {
        mockLogin(agent).then(function (cookie) {
            authCookie = cookie;
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('should respond 200 if a request provides a valid token', function (done) {
        agent
            .head('/authenticated')
            .set('Cookie', authCookie)
            .expect(200, done);
    });

    it('should respond 401 if a request does not provide a token', function (done) {
        agent
            .head('/authenticated')
            .expect(401, done);
    });

    it('should respond 401 if a request provides an invalid token', function (done) {
        agent
            .head('/authenticated')
            .set('Cookie', config.jwt.cookieName + '=invalid')
            .expect(401, done);
    });

});
