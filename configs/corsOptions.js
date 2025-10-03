const express = require("express");
const cors = require("cors");
const app = express();

const whitelist = [
  "https://56t6mg-3000.csb.app/login",
  "https://vercel.com",
  "https://56t6mg-3000.csb.app/",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

module.exports = corsOptions;
