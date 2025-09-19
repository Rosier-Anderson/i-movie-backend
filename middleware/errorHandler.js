const { logEvents } = require("./logEvents");

const errorHandler = (error, req, res, next) => {
  res.sendStatus(500);
  logEvents(`${error.name}: ${error.message}`, "errorLogs.txt");
  res.send(error.message);
};

module.exports = errorHandler;
