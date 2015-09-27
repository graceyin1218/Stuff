var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req, res) {
  res.send(fs.readFileSync('index.html').toString());
});
app.get('/index.js', function(req, res) {
  res.send(fs.readFileSync('index.js').toString());
});


var server = app.listen(process.env.PORT, function() {
  var host = server.address().address,
      port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
