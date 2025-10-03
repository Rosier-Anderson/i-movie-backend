const express = require("express");

const app = express();

const whitelist = ["https://56t6mg-3000.csb.app", "https://vercel.com"];
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
