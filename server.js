var express = require('express')
  app = express(),
  PORT = process.env.PORT || 4001;

app.get('/_health', function (req, res) {
  res.json({status: 'ok'});
});

app.get('/_env', function (req, res) {
  res.json(process.env);
});

app.listen(PORT, () => {
  console.log(`Application started on port: ${PORT}`);
});
