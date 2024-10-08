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
    case "routers":
      device = await Router.create({ ...req.body });
      break;
    case "switches":
      device = await Switch.create({ ...req.body });
      break;
    case "converters":
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
    case "routers":
      devices = await Router.find({ faulty: false, decommissioned: false });
      break;
    case "switches":
      devices = await Switch.find({ faulty: false, decommissioned: false });
      break;
    case "converters":
      devices = await Converter.find({ faulty: false, decommissioned: false });
      break;
    case "wifi":
      devices = await WiFi.find({ faulty: false, decommissioned: false });
      break;
  }
  return res.status(StatusCodes.OK).json({ data: devices });
};

const getNetworkDevice = async (req, res) => {
  let device;

  switch (req.params.deviceType) {
    case "routers":
      device = await Router.findById(req.body.deviceId);
      break;
    case "switches":
      device = await Switch.findById(req.body.deviceId);
      break;
    case "converters":
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
  console.log(req.body);

  switch (req.params.deviceType) {
    case "routers":
      device = await Router.findOneAndUpdate(
        { _id: req.params.deviceId },
        { ...req.body },
        { new: true }
      );
      break;
    case "switches":
      device = await Switch.findOneAndUpdate(
        { _id: req.params.deviceId },
        { ...req.body },
        { new: true }
      );
      break;
    case "converters":
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
    case "routers":
      device = await Router.findOneAndDelete({
        _id: req.params.deviceId,
      });

      //also delete the corresponding wifi address
      deleteWiFi = await WiFi.findOneAndDelete({
        routerId: req.params.deviceId,
      });

      break;
    case "switches":
      device = await Switch.findOneAndDelete({
        _id: req.params.deviceId,
      });
      break;
    case "converters":
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
