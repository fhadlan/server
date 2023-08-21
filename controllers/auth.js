/**MODULE */
const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

/**REGISTER */
const register = async (req, res) => {
  const saveUser = await User.create({ ...req.body });
  res.status(201).json({ saveUser });
};

/**CEK EMAIL */
const cekEmail = async (req, res) => {
  const { email } = req.body;
  const cek = await User.findOne({ email });
  res.status(StatusCodes.OK).json({ cek });
};

/**LOGIN */
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Email atau Password salah");

  const isMatch = await user.comparePassword(password);
  //if (!isMatch) throw new UnauthenticatedError("Email atau Password salah");

  const token = user.createToken();
  res.status(200).json({
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      picturePath: user.picturePath,
      friends: user.friends,
    },
    token,
  });
};

/**EXPORTS */
module.exports = {
  register,
  login,
  cekEmail,
};
