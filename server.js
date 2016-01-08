'use strict';

process.on('uncaughtException', function(err) {
  console.error('uncaughtException');
  console.error(err);

  process.exit(1);
});

var path = require('path');

var express = require('express'),
    formidable = require('formidable');

var app = express();

app.set('view engine', 'ejs');
app.disable('x-powered-by');

app.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();

  form.multiples = true;
  form.uploadDir = path.join(__dirname, 'upload');
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.error(err);
      res.sendStatus(500);

      return;
    }

    res.json({
      fields: fields,
      files: files
    });
  });
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000, function() {
  console.log('server starting at 127.0.0.1:3000');
});
