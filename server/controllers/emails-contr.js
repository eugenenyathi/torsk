const Email = require("../models/emails-model");
const { StatusCodes } = require("http-status-codes");

const addEmail = async (req, res) => {
  const email = await Email.create({ ...req.body });

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Email added successfully", data: email });
};

const getEmails = async (req, res) => {
  const emails = await Email.find();
  return res.status(StatusCodes.OK).json({ data: emails });
};

const getEmail = async (req, res) => {
  const email = await Email.find({ email: req.params.email });
  return res.status(StatusCodes.OK).json({ data: email });
};

const updateEmail = async (req, res) => {
  const email = await Email.findOneAndUpdate(
    { _id: req.params.emailId },
    {
      ...req.body,
    },
    { new: true, runValidators: true }
  );

  return res
    .status(StatusCodes.OK)
    .json({ message: "Email updated successfully.", data: email });
};

const deleteEmail = async (req, res) => {
  const email = await Email.findOneAndDelete({
    _id: req.params.emailId,
  });

  return res
    .status(StatusCodes.OK)
    .json({ message: "Email deleted successfully." });
};

module.exports = {
  addEmail,
  getEmail,
  getEmails,
  updateEmail,
  deleteEmail,
};
