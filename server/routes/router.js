
const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/userControllers");

router.post("/contact",controllers.userpost);


module.exports = router;