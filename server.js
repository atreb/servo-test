const fs = require('fs'),
  app = require('express')(),
  PORT = process.env.PORT || 4001,
  s3svc = require('./s3svc.js');

app.get('/_health', (req, res) => {
  res.json({status: 'ok'});
});

app.get('/_env', (req, res) => {
  console.log('accessing /_env');
  res.json(process.env);
});

//elb has 60 sec ideal time on connections so dont inc nginx timeout beyond that
app.get('/slowendpoint', (req, res) => {
  setTimeout(function () {
    res.json({status: '12 sec delayed response'});
  }, 12000);//wait for 12 sec for nginx to timeout at 10 sec
});

app.get('/s3/:action(get|put|delete|list)', (req, res) => {
  s3svc(req.params.action, function (err, data) {
    if (err) return res.status(500).json({error: err.stack});
    res.json(data);
  });
});

app.listen(PORT, () => {
  console.log('Application started on port: ' + PORT);
});
