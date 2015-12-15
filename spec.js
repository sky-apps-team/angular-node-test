var should = require('chai').should();
var request = require('supertest');
var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');



describe('API', function(){
  beforeEach(function () {
    app = require('./app');
  });
  it('/api/login should respond with json', function(done){
    request(app)
      .get('/api/login')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('/api/login should have auth: false', function(done){
    request(app)
      .get('/api/login')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property("auth");
        expect(res.body.auth).to.equal(false)
        done();
      });
  });

  it('/api/login with username/password should have auth: true', function(done){
    request(app)
      .get('/api/login?u=admin&p=password')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property("auth");
        expect(res.body.auth).to.equal(true)
        done();
      });
  })
});


describe('Authenticate', function(){
  beforeEach(function () {
    authenticate = require('./auth');
  });

  it('correct username/password should return true', function(done){
    var flag = authenticate('admin','password')
    expect(flag).to.equal(true)
    done();
  });

  it('incorrect username/password should return false', function(done){
    var flag = authenticate('admin','something else')
    expect(flag).to.equal(false)
    done();
  });

  it('username is case insensitive and should return true', function(done){
    var flag = authenticate('aDMin','password')
    expect(flag).to.equal(true)
    done();
  });

  it('password is case sensitive and should return false', function(done){
    var flag = authenticate('aDMin','passworD')
    expect(flag).to.equal(false)
    done();
  });

});
