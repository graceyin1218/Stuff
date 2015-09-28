var express = require('express');
var app = express();
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;

var fs = require('fs');

var photos;

MongoClient.connect("mongodb://localhost:27017/Stuff", function(err, db)
{
	if (err) throw err;
	photos = db.collection("photos");
});

app.get('/:word/:prevID/:url', function(req, res)
{
	var newpic = {"word" : req.params.word, "prevID" : req.params.prevID, "url": req.params.url};

	photos.insert(newpic, function(err, doc)
	{
		if (err) throw err;
		var id = doc["_id"];
		res.send("new ID: " + id);
	});
});

app.get("/search/:ID", function(req, res)
{
	var query = {"_id": req.params.ID};
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
