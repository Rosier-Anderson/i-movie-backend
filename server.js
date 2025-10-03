const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const erroHandler = require("./middleware/errorHandler");
const { default: mongoose } = require("mongoose");
const connectDB = require("./db/conncetDB");
const { verifyJWT } = require("./middleware/verifyJWT");
const corsOptions = require("./configs/corsOptions");
const PORT = process.env.PORT || 3500;
require("dotenv").config(); // .env's
connectDB(); // connect to database
app.use(cors(corsOptions));

// middlewares dependencies
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// routes
app.use(require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use(verifyJWT);
app.use("/refresh", require("./routes/refreshUserToken"));
app.use("/logout", require("./routes/logout"));
// catch-all route for handling 404 errors
app.all("/*splat", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});
app.use(erroHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);
  });
});
