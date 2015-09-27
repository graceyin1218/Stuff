var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello, world!')
});


var server = app.listen(process.env.PORT, function() {
  var host = server.address().address,
      port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});