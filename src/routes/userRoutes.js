const express = require("express");
const router = express.Router();
const { authUser, registerUser } = require("../controllers/userController");

router.route("/login").post(authUser);
router.route("/").post(registerUser);
module.exports = router;
