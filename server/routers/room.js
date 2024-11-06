const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const authorization = require("../middlewares/authorization");

router.post("/", roomController.create);
router.patch("/:roomId", authorization,roomController.delete);

module.exports = router;