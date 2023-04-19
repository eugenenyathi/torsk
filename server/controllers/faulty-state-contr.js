const {
  FaultyDevices,
  FaultyOfficeEquipment,
  FaultyNetworkingDevices,
  FaultyTelephones,
} = require("../models/faulty-state-model");
const { ServerModel, Machine } = require("../models/devices-model");
const { Printer, Scanner } = require("../models/office-equip-model");
const { Router, Switch, Converter } = require("../models/networking-model");
const Telephone = require("../models/telephones-model");
const { BadRequestError } = require("../errors/api-error");
const { StatusCodes } = require("http-status-codes");

const addFaultyDevice = async (req, res) => {
  let response;
  let deviceExists;

  switch (req.params.category) {
    case "devices":
      if (
        req.params.deviceType === "desktop" ||
        req.params.deviceType === "laptop"
      ) {
        deviceExists = await Machine.findById(req.params.recordId);
        if (!deviceExists)
          throw new BadRequestError("Please provide a valid machine id");
      } else if (req.params.deviceType === "server") {
        deviceExists = await ServerModel.findById(req.params.recordId);
        if (!deviceExists)
          throw new BadRequestError("Please provide a valid recordId id");
      }

      response = await FaultyDevices.create({
        device: deviceExists.machineType,
        machine: deviceExists.machine,
        recordId: req.params.recordId,
      });
      break;
    case "office-equipment":
      if (req.params.deviceType === "printer") {
        deviceExists = await Printer.findById(req.params.recordId).select(
          "user"
        );
        if (!deviceExists)
          throw new BadRequestError("Please provide a valid recordId id");
      } else if (req.params.deviceType === "scanner") {
        deviceExists = await Scanner.findById(req.params.recordId).select(
          "user"
        );
        if (!deviceExists)
          throw new BadRequestError("Please provide a valid recordId id");
      }

      response = await FaultyOfficeEquipment.create({
        device: req.params.deviceType,
        user: deviceExists.user,
        recordId: req.params.recordId,
      });
      break;
    case "networking":
      if (req.params.deviceType === "router") {
        deviceExists = await Router.findById(req.params.recordId).select(
          "location"
        );
        if (!deviceExists)
          throw new BadRequestError("Please provide a valid recordId id");
      } else if (req.params.deviceType === "switch") {
        deviceExists = await Switch.findById(req.params.recordId).select(
          "location"
        );
        if (!deviceExists)
          throw new BadRequestError("Please provide a valid recordId id");
      } else if (req.params.deviceType === "converter") {
        deviceExists = await Converter.findById(req.params.recordId).select(
          "location"
        );
        if (!deviceExists)
          throw new BadRequestError("Please provide a valid recordId id");
      }

      response = await FaultyNetworkingDevices.create({
        device: req.params.deviceType,
        location: deviceExists.location,
        recordId: req.params.recordId,
      });
      break;
    case "telephones":
      deviceExists = await Telephone.findById(req.params.recordId).select(
        "user"
      );
      if (!deviceExists)
        throw new BadRequestError("Please provide a valid recordId id");

      response = await FaultyTelephones.create({
        device: req.params.deviceType,
        user: deviceExists.user,
        recordId: req.params.recordId,
      });
      break;
  }
  return res
    .status(StatusCodes.CREATED)
    .json({ message: "FaultyDevice added successfully", data: response });
};

const getFaultyDevices = async (req, res) => {
  let response;

  switch (req.params.category) {
    case "devices":
      response = await FaultyDevices.find();

      const servers = response.filter((element) => element.device === "server");
      const desktops = response.filter(
        (element) => element.device === "desktop"
      );

      const laptops = response.filter((element) => element.device === "laptop");
      const upSuppliers = response.filter(
        (element) => element.device === "ups"
      );
      const tablets = response.filter((element) => element.device === "tablet");
      const cellphones = response.filter(
        (element) => element.device === "cellphone"
      );

      return res.status(StatusCodes.OK).json({
        data: { servers, desktops, laptops, upSuppliers, tablets, cellphones },
      });
  }
};

const getFaultyDevice = async (req, res) => {
  const FaultyDeviceId = req.params.FaultyDeviceId;
  const FaultyDevice = await FaultyDevice.findById(FaultyDeviceId);

  return res.status(StatusCodes.OK).json({ data: FaultyDevice });
};

const updateFaultyDevice = async (req, res) => {
  const FaultyDeviceId = req.params.FaultyDeviceId;

  const FaultyDevice = await FaultyDevice.findOneAndUpdate(
    { _id: FaultyDeviceId },
    {
      ...req.body,
    },
    { new: true, runValidators: true }
  );

  return res.status(StatusCodes.OK).json({
    message: "FaultyDevice updated successfully.",
    data: FaultyDevice,
  });
};

module.exports = {
  addFaultyDevice,
  getFaultyDevice,
  getFaultyDevices,
  updateFaultyDevice,
};
