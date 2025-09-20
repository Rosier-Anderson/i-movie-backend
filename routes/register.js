const express = require("express").express();
const route = express();
const registerController = require("../controllers/registerController");

route.post("/", registerController.handleNewUser);

module.exports = router;
