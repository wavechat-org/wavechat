"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasMany(models.Message, { foreignKey: "roomId" });
    }
  }
  Room.init(
    {
      roomName: DataTypes.STRING,
      roomImg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  Room.beforeCreate((room) => {
    room.roomImg =
      "https://w7.pngwing.com/pngs/562/813/png-transparent-computer-icons-discussion-group-reunion-miscellaneous-text-conversation.png";
  });
  return Room;
};
