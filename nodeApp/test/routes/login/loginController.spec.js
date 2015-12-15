'use strict';

var ROOT = '../../../';
var supertest = require('supertest');
var config = require(ROOT + 'config');
var server = require(ROOT + 'server');
var agent = supertest.agent(server);

describe('loginController', function () {

    it('should respond 200 when valid login credentials are provided', function (done) {
        agent
            .post('/login')
            .send({
                username: 'tester',
                password: 'password'
            })
            .expect(200, done);
    });

    it('should respond 401 when the username is invalid', function (done) {
        agent
            .post('/login')
            .send({
                username: 'testerAnyone',
                password: 'password'
            })
            .expect(401, done);
    });

    it('should respond 401 when the password is invalid', function (done) {
        agent
            .post('/login')
            .send({
                username: 'tester',
                password: 'pass'
            })
            .expect(401, done);
    });

    it('should support case insensitive usernames', function (done) {
        agent
            .post('/login')
            .send({
                username: 'tEstEr',
                password: 'password'
            })
            .expect(200, done);
    });

    it('should support case sensitive passwords', function (done) {
        agent
            .post('/login')
            .send({
                username: 'tester',
                password: 'passwOrd'
            })
            .expect(401, done);
    });

    it('should respond 400 when no username is provided', function (done) {
        agent
            .post('/login')
            .send({
                password: 'password'
            })
            .expect(400, done);
    });

    it('should respond 400 when no password is provided', function (done) {
        agent
            .post('/login')
            .send({
                username: 'tester'
            })
            .expect(400, done);
    });

    it('should respond 400 when the username contains non alphabetical characters', function (done) {
        agent
            .post('/login')
            .send({
                username: 'john.smith',
                password: 'password'
            })
            .expect(400, done);
    });

    it('should return set-cookie header on successful login', function (done) {

        agent
            .post('/login')
            .send({
                username: 'tester',
                password: 'password'
            })
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
