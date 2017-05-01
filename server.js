const fs = require('fs'),
  app = require('express')(),
  PORT = process.env.PORT || 80,
  bodyParser = require('body-parser');

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

app.post('/webhook', bodyParser.json(), (req, res) => {
  console.log(`/webhook recieved POST body: ${JSON.stringify(req.body)}`);
  res.status(204);
});

app.listen(PORT, () => {
  console.log(`Application started on port: ${PORT}`);
});
