const {
  ServerModel,
  Machine,
  MobileDevice,
} = require("../models/devices-model");
const UpsModel = require("../models/ups-model");
const { Printer, Scanner } = require("../models/office-equip-model");
const { Router, Switch, Converter } = require("../models/networking-model");
const Telephone = require("../models/telephones-model");
const { StatusCodes } = require("http-status-codes");

const getFaultyDevices = async (req, res) => {
  switch (req.params.category) {
    case "devices":
      faultyDevices(res, req);
      break;
    case "office-equipment":
      faultyOfficeEquipment(res, req);
      break;
    case "networking":
      faultyNetworkingDevices(res, req);
      break;
    case "telephones":
      faultyTelephoneLines(res, req);
      break;
    default:
      return res.status(StatusCodes.BAD_REQUEST).send("Category not found");
  }
};

const faultyDevices = async (res, req) => {
  const servers = await ServerModel.find({ faulty: true });

  const desktops = await Machine.find({
    machineType: "desktop",
    faulty: true,
  });
  const laptops = await Machine.find({
    machineType: "laptop",
    faulty: true,
  });

  const upSuppliers = await UpsModel.find({ faulty: true });

  const tablets = await MobileDevice.find({
    deviceType: "tablet",
    faulty: true,
  });
  const cellphones = await MobileDevice.find({
    deviceType: "cellphone",
    faulty: true,
  });

  return res.status(StatusCodes.OK).json({
    data: { servers, desktops, laptops, upSuppliers, tablets, cellphones },
  });
};

const faultyOfficeEquipment = async (res, req) => {
  const printers = await Printer.find({ faulty: true });
  const scanners = await Scanner.find({ faulty: true });

  return res.status(StatusCodes.OK).json({
    data: { printers, scanners },
  });
};

const faultyNetworkingDevices = async (res, req) => {
  const routers = await Router.find({ faulty: true });
  const switches = await Switch.find({ faulty: true });
  const converters = await Converter.find({ faulty: true });

  return res.status(StatusCodes.OK).json({
    data: { routers, switches, converters },
  });
};

const faultyTelephoneLines = async (res, req) => {
  const telephones = await Telephone.find({ faulty: true });

  return res.status(StatusCodes.OK).json({
    data: { telephones },
  });
};

const getDecommissionedDevices = async (req, res) => {
  switch (req.params.category) {
    case "devices":
      decommissionedDevices(res, req);
      break;
    case "office-equipment":
      decommissionedOfficeEquipment(res, req);
      break;
    case "networking":
      decommissionedNetworkingDevices(res, req);
      break;
    case "telephones":
      decommissionedTelephoneLines(res, req);
      break;
    default:
      return res.status(StatusCodes.BAD_REQUEST).send("Category not found");
  }
};

const decommissionedDevices = async (res, req) => {
  const servers = await ServerModel.find({ decommissioned: true });

  const desktops = await Machine.find({
    machineType: "desktop",
    decommissioned: true,
  });
  const laptops = await Machine.find({
    machineType: "laptop",
    decommissioned: true,
  });

  const upSuppliers = await UpsModel.find({ decommissioned: true });

  const tablets = await MobileDevice.find({
    deviceType: "tablet",
    decommissioned: true,
  });
  const cellphones = await MobileDevice.find({
    deviceType: "cellphone",
    decommissioned: true,
  });

  return res.status(StatusCodes.OK).json({
    data: { servers, desktops, laptops, upSuppliers, tablets, cellphones },
  });
};

const decommissionedOfficeEquipment = async (res, req) => {
  const printers = await Printer.find({ decommissioned: true });
  const scanners = await Scanner.find({ decommissioned: true });

  return res.status(StatusCodes.OK).json({
    data: { printers, scanners },
  });
};

const decommissionedNetworkingDevices = async (res, req) => {
  const routers = await Router.find({ decommissioned: true });
  const switches = await Switch.find({ decommissioned: true });
  const converters = await Converter.find({ decommissioned: true });

  return res.status(StatusCodes.OK).json({
    data: { routers, switches, converters },
  });
};

const decommissionedTelephoneLines = async (res, req) => {
  const telephones = await Telephone.find({ decommissioned: true });

  return res.status(StatusCodes.OK).json({
    data: { telephones },
  });
};

module.exports = {
  getFaultyDevices,
  getDecommissionedDevices,
};
