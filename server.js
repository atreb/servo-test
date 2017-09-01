const fs = require('fs'),
  express = require('express')
  app = express(),
  PORT = process.env.PORT || 4001,
  s3svc = require('./s3svc.js'),
  bodyParser = require('body-parser'),
  http = require('http'),
  server = http.createServer(app),
  io = require('socket.io').listen(server),
  os = require('os');

//------------------------------------------------------------------------------
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});
app.get('/socket.io-client/dist/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});
let clientCount = 0;
io.on('connection', function (socket) {
    //console.log(`SocketId:${socket.id} connected`);
    clientCount++;
    socket.emit('hostname', os.hostname());
    socket.emit('clientCount', clientCount);
    socket.on('disconnect', function (reason) {
      clientCount--;
      //console.log(`SocketId:${socket.id} disconnected Reason:${reason}`);
    });
    setInterval(()=>{
      socket.emit('clientCount', clientCount);
      socket.emit('serverDate', new Date());
    }, 1000);
});

//------------------------------------------------------------------------------

app.get('/_health', (req, res) => {
  res.json({status: 'ok'});
});

app.get('/_env', (req, res) => {
  console.log('accessing /_env');
  res.json(process.env);
});

app.get('/_headers', (req, res) => {
  console.log('assessing /_headers');
  res.json(req.headers);
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

app.post('/webhook', bodyParser.json(), (req, res) => {
  console.log(`/webhook recieved POST body: ${JSON.stringify(req.body)}`);
  res.status(204);
});

server.listen(PORT, () => {
  console.log(`Application started on port: ${PORT}`);
});
