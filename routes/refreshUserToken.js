const express = require("express");
const router = express.Router();
const refreshUserToken = require("../controllers/refreshUserTokenController");

// POST /
router.post("/", refreshUserToken.handlerefreshUserToken);

module.exports = router;
