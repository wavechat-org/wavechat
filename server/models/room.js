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
      Room.belongsTo(models.User, { foreignKey: "creatorId" });
      Room.belongsTo(models.User, { foreignKey: "participantId" });
    }
  }
  Room.init(
    {
      roomName: DataTypes.STRING,
      roomImg: DataTypes.STRING,
      creatorId: DataTypes.INTEGER,
      participantId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  Room.beforeCreate((room) => {
    room.roomImg =
      "https://o-cdn-cas.oramiland.com/parenting/images/image_7_HYvLsGH.width-800.format-webp.webp";
  });
  return Room;
};
