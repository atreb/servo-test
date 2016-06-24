var express = require('express'),
    app = express(),
    PORT = process.env.PORT || 4001;

app.get('/_health', function (req, res) {
  res.json({status: 'ok'});
});

app.get('/_env', function (req, res) {
  res.json(process.env);
});

app.get('/slowendpoint', function (req, res) {
  console.log('Got request for slow endpoint');
  //wait for 12 sec for nginx to timeout at 10 sec
  setTimeout(function () {
    console.log('Sending response for slow endpoint');
    res.json({status: '12 sec delayed response'});
  }, 12000);
})

app.listen(PORT, function () {
  console.log('Application started on port: ' + PORT);
});
