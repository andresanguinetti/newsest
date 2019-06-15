var tokenization = require('./tokenization');

exports.words = function(text) {
  return text.split(" ").length;
}

exports.characters = function(text) {
  return text.length;
}

exports.termFrequency = function(term, text) {

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
