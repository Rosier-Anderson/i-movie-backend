const whitelist = [
  "https://56t6mg-3000.csb.app",
  "https://vercel.com",
  "https://render.com",
  "https://dashboard.render.com",
  "https://i-movie-backend.onrender.com/",
  "http://localhost:3000/login",
  "162.120.186.89",
  "https://www.google.com/",
  "http://localhost:3000",                // local dev
  "https://my-frontend.vercel.app",      // your deployed frontend
  "https://i-movie-backend.onrender.com" // optional, backend domain
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
