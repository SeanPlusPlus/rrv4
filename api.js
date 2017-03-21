import express from 'express'
import bodyParser from 'body-parser'
import MongoClient from 'mongodb'
import assert from 'assert'


const app = express()
app.use(bodyParser.json());

const DB_NAME = 'todos'
const DB_URL = `mongodb://localhost:27017/${DB_NAME}`

app.get('/', function (req, res) {
  const description = 'Hello World!'
  res.send({
    description,
  })
})

const findDocuments = function(db, callback) {
  const collection = db.collection(DB_NAME);
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

app.get('/todos', function (req, res) {
  const description = 'list of todos'
  MongoClient.connect(DB_URL, function(err, db) {
    findDocuments(db, function(todos) {
      res.send({
        description,
        todos,
      })
      db.close();
    });
  });
})

const insertDocument = function(db, data, callback) {
  const collection = db.collection(DB_NAME);
  collection.insertOne(data, function(err, result) {
    callback();
  });
}

app.post('/todos', function (req, res) {
  const url = 'mongodb://localhost:27017/myproject'
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

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
