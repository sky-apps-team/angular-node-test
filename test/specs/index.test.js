import {assert} from 'chai';
import app from '../../index';
import request from 'supertest';

let mocks;

describe('Twitter api routes', () => {

  beforeEach((done) => {
    mocks = {};
    done();
  });

  afterEach((done) => {
    mocks = null;
    done();
  });

  describe('Echo', () => {

    beforeEach((done) => {
      mocks.name = 'scheiner';
      request(app)
        .get('/echo/' + mocks.name)
        .end((err, results) => {
          mocks.results = results;
          done();
        });
    });

    it('Returns 200', (done) => {
      assert.equal(mocks.results.statusCode, 200);
      done();
    });

    it('Returns the correct data', (done) => {
      let data = mocks.results.body;
      assert.isObject(data);
      assert.equal(data.name, mocks.name);
      done();
    });
  });
});