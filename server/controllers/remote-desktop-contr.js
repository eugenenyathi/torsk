const RemoteDesktop = require("../models/remote-desktop-model");
const { Machine } = require("../models/devices-model");
const { BadRequestError } = require("../errors/api-error");
const { StatusCodes } = require("http-status-codes");

const addAddress = async (req, res) => {
  const machineId = req.params.machineId;
  //find if the machine exists & get the user
  const machine = await Machine.findById(machineId).select("user");

  if (!machine) throw new BadRequestError("Please provide a valid machine id");

  const address = await RemoteDesktop.create({
    user: machine.user,
    address: req.body.address,
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Address added successfully", data: address });
};

const getAddresses = async (req, res) => {
  const addresses = await RemoteDesktop.find();
  return res.status(StatusCodes.OK).json({ addresses });
};

const getAddress = async (req, res) => {
  const address = await RemoteDesktop.find({ address: req.params.address });
  return res.status(StatusCodes.OK).json({ address });
};

const updateAddress = async (req, res) => {
  const address = await RemoteDesktop.findOneAndUpdate(
    { _id: req.params.addressId },
    {
      ...req.body,
    },
    { new: true, runValidators: true }
  );

  return res
    .status(StatusCodes.OK)
    .json({ message: "Address updated successfully.", address });
};

const deleteAddress = async (req, res) => {
  const address = await RemoteDesktop.findOneAndDelete({
    _id: req.params.addressId,
  });

  return res
    .status(StatusCodes.OK)
    .json({ message: "Address deleted successfully." });
};

module.exports = {
  addAddress,
  getAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
};
