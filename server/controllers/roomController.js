const { Room } = require("../models/index");

class RoomController {
  static async create(req, res, next) {
    try {
      const { roomName } = req.body;
      const newRoom = await Room.create({
        roomName,
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

  static async readRoomById(req, res, next) {
    try {
      const { id } = req.params;
      const rooms = await Room.findByPk(id);
      res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoomController;
