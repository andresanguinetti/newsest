var nGram = require('n-gram');

/**
 * Removes all duplicate whitespaces, punctuation, numbers, and leading and trailing whitespaces
 */
exports.clean = function(text) {
  return text.replace(/[^\w\s]/g,"").replace(/\s+/g," ").replace(/[0-9]/g,"").replace(/\s\s+/g, ' ').trim();
}

/**
 * Returns the n-gram of a given text
 */
exports.ngram = function(text, n) {
  return nGram(n)(text);
}
