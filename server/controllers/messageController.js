const { Message } = require("../models/index");

class MessageController {
  static async sendMessage(req, res, next) {
    try {
      const { roomId } = req.params;
      const { userId } = req.loginInfo;
      const { content } = req.body;

      if (!content) {
        throw { name: "BadRequest", message: "Message content is required" };
      }

      const newMessage = await Message.create({
        roomId,
        senderId: userId,
        content,
      });

      res.status(201).json({
        message: "Message sent successfully",
        message: newMessage,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // Get all messages for a room
  static async getMessage(req, res, next) {
    try {
      const { roomId } = req.params; // Get roomId from URL parameters

      // Fetch all messages for the specified room
      const messages = await Message.findAll({
        where: {
          roomId, // Filter messages by roomId
        },
        order: [["createdAt", "ASC"]], // Order messages by creation time in ascending order
      });

      // If no messages are found, return an empty array
      if (messages.length === 0) {
        return res.status(200).json({ message: "No messages yet" });
      }

      res.status(200).json(messages); // Return the list of messages
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MessageController;
