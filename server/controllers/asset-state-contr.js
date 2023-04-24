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
      faultyDevices(req, res);
      break;
    case "office_equipment":
      faultyOfficeEquipment(req, res);
      break;
    case "networking":
      faultyNetworkingDevices(req, res);
      break;
    case "telephones":
      faultyTelephoneLines(req, res);
      break;
    default:
      return res.status(StatusCodes.BAD_REQUEST).send("Category not found");
  }
};

const faultyDevices = async (req, res) => {
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

  return devicesResponse(req, res, {
    servers,
    desktops,
    laptops,
    upSuppliers,
    tablets,
    cellphones,
  });
};

const faultyOfficeEquipment = async (req, res) => {
  const printers = await Printer.find({ faulty: true });
  const scanners = await Scanner.find({ faulty: true });

  return officeEquipmentResponse(req, res, { printers, scanners });
};

const faultyNetworkingDevices = async (req, res) => {
  const routers = await Router.find({ faulty: true });
  const switches = await Switch.find({ faulty: true });
  const converters = await Converter.find({ faulty: true });

  return networkingDevicesResponse(req, res, {
    routers,
    switches,
    converters,
  });
};

const faultyTelephoneLines = async (req, res) => {
  const telephones = await Telephone.find({ faulty: true });

  return res.status(StatusCodes.OK).json({
    data: { telephones },
  });
};

/* ================= DECOMMISSIONED ======================== */

const getDecommissionedDevices = async (req, res) => {
  switch (req.params.category) {
    case "devices":
      decommissionedDevices(req, res);
      break;
    case "office-equipment":
      decommissionedOfficeEquipment(req, res);
      break;
    case "networking":
      decommissionedNetworkingDevices(req, res);
      break;
    case "telephones":
      decommissionedTelephoneLines(req, res);
      break;
    default:
      return res.status(StatusCodes.BAD_REQUEST).send("Category not found");
  }
};

const decommissionedDevices = async (req, res) => {
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

  return devicesResponse(req, res, {
    servers,
    desktops,
    laptops,
    upSuppliers,
    tablets,
    cellphones,
  });
};

const decommissionedOfficeEquipment = async (req, res) => {
  const printers = await Printer.find({ decommissioned: true });
  const scanners = await Scanner.find({ decommissioned: true });

  return officeEquipmentResponse(req, res, {
    printers,
    scanners,
  });
};

const decommissionedNetworkingDevices = async (req, res) => {
  const routers = await Router.find({ decommissioned: true });
  const switches = await Switch.find({ decommissioned: true });
  const converters = await Converter.find({ decommissioned: true });

  return networkingDevicesResponse(req, res, {
    routers,
    switches,
    converters,
  });
};

const decommissionedTelephoneLines = async (req, res) => {
  const telephones = await Telephone.find({ decommissioned: true });

  return res.status(StatusCodes.OK).json({
    data: { telephones },
  });
};

/* ======================= RESPONSES ================  */
const devicesResponse = async (req, res, data) => {
  switch (req.params.device) {
    case "desktops":
      return res.status(StatusCodes.OK).json({
        data: data.desktops,
      });
    case "laptops":
      return res.status(StatusCodes.OK).json({
        data: data.laptops,
      });
    case "ups":
      return res.status(StatusCodes.OK).json({
        data: data.upSuppliers,
      });
    case "tablets":
      return res.status(StatusCodes.OK).json({
        data: data.tablets,
      });
    case "cellphones":
      return res.status(StatusCodes.OK).json({
        data: data.cellphones,
      });
    case "servers":
      return res.status(StatusCodes.OK).json({
        data: data.servers,
      });
  }

  let countServers = data.servers.length;
  let countDesktops = data.desktops.length;
  let countLaptops = data.laptops.length;
  let countUPS = data.upSuppliers.length;
  let countTablets = data.tablets.length;
  let countCellphones = data.cellphones.length;

  return res.status(StatusCodes.OK).json({
    data: {
      servers: countServers,
      desktops: countDesktops,
      laptops: countLaptops,
      upSuppliers: countUPS,
      tablets: countTablets,
      cellphones: countCellphones,
    },
  });
};

const officeEquipmentResponse = async (req, res, data) => {
  switch (req.params.device) {
    case "printers":
      return res.status(StatusCodes.OK).json({
        data: data.printers,
      });
    case "scanners":
      return res.status(StatusCodes.OK).json({
        data: data.scanners,
      });
  }

  let countPrinters = data.printers.length;
  let countScanners = data.scanners.length;

  return res.status(StatusCodes.OK).json({
    data: { printers: countPrinters, scanners: countScanners },
  });
};

const networkingDevicesResponse = async (req, res, data) => {
  switch (req.params.device) {
    case "routers":
      return res.status(StatusCodes.OK).json({
        data: data.routers,
      });
    case "switches":
      return res.status(StatusCodes.OK).json({
        data: data.switches,
      });
    case "converters":
      return res.status(StatusCodes.OK).json({
        data: data.converters,
      });
  }

  let countRouters = data.routers.length;
  let countSwitches = data.switches.length;
  let countConverters = data.converters.length;

  return res.status(StatusCodes.OK).json({
    data: {
      routers: countRouters,
      switches: countSwitches,
      converters: countConverters,
    },
  });
};

module.exports = {
  getFaultyDevices,
  getDecommissionedDevices,
};
