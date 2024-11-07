const { Message, User, Room } = require("../models/index");

class MessageController {
  static async sendMessage(req, res, next) {
    try {
      const { roomId } = req.params;
      const { userId } = req.loginInfo;
      const { content } = req.body;

      const newMessage = await Message.create({
        roomId,
        userId,
        content,
      });

      res.status(201).json(newMessage);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // Get all messages for a room
  static async getMessage(req, res, next) {
    try {
      const { roomId } = req.params;
      const messages = await Message.findAll({
        include: [
          {
            model: User,
            attributes: ["username"], // Menampilkan hanya username dan email
          },
          {
            model: Room,
            attributes: ["roomName"], // Menampilkan nama room
          },
        ],
        where: {
          roomId,
        },
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MessageController;
