const express = require("express");
const app = express();
const path = require("path");
const erroHandler = require("./middleware/errorHandler");
const { default: mongoose } = require("mongoose");
const connectDB = require("./configs/conncetDB");
const PORT = process.env.PORT || 3500;
require("dotenv").config(); // .env's
connectDB(); // connect to database
// middlewares dependencies
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// routes
app.use(require("./routes/root"));
app.use("/register", require("./routes/register"));
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
