const express = require("express");
const router = express.Router();
const messageControllre = require("../controllers/messageController");

router.get("/", messageControllre.getMessage);
router.get("/", messageControllre.sendMessage);
router.get("/::messageid", messageControllre.deleteMessage);
module.exports = router;
