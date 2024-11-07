const express = require("express");
const router = express.Router();
const roomRoute = require("./room");
const AuthController = require("../controllers/authController");
const ProfileController = require("../controllers/profileController");
const authentication = require("../middlewares/authentication");
const upload = require("../helpers/multer");
const uploadImage = upload.single("profileImg");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.use(authentication);
router.use("/room", roomRoute);
router.get("/profile", ProfileController.getUserProfile);
router.patch("/profile/upload", uploadImage, ProfileController.upload);

router.use(errorHandler);

module.exports = router;
