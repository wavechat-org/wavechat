const express = require("express");
const router = express.Router();
const messageRoute = require("./message");
const roomRoute = require("./room");
const AuthController = require("../controllers/authController");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.use(authentication);

router.use("/room", roomRoute);
router.use("/message", messageRoute);
router.use(errorHandler);

module.exports = router;
