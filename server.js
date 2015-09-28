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
  counters.insert({
    '_id': 'photoID',
    'seq': 0
  });
});

app.get('/submit', function(req, res)
{
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

app.get('/', function(req, res) {
/*
  var src = "http://img15.deviantart.net/30a7/i/2012/341/f/f/pichu_vector_by_leek128-d1a1zck.jpg;";

*/

  res.send('Hello, world!');
//  res.sendFile(src); //("<img src = \" " + src + "\" > ");

	var src = "http://img15.deviantart.net/30a7/i/2012/341/f/f/pichu_vector_by_leek128-d1a1zck.jpg;";

	var count = photos.count();
	var pretendphoto = {"_id" : src, "count": count};

	//upload photo
	photos.insert(pretendphoto);


  res.sendFile('index.html');
});


app.get('/index.js', function(req, res) {
  res.sendFile('index.js');
});

var server = app.listen(process.env.PORT, function() {
  var host = server.address().address,
      port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
