const Software = require("../models/software-model");
const { StatusCodes } = require("http-status-codes");

const addSoftware = async (req, res) => {
  const software = await Software.create({ ...req.body });

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Software added successfully", software });
};

const getSoftwares = async (req, res) => {
  const softwares = await Software.find();
  return res.status(StatusCodes.OK).json({ softwares });
};

const getSoftware = async (req, res) => {
  const software = await Software.find({ category: req.params.category });
  return res.status(StatusCodes.OK).json({ software });
};

const updateSoftware = async (req, res) => {
  const software = await Software.findOneAndUpdate(
    { _id: req.params.softwareId },
    {
      ...req.body,
    },
    { new: true, runValidators: true }
  );

  return res
    .status(StatusCodes.OK)
    .json({ message: "Software updated successfully.", software });
};

const deleteSoftware = async (req, res) => {
  const software = await Software.findOneAndDelete({
    _id: req.params.softwareId,
  });

  return res
    .status(StatusCodes.OK)
    .json({ message: "Software deleted successfully." });
};

module.exports = {
  addSoftware,
  getSoftware,
  getSoftwares,
  updateSoftware,
  deleteSoftware,
};
