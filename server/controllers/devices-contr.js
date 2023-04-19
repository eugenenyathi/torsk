const { Machine, Mobile } = require("../models/devices-model");
const RemoteDesktop = require("../models/remote-desktop-model");
const { StatusCodes } = require("http-status-codes");

const addMachine = async (req, res) => {
  let asset;

  switch (req.params.assetType) {
    case "machine":
      asset = await Machine.create({ ...req.body });
      break;
    case "mobile":
      asset = await MobileDevice.create({ ...req.body });
      break;
  }

  return res.status(StatusCodes.CREATED).json({
    message: `${req.body.deviceType} added successfully`,
    data: asset,
  });
};

const getMachines = async (req, res) => {
  let asset;

  switch (req.params.assetType) {
    case "machine":
      asset = await Machine.find({ faulty: false, decommissioned: false });
      break;
    case "mobile":
      asset = await MobileDevice.find({ faulty: false, decommissioned: false });
      break;
  }

  return res.status(StatusCodes.OK).json({ data: asset });
};

const getMachine = async (req, res) => {
  const machineId = req.params.machineId;
  const machine = await Machine.findById(machineId);

  return res.status(StatusCodes.OK).json({ data: machine });
};

const updateMachine = async (req, res) => {
  const machineId = req.params.machineId;

  console.log(machineId);

  const machine = await Machine.findOneAndUpdate(
    { _id: machineId },
    {
      ...req.body,
    },
    { new: true, runValidators: true }
  );

  return res
    .status(StatusCodes.OK)
    .json({ message: "Machine updated successfully.", data: machine });
};

const deleteMachine = async (req, res) => {
  const machineId = req.params.machineId;
  const machine = await Machine.findOneAndDelete({ _id: machineId });
  //also delete the corresponding remote address
  const remoteAddress = await RemoteDesktop.findOneAndDelete({ machineId });

  return res
    .status(StatusCodes.OK)
    .json({ message: "Machine deleted successfully." });
};

module.exports = {
  addMachine,
  getMachine,
  getMachines,
  updateMachine,
  deleteMachine,
};
