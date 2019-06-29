var sw = require('stopword');

/**
 * Removes all the stop words of a given text, in english for this case
 */
exports.removeStopwords = function(text) {
  const stringArr = text.split(' ');

  return sw.removeStopwords(stringArr);
}
