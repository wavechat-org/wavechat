const { User } = require("../models/index");
const cloudinary = require("../helpers/cloudinary");

class profileController {
  static async getUserProfile(req, res, next) {
    try {
      const { userId } = req.loginInfo;

      console.log(req.loginInfo, "ini req nya");
      const user = await User.findByPk(userId, {
        attributes: ["username", "profileImg"],
      });

      //   console.log(user, "ini usernya");

      // Check if the user exists
      if (!user) {
        throw { name: "NotFound" };
      }

      res.status(200).json({
        message: "User profile retrieved successfully",
        username: user.username,
        profileImg: user.profileImg,
      });
    } catch (error) {
      console.error("Error retrieving user profile:", error);
      next(error);
    }
  }

  static async upload(req, res, next) {
    try {
      const { userId } = req.loginInfo;

      let user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const imageInBase64 = req.file.buffer.toString("base64");
      const data64 = `data:${req.file.mimetype};base64,${imageInBase64}`;

      const upload = await cloudinary.uploader.upload(data64, {
        public_id: `user_${userId}__profile`,
        tags: ["profile"],
      });

      await user.update({ profileImg: upload.secure_url });

      res.status(201).json({
        message: "Success updating profile picture",
        profileImg: upload.secure_url,
      });
    } catch (error) {
      console.error("Error updating profile picture:", error);
      next(error);
    }
  }
}

module.exports = profileController;
