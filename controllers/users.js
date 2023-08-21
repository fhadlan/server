/**MODULE */
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

/**READ USER */
const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.status(StatusCodes.OK).json(user);
};

/**READ LIST USER FRIEND */
const getUserFriends = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const friends = await user.friends.map((id) => User.findById(id));

  //format & kirim list yg akan ditampilkan ke front end
  const formattedFriend = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    }
  );
  res.status(StatusCodes.OK).json(formattedFriend);
};

/**ADD REMOVE FRIEND */
const addRemoveFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  const cek = await User.findById(userId);
  if (!cek.friends.includes(friendId)) {
    await User.findByIdAndUpdate(userId, {
      $push: { friends: friendId },
    });
    await User.findByIdAndUpdate(friendId, {
      $push: { friends: userId },
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      $pull: { friends: { $in: friendId } },
    });
    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: { $in: userId } },
    });
  }
  const user = await User.findById(userId);
  res.status(StatusCodes.OK).json(user.friends);
};

module.exports = {
  getUser,
  getUserFriends,
  addRemoveFriend,
};
