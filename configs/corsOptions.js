const whitelist = [
  "http://localhost:3500", // local dev
  "https://my-frontend.vercel.app", // your deployed frontend
  "https://i-movie-backend.onrender.com", // optional, backend domai
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
    optionsSucessStatus: 200,
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
};
module.exports = corsOptions;
