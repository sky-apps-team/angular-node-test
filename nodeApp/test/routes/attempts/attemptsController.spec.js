"use strict";

var ROOT = '../../../';
var supertest = require('supertest');
var server = require(ROOT + 'server');
var agent = supertest.agent(server);
var config = require(ROOT + 'config');
var mockLogin = require('../../mockLogin');
var chai = require('chai');
var expect = chai.expect; // jshint ignore:line

var adminAuthCookie;
var nonAdminAuthCookie;

describe('attemptsController', function () {

    before(function (done) {
        mockLogin(agent).then(function (cookie) {
            nonAdminAuthCookie = cookie;
            return mockLogin(agent, {username: 'admin', password: 'password'});
        }).then(function (cookie) {
            adminAuthCookie = cookie;
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('should respond 200 if a request provides a valid token and the user is an administrator', function (done) {
        agent
            .get('/attempts')
            .set('Cookie', adminAuthCookie)
            .expect(200, done);
    });

    it('should respond 403 if a request provides a valid token and the user is not an administrator', function (done) {
        agent
            .get('/attempts')
            .set('Cookie', nonAdminAuthCookie)
            .expect(403, done);
    });

    it('should respond 401 if a request does not provide a token', function (done) {
        agent
            .get('/attempts')
            .expect(401, done);
    });

    it('should respond 401 if a request provides an invalid token', function (done) {
        agent
            .get('/attempts')
            .set('Cookie', config.jwt.cookieName + '=invalid')
            .expect(401, done);
    });

    it('should record failed authentication attempts', function (done) {

        var credentials = {
            username: 'fred',
            password: 'passy'
        };

        agent
            .post('/login')
            .send(credentials)
            .expect(401, function (err) {
                if (err) {
                    return done(err);
                }
                agent
                    .get('/attempts')
                    .set('Cookie', adminAuthCookie)
                    .expect(200, function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        expect(res.body.length).to.be.above(0);
                        var authAttempt = res.body[0];
                        expect(authAttempt).to.have.property('IP');
                        expect(authAttempt).to.have.property('Datetime');
                        expect(authAttempt).to.have.property('Action');
                        expect(authAttempt).to.have.property('Username');
                        expect(credentials.username).to.equal(authAttempt.Username);
                        expect('AUTH_FAILURE').to.equal(authAttempt.Action);
                        done();
                    });
            });
    });

    it('should record successful authentication attempts', function (done) {

        var credentials = {
            username: 'tester',
            password: 'password'
        };

        agent
            .post('/login')
            .send(credentials)
            .expect(200, function (err) {
                if (err) {
                    return done(err);
                }
                agent
                    .get('/attempts')
                    .set('Cookie', adminAuthCookie)
                    .expect(200, function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        expect(res.body.length).to.be.above(0);
                        var authAttempt = res.body[0];
                        expect(authAttempt).to.have.property('IP');
                        expect(authAttempt).to.have.property('Datetime');
                        expect(authAttempt).to.have.property('Action');
                        expect(authAttempt).to.have.property('Username');
                        expect(credentials.username).to.equal(authAttempt.Username);
                        expect('AUTH_SUCCESS').to.equal(authAttempt.Action);
                        done();
                    });
            });
    });

    it('should record IPv4 addresses', function (done) {

        var credentials = {
            username: 'tester',
            password: 'password'
        };
        var ip = "192.168.4.5";

        agent
            .post('/login')
            .set('x-forwarded-for', ip)
            .send(credentials)
            .expect(200, function (err) {
                if (err) {
                    return done(err);
                }
                agent
                    .get('/attempts')
                    .set('Cookie', adminAuthCookie)
                    .expect(200, function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var authAttempt = res.body[0];
                        expect(ip).to.equal(authAttempt.IP);
                        done();
                    });
            });
    });

    it('should record IPv4 addresses', function (done) {

        var credentials = {
            username: 'tester',
            password: 'password'
        };
        var ip = "192.168.4.5";

        agent
            .post('/login')
            .set('x-forwarded-for', ip)
            .send(credentials)
            .expect(200, function (err) {
                if (err) {
                    return done(err);
                }
                agent
                    .get('/attempts')
                    .set('Cookie', adminAuthCookie)
                    .expect(200, function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var authAttempt = res.body[0];
                        expect(ip).to.equal(authAttempt.IP);
                        done();
                    });
            });
    });

    it('should record IPv6 to IPv4 mapped addresses', function (done) {

        var credentials = {
            username: 'tester',
            password: 'password'
        };
        var ip = "0:0:0:0:0:ffff:c0a8:405";
        var expected = "192.168.4.5";

        agent
            .post('/login')
            .set('x-forwarded-for', ip)
            .send(credentials)
            .expect(200, function (err) {
                if (err) {
                    return done(err);
                }
                agent
                    .get('/attempts')
                    .set('Cookie', adminAuthCookie)
                    .expect(200, function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var authAttempt = res.body[0];
                        expect(expected).to.equal(authAttempt.IP);
                        done();
                    });
            });
    });

    it('should record IPv6 addresses', function (done) {

        var credentials = {
            username: 'tester',
            password: 'password'
        };
        var ip = "2001:0db8::0001";
        var expected = "2001:db8:0:0:0:0:0:1";

        agent
            .post('/login')
            .set('x-forwarded-for', ip)
            .send(credentials)
            .expect(200, function (err) {
                if (err) {
                    return done(err);
                }
                agent
                    .get('/attempts')
                    .set('Cookie', adminAuthCookie)
                    .expect(200, function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var authAttempt = res.body[0];
                        expect(expected).to.equal(authAttempt.IP);
                        done();
                    });
            });
    });

    it('should recognise invalid addresses', function (done) {

        var credentials = {
            username: 'tester',
            password: 'password'
        };
        var ip = "fred";
        var expected = "unknown";

        agent
            .post('/login')
            .set('x-forwarded-for', ip)
            .send(credentials)
            .expect(200, function (err) {
                if (err) {
                    return done(err);
                }
                agent
                    .get('/attempts')
                    .set('Cookie', adminAuthCookie)
                    .expect(200, function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var authAttempt = res.body[0];
                        expect(expected).to.equal(authAttempt.IP);
                        done();
                    });
            });
    });
});
