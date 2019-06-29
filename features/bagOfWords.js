let counting = require('../preprocessing/counting');
var Term = require('../features/Term');

/**
 * Adds all the unique terms to an array, removing duplicates
 */
module.exports.addUniqueTerms = function(resultArr, testArr) {

  testArr.forEach(function(line, idx, arr) {
    if(!JSON.stringify(resultArr).includes(JSON.stringify(line))) {
      resultArr.push(line);
    }
  });

  return resultArr;
}

/**
 * Returns the binary vector of an array, given both bag of words array and terms array
 */
module.exports.binaryVector = function(bagOfWordsArr, termsArr) {
  let result = [];

  bagOfWordsArr.forEach(function(line, idx, arr) {
    var found = 0;

    termsArr.forEach(function(term, idx, arr) {
      if(JSON.stringify(line).includes(JSON.stringify(term))) {
        found = 1;
      }
    });


    result[idx] = found;
  });

  return result;
}

/**
 * Returns the number of occurences vector of an array, given both bag of words array and terms array
 */
module.exports.numberOfOccurrencesVector = function(bagOfWordsArr, termsArr) {
  let result = [];

  bagOfWordsArr.forEach(function(line, idx, arr) {
    result[idx] = counting.numberOfOccurrences(line, termsArr);
  });

  return result;
}

/**
 * Returns the TF vector of an array, given both bag of words array and terms array
 */
module.exports.tfVector = function(bagOfWordsArr, termsArr) {
  let result = [];

  bagOfWordsArr.forEach(function(line, idx, arr) {
    result[idx] = counting.termFrequency(line, termsArr);
  });

  return result;
}

/**
 * Returns the IDF vector of an array, given both bag of words array and terms array
 */
module.exports.idfVector = function(bagOfWordsArr, termsArr) {
  let result = [];

  bagOfWordsArr.forEach(function(line, idx, arr) {
    result[idx] = counting.idf(line, termsArr);
  });

  return result;
}

/**
 * Returns the TF-IDF vector of an array, given both bag of words array and terms array
 */
module.exports.tfidfVector = function(bagOfWordsArr, termsArr) {
  let result = [];

  bagOfWordsArr.forEach(function(line, idx, arr) {
    result[idx] = counting.termFrequency(line, termsArr) * counting.idf(line, termsArr);
  });

  return result;
}

/**
 * Maps the two given arrays, returning a Term array where the name is the
 * bagOfWords index value, and the value is the array vector value
 */
module.exports.mapping = function (arrayBagOfWords, arrayAdd) {
    var aResult = [];
    for(var i = 0; i<arrayBagOfWords.length; i++)
    {
        var name = arrayBagOfWords[i];
        var value = arrayAdd[i];

        var myTerm = new Term(name, value);
        aResult[i] = myTerm;
    }
    return aResult;
};
