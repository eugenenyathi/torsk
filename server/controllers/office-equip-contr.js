const { Printer, Scanner } = require("../models/office-equip-model");
const { Machine } = require("../models/devices-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/api-error");

const addOfficeDevice = async (req, res) => {
  let device;

  //check if the machine id, exists
  const machine = await Machine.findById(req.params.machineId);

  if (!machine) throw new BadRequestError("Please provide a valid machine id");

  switch (req.params.deviceType) {
    case "printers":
      device = await Printer.create({ user: machine.user, ...req.body });
      break;
    case "scanners":
      device = await Scanner.create({ user: machine.user, ...req.body });
      break;
  }

  return res.status(StatusCodes.CREATED).json({
    message: `${req.params.deviceType} added successfully.`,
    data: device,
  });
};

const getOfficeDevices = async (req, res) => {
  let devices;

  switch (req.params.deviceType) {
    case "printers":
      devices = await Printer.find({ faulty: false, decommissioned: false });
      break;
    case "scanners":
      devices = await Scanner.find({ faulty: false, decommissioned: false });
      break;
  }
  return res.status(StatusCodes.OK).json({ data: devices });
};

const getOfficeDevice = async (req, res) => {
  let device;

  switch (req.params.deviceType) {
    case "printers":
      device = await Printer.findById(req.body.deviceId);
      break;
    case "scanners":
      device = await Scanner.findById(req.body.deviceId);
      break;
  }

  return res.status(StatusCodes.OK).json({ data: device });
};

const updateOfficeDevice = async (req, res) => {
  let device;

  if (req.body.machineId) {
    //check if the machine id, exists
    const machine = await Machine.findById(req.body.machineId);

    if (!machine)
      throw new BadRequestError("Please provide a valid machine id");
    else {
      req.body.user = machine.user;
    }
  }

  switch (req.params.deviceType) {
    case "printers":
      device = await Printer.findOneAndUpdate(
        { _id: req.params.deviceId },
        { ...req.body },
        { new: true }
      );
      break;
    case "scanners":
      device = await Scanner.findOneAndUpdate(
        { _id: req.params.deviceId },
        { ...req.body },
        { new: true }
      );

      break;
  }

  return res.status(StatusCodes.OK).json({
    message: `${req.params.deviceType} updated successfully.`,
    data: device,
  });
};

const deleteOfficeDevice = async (req, res) => {
  let device;

  switch (req.params.deviceType) {
    case "printers":
      device = await Printer.findOneAndDelete({
        _id: req.params.deviceId,
      });
    case "scanners":
      device = await Scanner.findOneAndDelete({
        _id: req.params.deviceId,
      });
      break;
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: `${req.params.deviceType} deleted successfully.` });
};

module.exports = {
  addOfficeDevice,
  getOfficeDevice,
  getOfficeDevices,
  updateOfficeDevice,
  deleteOfficeDevice,
};
