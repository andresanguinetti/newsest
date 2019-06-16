let counting = require('../preprocessing/counting');

module.exports.addUniqueTerms = function(resultArr, testArr) {

  testArr.forEach(function(line, idx, arr) {
    if(!JSON.stringify(resultArr).includes(JSON.stringify(line))) {
      resultArr.push(line);
    }
  });

  return resultArr;
}

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


module.exports.numberOfOccurrencesVector = function(bagOfWordsArr, termsArr) {
  let result = [];

  bagOfWordsArr.forEach(function(line, idx, arr) {
    result[idx] = counting.numberOfOccurrences(line, termsArr);
  });

  return result;
}

module.exports.tfVector = function(bagOfWordsArr, termsArr) {
  let result = [];

  bagOfWordsArr.forEach(function(line, idx, arr) {
    result[idx] = counting.termFrequency(line, termsArr);
  });

  return result;
}

module.exports.idfVector = function(bagOfWordsArr, termsArr) {
  let result = [];

  bagOfWordsArr.forEach(function(line, idx, arr) {
    result[idx] = counting.idf(line, termsArr);
  });

  return result;
}

module.exports.tfidfVector = function(bagOfWordsArr, termsArr) {
  let result = [];

  bagOfWordsArr.forEach(function(line, idx, arr) {
    result[idx] = counting.termFrequency(line, termsArr) * counting.idf(line, termsArr);
  });

  return result;
}
