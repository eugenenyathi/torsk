const {
  Router,
  Switch,
  Converter,
  WiFi,
} = require("../models/networking-model");
const { BadRequestError } = require("../errors/api-error");
const { StatusCodes } = require("http-status-codes");

const addNetworkDevice = async (req, res) => {
  let device;

  switch (req.params.deviceType) {
    case "router":
      device = await Router.create({ ...req.body });
      break;
    case "switch":
      device = await Switch.create({ ...req.body });
      break;
    case "converter":
      device = await Converter.create({ ...req.body });
      break;
    case "wifi":
      //check if the router id, exists
      const routerExists = await Router.findById(req.body.routerId);

      if (!routerExists)
        throw new BadRequestError("Please provide a valid router id");

      device = await WiFi.create({
        location: routerExists.location,
        ...req.body,
      });
      break;
  }

  return res.status(StatusCodes.CREATED).json({
    message: `${req.params.deviceType} added successfully.`,
    data: device,
  });
};

const getNetworkDevices = async (req, res) => {
  let devices;

  switch (req.params.deviceType) {
    case "router":
      devices = await Router.find();
      break;
    case "switch":
      devices = await Switch.find();
      break;
    case "converter":
      devices = await Converter.find();
      break;
    case "wifi":
      devices = await WiFi.find();
      break;
  }
  return res.status(StatusCodes.OK).json({ devices });
};

const getNetworkDevice = async (req, res) => {
  let device;

  switch (req.params.deviceType) {
    case "router":
      device = await Router.findById(req.body.deviceId);
      break;
    case "switch":
      device = await Switch.findById(req.body.deviceId);
      break;
    case "converter":
      device = await Converter.findById(req.body.deviceId);
      break;
    case "wifi":
      device = await WiFi.findById(req.body.deviceId);
      break;
  }

  return res.status(StatusCodes.OK).json({ data: device });
};

const updateNetworkDevice = async (req, res) => {
  let device;

  switch (req.params.deviceType) {
    case "router":
      device = await Router.findOneAndUpdate(
        { _id: req.params.deviceId },
        { ...req.body },
        { new: true }
      );
      break;
    case "switch":
      device = await Switch.findOneAndUpdate(
        { _id: req.params.deviceId },
        { ...req.body },
        { new: true }
      );
      break;
    case "converter":
      device = await Converter.findOneAndUpdate(
        { _id: req.params.deviceId },
        { ...req.body },
        { new: true }
      );
      break;
    case "wifi":
      device = await WiFi.findOneAndUpdate(
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

const deleteNetworkDevice = async (req, res) => {
  let device;

  switch (req.params.deviceType) {
    case "router":
      device = await Router.findOneAndDelete({
        _id: req.params.deviceId,
      });

      //also delete the corresponding wifi address
      deleteWiFi = await WiFi.findOneAndDelete({
        routerId: req.params.deviceId,
      });

      break;
    case "switch":
      device = await Switch.findOneAndDelete({
        _id: req.params.deviceId,
      });
      break;
    case "converter":
      device = await Converter.findOneAndDelete({
        _id: req.params.deviceId,
      });
      break;
    case "wifi":
      device = await WiFi.findOneAndDelete({
        _id: req.params.deviceId,
      });
      break;
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: `${req.params.deviceType} deleted successfully.` });
};

module.exports = {
  addNetworkDevice,
  getNetworkDevice,
  getNetworkDevices,
  updateNetworkDevice,
  deleteNetworkDevice,
};
