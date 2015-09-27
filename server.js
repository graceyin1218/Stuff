var express = require('express');
var app = express();
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;


var photos;

MongoClient.connect("mongodb://localhost:27017/Stuff", function(err, db)
{
	if (err) throw err;
	photos = db.collection("photos");
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

});


var server = app.listen(process.env.PORT, function() {
  var host = server.address().address,
      port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
