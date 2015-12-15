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
});
