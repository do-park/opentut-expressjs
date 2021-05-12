const express = require('express');
const app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function (request, response, next) {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();
  });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);


app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broken!');
});

app.listen(3000, () => console.log('Example app listening on port 3000'))
