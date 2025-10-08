const express = require("express");
const router = express.Router();
const path = require("path");
 const register = require("../controllers/registerController");
const { verifyJWT } = require("../middleware/verifyJWT.middleware");

router.get(/^\/$|^\/index(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});



module.exports = router;
