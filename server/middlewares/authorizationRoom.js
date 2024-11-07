const { User, Room } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    const { userId } = req.loginInfo;
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw { name: "Forbidden" };
    }
    const room = await Room.findByPk(id);
    if (!room) {
      throw { name: "NotFound" };
    }

    if (user.id !== room.creatorId) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
