"use strict";

var ROOT = '../../../';
var supertest = require('supertest');
var server = require(ROOT + 'server');
var agent = supertest.agent(server);
var config = require(ROOT + 'config');
var mockLogin = require('../../mockLogin');

var authCookie;

describe('logoutController', function () {

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
            .post('/logout')
            .set('Cookie', authCookie)
            .expect(200, done);
    });

    it('should respond 401 if a request does not provide a token', function (done) {
        agent
            .post('/logout')
            .expect(401, done);
    });

    it('should respond 401 if a request provides an invalid token', function (done) {
        agent
            .post('/logout')
            .set('Cookie', config.jwt.cookieName + '=invalid')
            .expect(401, done);
    });

    it('should return set-cookie header on successful logout', function (done) {

        agent
            .post('/logout')
            .set('Cookie', authCookie)
            .expect(200, function (err, res) {

                if (err) {
                    return done(err);
                }

                var cookie = res.headers['set-cookie'][0];

                // test set-cookie header is present
                if (!cookie) {
                    return done(Error('set-cookie header missing'));
                }

                // test cookie name is present
                if (cookie.indexOf(config.jwt.cookieName) < 0) {
                    return done(Error(config.jwt.cookieName + ' missing in set-cookie header'));
                }

                // test HttpOnly is present
                if (cookie.indexOf('HttpOnly') < 0) {
                    return done(Error('HttpOnly missing in set-cookie header'));
                }

                // test  Max-Age is present
                if (cookie.indexOf('Max-Age') < 0) {
                    return done(Error('Max-Age missing in set-cookie header'));
                }

                done();
            });
    });
});
