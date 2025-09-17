const { logEvents } = require("./logEvents");

const errorHandler = (error, req, res, next) => {
  logEvents();
  res.status(500).send(error.message);
};

module.exports = errorHandler;
