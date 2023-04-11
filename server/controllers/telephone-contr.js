const Telephone = require("../models/telephones-model");
const { StatusCodes } = require("http-status-codes");

const addLine = async (req, res) => {
  const device = await Telephone.create({ ...req.body });

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Line added successfully", data: device });
};

const getLines = async (req, res) => {
  const devices = await Telephone.find();

  return res.status(StatusCodes.OK).json({ data: devices });
};

const getLine = async (req, res) => {
  const lineId = req.params.lineId;
  const device = await Telephone.findById(lineId);

  return res.status(StatusCodes.OK).json({ data: device });
};

const updateLine = async (req, res) => {
  const lineId = req.params.lineId;

  const device = await Telephone.findOneAndUpdate(
    { _id: lineId },
    {
      ...req.body,
    }
  );

  return res
    .status(StatusCodes.OK)
    .json({ message: "Line updated successfully.", data: device });
};

const deleteLine = async (req, res) => {
  const lineId = req.params.lineId;
  const device = await Telephone.findOneAndDelete({ _id: lineId });

  return res
    .status(StatusCodes.OK)
    .json({ message: "Line deleted successfully." });
};

module.exports = {
  addLine,
  getLines,
  getLine,
  updateLine,
  deleteLine,
};
