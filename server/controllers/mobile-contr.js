const { MobileDevice } = require("../models/devices-model");
const { StatusCodes } = require("http-status-codes");

const addMobileDevice = async (req, res) => {
  const device = await MobileDevice.create({
    deviceType: req.params.deviceType,
    ...req.body,
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Device added successfully", data: device });
};

const getMobileDevices = async (req, res) => {
  const deviceType = req.params.deviceType;
  const devices = await MobileDevice.find({
    deviceType,
    faulty: false,
    decommissioned: false,
  });

  return res.status(StatusCodes.OK).json({ data: devices });
};

const getMobileDevice = async (req, res) => {
  const deviceId = req.params.deviceId;
  const device = await MobileDevice.findById(deviceId);

  return res.status(StatusCodes.OK).json({ data: device });
};

const updateMobileDevice = async (req, res) => {
  const deviceId = req.params.deviceId;

  const device = await MobileDevice.findOneAndUpdate(
    { _id: deviceId },
    {
      ...req.body,
    },
    { new: true, runValidators: true }
  );

  return res
    .status(StatusCodes.OK)
    .json({ message: "Device updated successfully.", data: device });
};

const deleteMobileDevice = async (req, res) => {
  const deviceId = req.params.deviceId;
  const device = await MobileDevice.findOneAndDelete({ _id: deviceId });

  return res
    .status(StatusCodes.OK)
    .json({ message: "Device deleted successfully." });
};

module.exports = {
  addMobileDevice,
  getMobileDevices,
  getMobileDevice,
  updateMobileDevice,
  deleteMobileDevice,
};
