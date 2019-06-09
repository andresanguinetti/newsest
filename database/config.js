var connectionOptions = {
  host: "localhost",
  user: "newsest",
  password: "newsest",
  database: "newsest"
};

module.exports = {
  getConnectionOptions: function () {
    return connectionOptions;
  }
};
