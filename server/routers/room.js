const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/roomController");
const MessageControllre = require("../controllers/messageController");
// const authorization = require("../middlewares/authorizationRoom");

router.get("/", RoomController.readAllRoom);
router.post("/", RoomController.create);
router.get("/:id", RoomController.readRoomById);
// router.post("/join/:roomId", )
router.get("/message/:roomId", MessageControllre.getMessage);
router.post("/message/:roomId", MessageControllre.sendMessage);

module.exports = router;
