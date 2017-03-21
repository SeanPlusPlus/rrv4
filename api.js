import express from 'express'
const app = express()
import MongoClient from 'mongodb'
import assert from 'assert'

app.get('/', function (req, res) {
  const description = 'Hello World!'
  res.send({
    description,
  })
})

const insertDocuments = function(db, callback) {

  // Get the documents collection
  const collection = db.collection('documents');

  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {

  // Get the documents collection
  const collection = db.collection('documents');

  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

app.get('/todos', function (req, res) {
  const description = 'list of todos'
  const url = 'mongodb://localhost:27017/myproject'

  MongoClient.connect(url, function(err, db) {
    console.log("Connected successfully to server");
    findDocuments(db, function() {
      db.close();
    });
  });

  res.send({
    description,
  })
})

app.post('/todos', function (req, res) {
  const description = 'create todos'
  const url = 'mongodb://localhost:27017/myproject'

  MongoClient.connect(url, function(err, db) {
    console.log("Connected successfully to server");
    insertDocuments(db, function() {
      db.close();
    });
  });

  res.send({
    description,
  })
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
