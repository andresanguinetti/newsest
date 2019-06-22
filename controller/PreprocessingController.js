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
      bagOfWords: [],
      binaryVector1GramArr:[],
      nOccurrencesVector1GramArr: [],
      tfVector1GramArr: [],
      idfVector1GramArr: [],
      tfidfVector1GramArr: [],
      binaryVector2GramArr: [],
      nOccurrencesVector2GramArr: [],
      tfVector2GramArr: [],
      idfVector2GramArr: [],
      tfidfVector2GramArr: []
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

    processFourthStage(docObj);

    processFifthStage(docObj);

    processSixthStage(docObj);

    resolve(docObj);

  });
}

/**
 * Return the text properly normalized and stemmed
 */
processFirstStage = function(text) {
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
processSecondStage = function(documents, ngram) {

  let bagOfWordsArr = [];

  documents.forEach(function(document, idx, arr) {
    bagOfWords.addUniqueTerms(bagOfWordsArr, tokenization.ngram(document.cleanText.split(" "), ngram));
  });

  return bagOfWordsArr;

}

/**
 * Creates the binary vector, nº of occurrences vector, tf,
 * idf and tf_idf vectors for a document, given its bag of words
 **/
processThirdStage = function(bagOfWordsArr1Gram, bagOfWordsArr2Gram, d, docObj) {

  d.binaryVector1Gram = bagOfWords.binaryVector(bagOfWordsArr1Gram, d.cleanText.split(" "));
  d.nOccurrencesVector1Gram = bagOfWords.numberOfOccurrencesVector(bagOfWordsArr1Gram, d.cleanText.split(" "));
  d.tfVector1Gram = bagOfWords.tfVector(bagOfWordsArr1Gram, d.cleanText.split(" "));
  d.idfVector1Gram = bagOfWords.idfVector(bagOfWordsArr1Gram, d.cleanText.split(" "));
  d.tfidfVector1Gram = bagOfWords.tfidfVector(bagOfWordsArr1Gram, d.cleanText.split(" "));

  d.binaryVector2Gram = bagOfWords.binaryVector(bagOfWordsArr2Gram, d.cleanText.split(" "));
  d.nOccurrencesVector2Gram = bagOfWords.numberOfOccurrencesVector(bagOfWordsArr2Gram, d.cleanText.split(" "));
  d.tfVector2Gram = bagOfWords.tfVector(bagOfWordsArr2Gram, d.cleanText.split(" "));
  d.idfVector2Gram = bagOfWords.idfVector(bagOfWordsArr2Gram, d.cleanText.split(" "));
  d.tfidfVector2Gram = bagOfWords.tfidfVector(bagOfWordsArr2Gram, d.cleanText.split(" "));

  docObj.binaryVector1GramArr.push(d.binaryVector1Gram);
  docObj.nOccurrencesVector1GramArr.push(d.nOccurrencesVector1Gram);
  docObj.tfVector1GramArr.push(d.tfVector1Gram);
  docObj.idfVector1GramArr.push(d.idfVector1Gram);
  docObj.tfidfVector1GramArr.push(d.tfidfVector1Gram);
  docObj.binaryVector2GramArr.push(d.binaryVector2Gram);
  docObj.nOccurrencesVector2GramArr.push(d.nOccurrencesVector2Gram);
  docObj.tfVector2GramArr.push(d.tfVector2Gram);
  docObj.idfVector2GramArr.push(d.idfVector2Gram);
  docObj.tfidfVector2GramArr.push(d.tfidfVector2Gram);
}

/**
 *  Creates all the required sum vectors
 **/
processFourthStage = function(docObj) {

  docObj['sumBinaryVector1GramArr'] = utils.sumVector(docObj.binaryVector1GramArr);
  docObj['sumNOccurrencesVector1GramArr'] = utils.sumVector(docObj.nOccurrencesVector1GramArr);
  docObj['sumTfVector1GramArr'] = utils.sumVector(docObj.tfVector1GramArr);
  docObj['sumIdfVector1GramArr'] = utils.sumVector(docObj.idfVector1GramArr);
  docObj['sumTfidfVector1GramArr'] = utils.sumVector(docObj.tfidfVector1GramArr);
  docObj['sumBinaryVector2GramArr'] = utils.sumVector(docObj.binaryVector2GramArr);
  docObj['sumNOccurrencesVector2GramArr'] = utils.sumVector(docObj.nOccurrencesVector2GramArr);
  docObj['sumTfVector2GramArr'] = utils.sumVector(docObj.tfVector2GramArr);
  docObj['sumIdfVector2GramArr'] = utils.sumVector(docObj.idfVector2GramArr);
  docObj['sumTfidfVector2GramArr'] = utils.sumVector(docObj.tfidfVector2GramArr);

}

processFifthStage = function(docObj) {
  docObj.termTfidfVector1GramArr = bagOfWords.mapping(docObj.bagOfWords1Gram, docObj.sumTfidfVector1GramArr);
  docObj.termTfidfVector2GramArr = bagOfWords.mapping(docObj.bagOfWords2Gram, docObj.sumTfidfVector2GramArr);
}

processSixthStage = function(docObj) {
  docObj['topTfidfVector1GramArr'] = utils.top(docObj.termTfidfVector1GramArr, 20);
  docObj['topTfidfVector2GramArr'] = utils.top(docObj.termTfidfVector2GramArr, 20);
}
