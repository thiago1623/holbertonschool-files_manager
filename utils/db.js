// mongoDB documentation https://github.com/mongodb/node-mongodb-native

const { MongoClient } = require('mongodb');

class DBclient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    // Connection URL
    const url = `mongodb://${host}:${port}/`;
    this.client = null;

    // // Using connect method to connect to the server
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
      if (err) this.client = false;
      else {
        this.client = db.db(database);
        this.client.createCollection('users');
        this.client.createCollection('files');
      }
    });
  }
  isAlive() {
    return !!this.client; // this.client ? true : false;
  }

  // Returns the number of documents in the collection users
  async nbUsers() {
    const numDocs = await this.client.collection('users').estimatedDocumentCount({});
    return numDocs;
  }

  // returns the number of documents in the collection files
  async nbFiles() {
    const numDocs = await this.client.collection('files').estimatedDocumentCount({});
    return numDocs;
  }
}
const dbClient = new DBclient();
module.exports = dbClient;
