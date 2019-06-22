var connectionOptions = require('../database/config').getConnectionOptions();
var mysql = require('mysql');

var stopwords = require('../preprocessing/stopwords');
var tokenization = require('../preprocessing/tokenization');
var stemming = require('../preprocessing/stemming');
var counting = require('../preprocessing/counting');

var bagOfWords = require('../features/bagOfWords');

let bofArr1 = [];
let bofArr2 = [];

exports.getTrainingSet = function(result) {
  var connection = mysql.createConnection(connectionOptions);

  connection.connect();

  connection.query("SELECT * from training_set", function (err, rows, fields) {
    if (err) {
      result(err);
    } else {
      result(rows);
    }
  });

  connection.end();
}

exports.getTrainingSetByCategory = function(category, result) {
  var connection = mysql.createConnection(connectionOptions);

  connection.connect();

  connection.query("SELECT * from training_set WHERE category = ?", [category], function (err, rows, fields) {
    if (err) {
      result(err);
    } else {
      result(rows);
    }
  });

  connection.end();
}






//TODO remove
exports.process = function(text) {

  text = text.toLowerCase();

  //console.log("REMOVING STOP WORDS");
  var sw = stopwords.removeStopwords(text);
  //console.log(sw);

  //console.log("CLEANING TEXT");
  var cleanText = tokenization.clean(sw.join(" "));
  //console.log(cleanText);

  //console.log("NORMALIZING TEXT");
  var stem = stemming.normalize(cleanText);

  return stem;
  //console.log(stem);

  //console.log("NGRAM1");
  //var nGram1 = tokenization.ngram(stem, 1);
  //console.log(nGram1);

  //console.log("NGRAM2");
  //var nGram2 = tokenization.ngram(stem, 2);
  //console.log(nGram2);

  //console.log("NUMBER OF WORDS");
  //var words = counting.words(stem.join(" "));
  //console.log(words);

  //console.log("NUMBER OF CHARACTERS");
  //var characters = counting.characters(stem.join(" "));
  //console.log(characters);

  //console.log("TERM FREQUENCY: "+ counting.termFrequency(["victim"], stem));

  //console.log("BAG OF WORDS");
  //bagOfWords.addUniqueTerms(bofArr1, nGram1);
  //console.log(bofArr1);

  //bagOfWords.addUniqueTerms(bofArr2, nGram2);
  //console.log(bofArr2);

  //console.log("EXISTS: " + counting.exists(["victim"], stem));

  //console.log("NUMBER OF OCCURRENCES: " + counting.numberOfOccurrences(["victim"], stem));
}
