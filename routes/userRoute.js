const express = require("express")

const router = express.Router();

const registerUser = require("../controllers/userController");
const authUser = require("../controllers/userController");

router.post("/register",registerUser.registerUser);
router.post("/login", authUser.authUser);

module.exports = router;



