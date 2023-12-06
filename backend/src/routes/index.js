const express = require("express");
const router = express.Router();
const authRoute = require("./auth.route");
const doubtRoute = require("./doubt.route")

router.use("/auth", authRoute)
router.use("/doubt", doubtRoute)

module.exports = router;