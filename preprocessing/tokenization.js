var nGram = require('n-gram');

//Removes all duplicate whitespaces, punctuation and numbers
exports.clean = function(text) {
  return text.replace(/[^\w\s]/g,"").replace(/\s+/g," ").replace(/[0-9]/g,"").replace(/\s\s+/g, ' ').trim();
}

exports.ngram = function(text, n) {
  return nGram(n)(text);
}
