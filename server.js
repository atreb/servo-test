var fs = require('fs'),
  express = require('express'),
  app = express(),
  PORT = process.env.PORT || 4001,
  multiParty = require('multiparty'),
  bodyParser = require('body-parser'),
  pdf = require('html-pdf'),
  pdfOptions = require('./pdf.options.json'),
  fs = require('fs');

app.use(bodyParser.json());

app.get('/_health', function (req, res) {
  console.log('accessing /_health');
  res.json({status: 'ok'});
});

app.get('/_env', function (req, res) {
  console.log('accessing /_env');
  res.json(process.env);
});

app.get('/slowendpoint', function (req, res) {
  //wait for 12 sec for nginx to timeout at 10 sec
  setTimeout(function () {
    res.json({status: '12 sec delayed response'});
  }, 12000);
});

app.post('/postendpoint', function (req, res) {
  res.json(req.body);
});

app.post('/uploadendpoint', function (req, res) {
  var form = new multiParty.Form();
  form.parse(req, function (err, fields, files) {
    if (err) return res.json({error: err.stack});
    //This saves the file to downloads directory in current directory
    // fs.rename(files.file[0].path, './' + files.file[0].originalFilename, function (err) {
    //   if (err) return res.json({error: err.stack});
    //   res.json({fields: fields, files: files});
    // });
    //This deletes the uploaded file
    fs.unlink(files.file[0].path, function (err) {
      if (err) return res.json({error: err.stack});
      res.json({msg: 'File was successfully uploaded to server and then deleted'});
    });
  });
});

app.get('/downloadpdf', function (req, res) {
  var filename = './' + (new Date()).getTime() + '.pdf',
    htmlString = fs.readFileSync('./pdf.html', 'utf-8').replace(/##date##/gi, new Date()),
    options = pdfOptions.options;
  pdf.create(htmlString, options).toFile(filename, function (err, data) {
    if (err) return res.json({error: err.stack});
    res.download(filename);//download file
  });
});

app.use(express.static('static'));

app.listen(PORT, function () {
  console.log('Application started on port: ' + PORT);
});
