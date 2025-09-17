const { logEvents } = require("./logEvents");

const errorHandler = (error, req, res, next) => {
  logEvents(`${error.name}: ${error.message}`, "errorLogs.txt");
  res.status(500).send(error.message);
};

module.exports = errorHandler;
