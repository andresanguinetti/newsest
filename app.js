var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var corpus = require('./database/corpus');

// Pedido de GET para a raíz
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Pedido de POST para a raíz
app.post('/list', function (req, res) {
  console.log(req.body);
  corpus.getCorpus(req.body.limit, req.body.category, function(response) {
    res.render('list', {data: response});
  });
});

app.get('/detail', function(req, res) {
  corpus.getCorpusById(req.query.id, function(response) {
    res.render('detail', {data: response[0]});
  });
});

var server = app.listen(8081, function () {
var host = server.address().address === "::" ? "localhost" : server.address().address;

var port = server.address().port;
console.log("NewsEST listening at http://%s:%s", host, port);
});
