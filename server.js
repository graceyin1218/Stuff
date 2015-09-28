var express = require('express');
var app = express();
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;

var fs = require('fs');
var db;
var photos, counters;

MongoClient.connect("mongodb://localhost:27017/Stuff", function(err, database)
{
  if (err) throw err;
  photos = database.collection("photos");
  counters = database.collection("counters");
  db = database;
  // Attempt an insert to initialize at 0
  counters.insert({
    '_id': 'photoID',
    'seq': 0
  });
});

app.get('/submit', function(req, res)
{
  // We need to put getNextSequence in callback form as well
  getNextSequence('photoID', function(id) {
    var newpic = {"_id": id, "word" : req.query.word, "prevID" : req.query.prevID, "url": req.query.url};

    photos.insert(newpic, function(err, doc) {
      if (err) throw err;
      res.send("new ID: " + id);
    });
  });
});

function getNextSequence(name, callback) {
  console.log('called on', name);
  // counters.findAndModify() does not return a value; instead, use a callback function(err, ret) to get the "return value".
  var ret = counters.findAndModify({ _id: name }, null, {$inc: { seq: 1 } }, {new: true}, function(err, ret) {
    callback(ret.value.seq);
  });
}

app.get("/search", function(req, res)
{
  var query = {"_id": req.query.ID};
  photos.find(query, function(err, doc)
  {
    res.sendFile(doc["url"]);
  });
});

app.get("/random", function(req, res)
{
  var random = getRandom(function(doc)
  {
    res.send(doc);
  });
});

function getRandom(callback)
{
  var n = photos.count();
  var m = Math.floor(Math.random()*n);
  var cursor = photos.find().limit(1).skip(m);
  callback(cursor.nextObject());
}


app.use(express.static(__dirname + '/public'));

var server = app.listen(process.env.PORT, function() {
  var host = server.address().address,
      port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
