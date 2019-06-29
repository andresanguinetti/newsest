var tokenization = require('./tokenization');

/**
 * Returns the number of words of a given text
 */
module.exports.words = function(text) {
  return text.split(" ").length;
}

/**
 * Returns the number of characters of a given text
 */
module.exports.characters = function(text) {
  return text.length;
}

/**
 * Returns the term frequency of a term, in a given text.
 * Splits the text, and, for every word, if it matches the term,
 * increments a counter, dividing then by the n-gram length
 */
module.exports.termFrequency = function(term, text) {

  let termStr = JSON.stringify(term);
  let nGram = tokenization.ngram(text, term.length);

  let count = 0;

  nGram.forEach(function(ngram, idx, arr) {
    if(termStr === JSON.stringify(ngram)) {
      count++;
    }
  });

  return count / nGram.length;
}

/**
 * Returns whether a given term exists in a given text
 */
module.exports.exists = function(term, text) {
  let termStr = JSON.stringify(term);
  let nGram = tokenization.ngram(text, term.length);

  let found = false;
  nGram.forEach(function(ngram, idx, arr) {
    if(termStr === JSON.stringify(ngram)) {
      found = true;
    }
  });

  return found;

}

/**
 * Returns the number of occurrences a term, in a given text.
 * Splits the text, and, for every word, if it matches the term,
 * increments a counter
 */
module.exports.numberOfOccurrences = function(term, text) {
  let termStr = JSON.stringify(term);
  let nGram = tokenization.ngram(text, term.length);

  let count = 0;
  nGram.forEach(function(ngram, idx, arr) {
    if(termStr === JSON.stringify(ngram)) {
      count++;
    }
  });
  return count;
}

/**
 * Returns the inverse document frequency of a term, in an array of texts
 */
module.exports.idf = function(term, textArr) {
  let termStr = JSON.stringify(term);

  let occurrences = 0;

  textArr.forEach(function(text, idx, arr) {
    text = text.split(" ");
    let nGram = tokenization.ngram(text, term.length);

    nGram.forEach(function(ngram, idx, arr) {
      if(termStr === JSON.stringify(ngram)) {
        occurrences++;
      }
    });
  });

  let result = Math.log(textArr.length / occurrences);
  return isFinite(result) ? result : 0;
}

/**
 * Returns the calculation between the term frequency and the inverse document
 * frequency of a document
 */
module.exports.tfidf = function(tf, idf) {
  return tf * idf;
}
