const {
  Machine,
  MobileDevice,
  ServerModel,
} = require("../models/devices-model");
const { Printer, Scanner } = require("../models/office-equip-model");

const {
  Router,
  Switch,
  Converter,
  WiFi,
} = require("../models/networking-model");

const Telephone = require("../models/telephones-model");
const RemoteDesktop = require("../models/remote-desktop-model");
const Email = require("../models/emails-model");

const { StatusCodes } = require("http-status-codes");

const stats = async (req, res) => {
  const devicesStats = await totalDevices();
  const networkingDevicesStats = await totalNetworkingDevices();
  const officeEquipmentStats = await totalOfficeEquipment();
  const groupedCategoriesStats = await groupedCategories();
  const faultyStats = await faulty();
  const decommissionedStats = await decommissioned();

  return res.status(StatusCodes.OK).json({
    data: {
      ...devicesStats,
      ...networkingDevicesStats,
      ...officeEquipmentStats,
      ...groupedCategoriesStats,
      ...faultyStats,
      ...decommissionedStats,
    },
  });
};

const totalDevices = async () => {
  const servers = await ServerModel.countDocuments({
    faulty: false,
    decommissioned: false,
  });
  const desktops = await Machine.countDocuments({
    machineType: "desktop",
    faulty: false,
    decommissioned: false,
  });
  const laptops = await Machine.countDocuments({
    machineType: "laptop",
    faulty: false,
    decommissioned: false,
  });

  const tablets = await MobileDevice.countDocuments({
    deviceType: "tablet",
    faulty: false,
    decommissioned: false,
  });
  const cellphones = await MobileDevice.countDocuments({
    deviceType: "cellphone",
    faulty: false,
    decommissioned: false,
  });

  return { servers, desktops, laptops, tablets, cellphones };
};

const totalNetworkingDevices = async () => {
  const routers = await Router.countDocuments({
    faulty: false,
    decommissioned: false,
  });
  const switches = await Switch.countDocuments({
    faulty: false,
    decommissioned: false,
  });
  const converters = await Converter.countDocuments({
    faulty: false,
    decommissioned: false,
  });
  const networks = await WiFi.countDocuments({
    faulty: false,
    decommissioned: false,
  });

  return { routers, switches, converters, networks };
};

const totalOfficeEquipment = async () => {
  const multiPurposePrinters = await Printer.countDocuments({
    multipurpose: true,
    faulty: false,
    decommissioned: false,
  });
  const generalPrinters = await Printer.countDocuments({
    multipurpose: false,
    faulty: false,
    decommissioned: false,
  });
  const scanners = await Scanner.countDocuments({
    faulty: false,
    decommissioned: false,
  });

  const printers = multiPurposePrinters + generalPrinters;

  return { printers, scanners };
};

const groupedCategories = async () => {
  const emails = await Email.countDocuments({});

  const allExtensions = await Telephone.countDocuments().select("extension");
  const nullExtensions = await Telephone.countDocuments({ extension: null });
  const extensions = allExtensions - nullExtensions;

  const allDirectLines = await Telephone.countDocuments().select("directLine");
  const nullDirectLines = await Telephone.countDocuments({ directLine: null });
  const directLines = allDirectLines - nullDirectLines;

  const remoteAddresses = await RemoteDesktop.countDocuments({});

  return { emails, extensions, directLines, remoteAddresses };
};

const faulty = async (res, req) => {
  // Devices
  const faultyServers = await ServerModel.countDocuments({ faulty: true });
  const faultyMachines = await Machine.countDocuments({ faulty: true });
  const faultyMobileDevices = await MobileDevice.countDocuments({
    faulty: true,
  });

  //Office-Equipment
  const faultyPrinters = await Printer.countDocuments({ faulty: true });
  const faultyScanners = await Scanner.countDocuments({ faulty: true });

  //Networking-devices
  const faultyRouters = await Router.countDocuments({ faulty: true });
  const faultySwitches = await Switch.countDocuments({ faulty: true });
  const faultyConverters = await Converter.countDocuments({ faulty: true });

  const totalFaultyDevices =
    faultyServers +
    faultyMachines +
    faultyMobileDevices +
    faultyPrinters +
    faultyScanners +
    faultyRouters +
    faultySwitches +
    faultyConverters;

  //Telephone-devices

  return { faulty: totalFaultyDevices };
};

const decommissioned = async (res, req) => {
  // Devices
  const decommissionedServers = await ServerModel.countDocuments({
    decommissioned: true,
  });
  const decommissionedMachines = await Machine.countDocuments({ faulty: true });
  const decommissionedMobileDevices = await MobileDevice.countDocuments({
    decommissioned: true,
  });

  //Office-Equipment
  const decommissionedPrinters = await Printer.countDocuments({
    decommissioned: true,
  });
  const decommissionedScanners = await Scanner.countDocuments({
    decommissioned: true,
  });

  //Networking-devices
  const decommissionedRouters = await Router.countDocuments({
    decommissioned: true,
  });
  const decommissionedSwitches = await Switch.countDocuments({
    decommissioned: true,
  });
  const decommissionedConverters = await Converter.countDocuments({
    decommissioned: true,
  });

  const totalDecommissionedDevices =
    decommissionedServers +
    decommissionedMachines +
    decommissionedMobileDevices +
    decommissionedPrinters +
    decommissionedScanners +
    decommissionedRouters +
    decommissionedSwitches +
    decommissionedConverters;

  //Telephone-devices

  return { decommissioned: totalDecommissionedDevices };
};

module.exports = stats;
