const User = require("../models/User");

const updateAvatar = async (req, res) => {
  try {

    const userId = req.user.id;
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({
        message: "Avatr URL is required"
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );

    res.json({
      message: "Avatar updated successfully",
      avatar: user.avatar
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update avatar"
    });
  }
};

module.exports = {
  updateAvatar
};