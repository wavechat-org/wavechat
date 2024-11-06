const { Room } = require("../models/index");

class RoomController {
  // Create Room
  static async create(req, res, next) {
    try {
      const { roomName, participantId } = req.body; // roomName and participantId are sent in the request body
      const { userId } = req.loginInfo; // userId from the logged-in user

      // Check if a room already exists with the creator and participant
      const existingRoom = await Room.findOne({
        where: {
          creatorId: userId,
          participantId: participantId,
        },
      });

      if (existingRoom) {
        throw { name: "Room already exists for these two users" };
      }

      // Check if the room already has two participants
      const roomCount = await Room.count({
        where: {
          creatorId: userId,
        },
      });

      if (roomCount >= 2) {
        throw { name: "Room limit reached for this user" };
      }

      // Create a new room with the logged-in user as the creator
      const newRoom = await Room.create({
        roomName,
        creatorId: userId, // Logged-in user as the creator
        participantId,
      });

      res.status(201).json({
        message: "Room created successfully",
        room: newRoom,
      });
    } catch (error) {
      next(error);
    }
  }

  // Read All Rooms
  static async readAllRoom(req, res, next) {
    try {
      const rooms = await Room.findAll();
      res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  }

  // Delete Room
  static async delete(req, res, next) {
    try {
      const { id } = req.params; // Room ID from URL parameter
      const { userId } = req.loginInfo; // userId from the logged-in user
      console.log(userId, "user id inii");
      // Find room by ID
      const room = await Room.findByPk(id);
      if (!room) {
        throw { name: "NotFound" };
      }

      // Ensure only the creator can delete the room
      if (room.creatorId !== userId) {
        throw { name: "Forbidden" };
      }

      await room.destroy({
        where: {
          id,
        },
      }); // Delete room
      res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoomController;
