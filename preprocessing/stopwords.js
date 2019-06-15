var sw = require('stopword');

exports.removeStopwords = function(text) {
  const stringArr = text.split(' ');

  return sw.removeStopwords(stringArr);
}
