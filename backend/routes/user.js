const express = require("express");
const addUser = require("../controllers/user");

const router = express.Router();

router.route("/addUser").post(addUser)

module.exports =  router;