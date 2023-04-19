const { ServerModel, Machine } = require("../models/devices-model");
const RemoteDesktop = require("../models/remote-desktop-model");
const { StatusCodes } = require("http-status-codes");

const addMachine = async (req, res) => {
  const machine = await Machine.create({
    machineType: req.params.machineType,
    ...req.body,
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Machine added successfully", data: machine });
};

const getAllMachines = async (req, res) => {
  const machineType = req.params.machineType;
  const machines = await Machine.find({ faulty: false, decommissioned: false });

  return res.status(StatusCodes.OK).json({ data: machines });
};

const getMachines = async (req, res) => {
  const machineType = req.params.machineType;
  const machines = await Machine.find({
    machineType,
    faulty: false,
    decommissioned: false,
  });

  return res.status(StatusCodes.OK).json({ data: machines });
};

const getMachine = async (req, res) => {
  const machineId = req.params.machineId;
  const machine = await Machine.findById(machineId);

  return res.status(StatusCodes.OK).json({ data: machine });
};

const updateMachine = async (req, res) => {
  const machineId = req.params.machineId;

  // console.log(machineId);

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
  getAllMachines,
  getMachines,
  updateMachine,
  deleteMachine,
};
