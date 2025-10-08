const whitelist = [
  "http://localhost:3000",                 // local dev
  "https://my-frontend.vercel.app",       // your deployed frontend
  "https://i-movie-backend.onrender.com", // backend domain itself
  "undefined"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } 
  },
};
module.exports = corsOptions;
