var stopwords = require('../preprocessing/stopwords');
var tokenization = require('../preprocessing/tokenization');
var stemming = require('../preprocessing/stemming');
var counting = require('../preprocessing/counting');
var utils = require('../utils/utils');

var bagOfWords = require('../features/bagOfWords');

/**
 * Processes everything, called from the Preprocessing route
 */
exports.process = function(resultSet) {
  return new Promise(resolve => {
    let docObj = {
      documents: [],
      bagOfWords: []
    };

    resultSet.forEach(function(r, idx, arr) {
      docObj.documents.push(r);
    });

    docObj.documents.forEach(function(d, idx, arr) {
      d.cleanText = processFirstStage(d.short_description);
    });


    docObj.bagOfWords1Gram = processSecondStage(docObj.documents, 1);


    docObj.bagOfWords2Gram = processSecondStage(docObj.documents, 2);

    // Order bagOfWords alphabetically
    /*
    docObj.bagOfWords1Gram.sort();
    docObj.bagOfWords2Gram.sort();
    */

    docObj.documents.forEach(function(d, idx, arr) {
        processThirdStage(docObj.bagOfWords1Gram, docObj.bagOfWords2Gram, d, docObj);
    });

    resolve(docObj);

  });
}

/**
 * Return the text properly normalized and stemmed
 */
test1 = function(text) {
  text = text.toLowerCase();

  var sw = stopwords.removeStopwords(text);
  var cleanText = tokenization.clean(sw.join(" "));

  //Remove single characters
  cleanText = cleanText.replace(/ [^ ](?= )/g, '');

  return stemming.normalize(cleanText).join(" ");
}

/**
 * Creates the bag of words
 **/
test2 = function(documents, ngram) {

  let bagOfWordsArr = [];

  documents.forEach(function(document, idx, arr) {
    bagOfWords.addUniqueTerms(bagOfWordsArr, tokenization.ngram(document.cleanText.split(" "), ngram));
  });

  return bagOfWordsArr;

}

test3 = function(bagOfWordsArr1Gram, bagOfWordsArr2Gram, d, docObj) {

  var docs = [];
  docObj.documents.forEach(function(d, idx, arr) {
    docs.push(d.cleanText);
  });
  //1Gram
  var termArr = tokenization.ngram(d.cleanText.split(" "),1);
  d.tf = [];
  d.idf = [];
  termArr.forEach(function(term, idx) {
    d.tf[idx] = counting.termFrequency(term, d.cleanText.split(" "));
    d.idf[idx] = counting.idf(term, docs);
  })

  var termArr2 = tokenization.ngram(d.cleanText.split(" "),2);
  d.tf2 = [];
  d.idf2 = [];
  termArr2.forEach(function(term, idx) {
    d.tf2[idx] = counting.termFrequency(term, d.cleanText.split(" "));
    d.idf2[idx] = counting.idf(term, docs);
  })


}
