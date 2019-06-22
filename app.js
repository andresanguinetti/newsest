const http = require('http');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

var trainingSetRoutes = require('./routes/TrainingSetRoutes');
var preprocessingRoutes = require('./routes/PreprocessingRoutes');
var testRoutes = require('./routes/TestRoutes');

//var corpus = require('./database/corpus');
//var train = require('./train');

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router);

// Pedido de GET para a raíz
router.get('/', function(req, res) {
  res.render('index');
});

router.use('/training-set', trainingSetRoutes);
router.use('/preprocessing', preprocessingRoutes);
router.use('/test', testRoutes);

/*
app.get('/corpus', function (req, res) {

});

app.get('/preprocessing', function (req, res) {
  res.render('preprocessing');
});

app.get('/test', function (req, res) {
  res.render('test');
});
*/

/*
// Pedido de POST para a raíz
app.post('/list', function (req, res) {
  corpus.getCorpus(req.body.limit, req.body.category, function(response) {
    res.render('list', {data: response});
  });
});

app.get('/detail', function(req, res) {
  corpus.getCorpusById(req.query.id, function(response) {
    res.render('detail', {data: response[0]});
  });
});
*/

httpServer = http.createServer(app);

let httpPort = process.env.PORT || 8081;

httpServer.listen(httpPort, () => {
 console.log('NewsEST Server running on port ' + httpPort);
});

//var server = app.listen(8081, function () {
//var host = server.address().address === "::" ? "localhost" : server.address().address;

//var port = server.address().port;
  //console.log("NewsEST listening at http://%s:%s", host, port);
  /*
  let textArr = [];
  train.getTrainingSet(function(response) {
    response.forEach(function(r, idx, arr) {
      if(idx >= 10) return;
      textArr.push(train.process(r.short_description).join(" "));
    });

    let bagOfWords = require ('./features/bagOfWords');
    let tokenization = require ('./preprocessing/tokenization');
    let bagOfWordsArr = [];

    textArr.forEach(function(text, idx, arr) {
      bagOfWords.addUniqueTerms(bagOfWordsArr, tokenization.ngram(text.split(" "), 1));
    });
    console.log(bagOfWordsArr);


    console.log("BINARY VECTOR:");
    let binaryVector = bagOfWords.binaryVector(bagOfWordsArr, textArr[1].split(" "));
    console.log(JSON.stringify(binaryVector));

    console.log("NO OF OCCURRENCES VECTOR:");
    let nOccurrencesVector = bagOfWords.numberOfOccurrencesVector(bagOfWordsArr, textArr[1].split(" "));
    console.log(JSON.stringify(nOccurrencesVector));

    console.log("TF VECTOR");
    let tfVector = bagOfWords.tfVector(bagOfWordsArr, textArr[1].split(" "));
    console.log(JSON.stringify(tfVector));

    console.log("IDF VECTOR");
    let idfVector = bagOfWords.idfVector(bagOfWordsArr, textArr[1].split(" "));
    console.log(JSON.stringify(idfVector));

    console.log("TF_IDF VECTOR");
    let tfidfVector = bagOfWords.tfidfVector(bagOfWordsArr, textArr[1].split(" "));
    console.log(JSON.stringify(tfidfVector));
      });
*/






    /*let counting = require('./preprocessing/counting');

    let term = ["husband"];
    var tf = counting.termFrequency(term, textArr[0].split(" "));
    var idf = counting.idf(term, textArr);
    var tfidf = counting.tfidf(tf, idf);
    console.log("TF: " + tf);
    console.log("IDF: " + idf);
    console.log("TF_IDF: " + tfidf);*/


//});
