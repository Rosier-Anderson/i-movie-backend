const whitelist = [
  "http://localhost:3000",                 // local dev
  "https://my-frontend.vercel.app",       // your deployed frontend
  "https://i-movie-backend.onrender.com"  // backend domain itself
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
module.exports = corsOptions;
