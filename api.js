import express from 'express'
import bodyParser from 'body-parser'
import MongoClient from 'mongodb'
import assert from 'assert'
import cors from 'cors'


const app = express()
app.use(bodyParser.json())
app.use(cors())

const DB_NAME = 'messages'
const DB_URL = `mongodb://localhost:27017/${DB_NAME}`

// api
app.get('/api', function (req, res) {
  const description = 'Hello World!'
  res.send({
    description,
  })
})


// GET documents
const findDocuments = function(db, callback) {
  const collection = db.collection(DB_NAME);
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

app.get('/api/messages', function (req, res) {
  console.log(new Date())
  const description = 'list of messages'
  MongoClient.connect(DB_URL, function(err, db) {
    findDocuments(db, function(messages) {
      res.send({
        description,
        messages,
      })
      db.close();
    });
  });
})


// CREATE documents
const insertDocument = function(db, data, callback) {
  const collection = db.collection(DB_NAME);
  collection.insertOne(data, function(err, result) {
    callback();
  });
}

app.post('/api/messages', function (req, res) {
  const data = req.body
  MongoClient.connect(DB_URL, function(err, db) {
    insertDocument(db, data, function() {
      db.close();
      res.send({
        data,
      })
    });
  });
})


// main
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
