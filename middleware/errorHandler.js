const erroHandler = (error, req, res, next) => {
  console.log(error);

  next();
};

module.exports = erroHandler;
