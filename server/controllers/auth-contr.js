const User = require("../models/auth-model");
const {
  BadRequestError,
  UnauthenticatedError,
} = require("../errors/api-error");
const { StatusCodes } = require("http-status-codes");

const checkUser = async (req, res) => {
  /* Check if a user exists already, 
  otherwise if there is a user block this creation
  */
  const userExists = await User.countDocuments();

  if (userExists) return res.status(StatusCodes.OK).json(true);
  else return res.status(StatusCodes.OK).json(false);
};

const createUser = async (req, res) => {
  const { fullName, username, password } = req.body;

  if ((!fullName, !username || !password)) {
    throw new BadRequestError("Please provide a username and password");
  }

  /* Check if a user exists already, 
  otherwise if there is a user block this creation
  */

  const dbHasAUser = await User.countDocuments();

  if (dbHasAUser)
    throw new UnauthenticatedError(
      "Insufficient permissions to create an account."
    );

  const user = await User.create({ fullName, username, password });

  const token = user.createJWT();

  return res
    .status(StatusCodes.CREATED)
    .json({ username, name: fullName, token });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide a username and password");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials --user not found");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials ---incorrect password");
  }

  const token = user.createJWT();

  return res
    .status(StatusCodes.OK)
    .json({ username, name: user.fullName, token });
};

const validateIdentity = async (req, res) => {
  const username = req.params.username;
  const { password: currentPassword } = req.body;

  if (!currentPassword) {
    throw new BadRequestError("Please provide your password");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials --user not found");
  }

  const isPasswordCorrect = user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid password");
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "Password verified successfully" });
};

const updatePassword = async (req, res) => {
  const username = req.params.username;
  const { newPassword } = req.body;

  const user = await User.findOneAndUpdate(
    { username },
    { password: newPassword },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials --user not found");
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "Password updated successfully" });
};

module.exports = {
  checkUser,
  createUser,
  login,
  validateIdentity,
  updatePassword,
};
