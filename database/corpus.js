var connectionOptions = require('./config').getConnectionOptions();
var mysql = require('mysql');

exports.getCorpus = function(limit, category, result) {
  var connection = mysql.createConnection(connectionOptions);

  connection.connect();

  connection.query("SELECT * from corpus WHERE category = ? LIMIT ?",[category,parseInt(limit)], function (err, rows, fields) {
    if (err) {
      result(err);
    } else {
      result(rows);
    }
  });

  connection.end();
}

exports.getCorpusById = function(id, result) {
  var connection = mysql.createConnection(connectionOptions);

  connection.connect();

  connection.query("SELECT * from corpus WHERE id = ? LIMIT 1",[id], function (err, rows, fields) {
    if (err) {
      result(err);
    } else {
      result(rows);
    }
  });

  connection.end();
}
