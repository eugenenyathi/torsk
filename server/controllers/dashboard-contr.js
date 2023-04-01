const { Machine, MobileDevice } = require("../models/devices-model");
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

  return res.status(StatusCodes.OK).json({
    ...devicesStats,
    ...networkingDevicesStats,
    ...officeEquipmentStats,
    ...groupedCategoriesStats,
  });
};

const totalDevices = async () => {
  const desktops = await Machine.countDocuments({ machineType: "desktop" });
  const laptops = await Machine.countDocuments({ machineType: "laptop" });

  const tablets = await MobileDevice.countDocuments({ deviceType: "tablet" });
  const cellphones = await MobileDevice.countDocuments({
    deviceType: "cellphone",
  });

  return { desktops, laptops, tablets, cellphones };
};

const totalNetworkingDevices = async () => {
  const routers = await Router.countDocuments({});
  const switches = await Switch.countDocuments({});
  const converters = await Converter.countDocuments({});
  const networks = await WiFi.countDocuments({});

  return { routers, switches, converters, networks };
};

const totalOfficeEquipment = async () => {
  const multiPurposePrinters = await Printer.countDocuments({
    multipurpose: true,
  });
  const generalPrinters = await Printer.countDocuments({ multipurpose: false });
  const scanners = await Scanner.countDocuments({});

  return { multiPurposePrinters, generalPrinters, scanners };
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

module.exports = stats;
