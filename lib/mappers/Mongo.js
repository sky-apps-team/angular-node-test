import MongoClient from 'mongodb';
import settings from '../../config/settings';

let db;

export default class Mongo {
  constructor (done) {
    MongoClient.connect(settings.mongoURL, function(err, _db) {
        db = _db;
        console.log("Connected correctly to server");
        done();
    });
  }

  collection (name) {
    return db.collection(name);
  }
}
