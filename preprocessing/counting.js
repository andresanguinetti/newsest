var tokenization = require('./tokenization');

module.exports.words = function(text) {
  return text.split(" ").length;
}

module.exports.characters = function(text) {
  return text.length;
}

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

module.exports.tfidf = function(tf, idf) {
  return tf * idf;
}
