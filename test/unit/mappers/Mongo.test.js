import {assert} from 'chai';
import sinon from 'sinon';
import MongoClient from 'mongodb';
import settings from '../../../config/settings';
import mongo from '../../../lib/mappers/Mongo';

let mocks;

describe('Mongo mapper', () => {

	beforeEach((done) => {
		mocks = {};
		mocks.done = sinon.spy();
		done();
	});

	afterEach((done) => {
		mocks = null;
		done();
	});

	describe('Instantiating a mongo mapper', () => {

		beforeEach((done) => {
			mocks.connect = sinon.stub(MongoClient, 'connect').callsArgWith(1, null, null);
			mocks.mongo = new mongo(mocks.done);
			done();
		});

		afterEach((done) => {
			MongoClient.connect.restore();
			done();
		});

		it('Connects to the database', (done) => {
			assert.isTrue(mocks.connect.calledWith(settings.mongoURL))
			done();
		});

		it('Calls the callback', (done) => {
			assert.isTrue(mocks.done.called);
			done();
		});

	});

	describe('Getting a collection', () => {

		beforeEach((done) => {
			mocks.collection = {};
			mocks.db = {
				collection: sinon.stub().returns(mocks.collection)
			};
			mocks.name = 'myCollection';
			mocks.connect = sinon.stub(MongoClient, 'connect').callsArgWith(1, null, mocks.db);
			mocks.mongo = new mongo(mocks.done);
			mocks.coll = mocks.mongo.collection(mocks.name);
			done();
		});

		afterEach((done) => {
			MongoClient.connect.restore();
			done();
		});

		it('Calls the collection method', (done) => {
			assert.isTrue(mocks.db.collection.calledWith(mocks.name));
			done();
		});

		it('Returns the collection', (done) => {
			assert.equal(mocks.coll, mocks.collection);
			done();
		});

	});

});