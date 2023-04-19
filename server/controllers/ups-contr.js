const UpsModel = require("../models/ups-model");
const { StatusCodes } = require("http-status-codes");

const addUps = async (req, res) => {
  // console.log(req.body);
  const ups = await UpsModel.create({ ...req.body });

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Ups added successfully", data: ups });
};

const getUPSuppliers = async (req, res) => {
  const upSuppliers = await UpsModel.find();
  return res.status(StatusCodes.OK).json({ data: upSuppliers });
};

const getUps = async (req, res) => {
  const ups = await UpsModel.findById(req.params.upsId);
  return res.status(StatusCodes.OK).json({ data: ups });
};

const updateUps = async (req, res) => {
  const ups = await UpsModel.findOneAndUpdate(
    { _id: req.params.upsId },
    {
      ...req.body,
    },
    { new: true, runValidators: true }
  );

  return res
    .status(StatusCodes.OK)
    .json({ message: "Ups updated successfully.", data: ups });
};

const deleteUps = async (req, res) => {
  const ups = await UpsModel.findOneAndDelete({ _id: req.params.upsId });

  return res
    .status(StatusCodes.OK)
    .json({ message: "Ups deleted successfully." });
};

module.exports = {
  addUps,
  getUps,
  getUPSuppliers,
  updateUps,
  deleteUps,
};
