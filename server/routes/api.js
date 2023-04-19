const express = require("express");
const router = express.Router();

const {
  updatePassword,
  validateIdentity,
} = require("../controllers/auth-contr");

const stats = require("../controllers/dashboard-contr");

/* ==== Devices-controllers ==== */
const {
  addServer,
  getServer,
  getServers,
  updateServer,
  deleteServer,
} = require("../controllers/server-contr");

const {
  addMachine,
  getMachine,
  getAllMachines,
  getMachines,
  updateMachine,
  deleteMachine,
} = require("../controllers/machine-contr");

const {
  addUps,
  getUps,
  getUPSuppliers,
  updateUps,
  deleteUps,
} = require("../controllers/ups-contr");

const {
  addMobileDevice,
  getMobileDevices,
  getMobileDevice,
  updateMobileDevice,
  deleteMobileDevice,
} = require("../controllers/mobile-contr");

const {
  addOfficeDevice,
  getOfficeDevice,
  getOfficeDevices,
  updateOfficeDevice,
  deleteOfficeDevice,
} = require("../controllers/office-equip-contr");

const {
  addNetworkDevice,
  getNetworkDevice,
  getNetworkDevices,
  updateNetworkDevice,
  deleteNetworkDevice,
} = require("../controllers/networking-contr");

const {
  addLine,
  getLines,
  getLine,
  updateLine,
  deleteLine,
} = require("../controllers/telephone-contr");

const {
  addAddress,
  getAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require("../controllers/remote-desktop-contr");

const {
  addEmail,
  getEmail,
  getEmails,
  updateEmail,
  deleteEmail,
} = require("../controllers/emails-contr");

const {
  addSoftware,
  getSoftware,
  getSoftwares,
  updateSoftware,
  deleteSoftware,
} = require("../controllers/software-contr");

const {
  addConfig,
  getConfig,
  updateConfig,
} = require("../controllers/config-contr");

const {
  getFaultyDevices,
  getDecommissionedDevices,
} = require("../controllers/asset-state-contr");

//TODO  Dashboard
//TODO  Faulty & Decommission
//TODO default case switch

//User routes
router.route("/validate/:username").post(validateIdentity);
router.route("/settings/:username").patch(updatePassword);

/* ======= DASHBOARD ROUTES ===== */
router.route("/dashboard").get(stats);

/* ======= DEVICES ROUTES ===== */

router.route("/devices/server/").post(addServer);
router.route("/devices/server/:serverId").get(getServer);
router.route("/devices/server/").get(getServers);
router.route("/devices/server/:serverId").put(updateServer);
router.route("/devices/server/:serverId").delete(deleteServer);

router.route("/devices/machine/:machineType").post(addMachine);
router.route("/devices/machine/:machineId").get(getMachine);
router.route("/devices/machines/").get(getAllMachines);
router.route("/devices/machines/:machineType").get(getMachines);
router.route("/devices/machine/:machineId").put(updateMachine);
router.route("/devices/machine/:machineId").delete(deleteMachine);

router.route("/devices/ups/").post(addUps);
router.route("/devices/ups/:upsId").get(getUps);
router.route("/devices/ups/").get(getUPSuppliers);
router.route("/devices/ups/:upsId").put(updateUps);
router.route("/devices/ups/:upsId").delete(deleteUps);

router.route("/devices/mobile/:deviceType").post(addMobileDevice);
router.route("/devices/mobiles/:deviceType").get(getMobileDevices);
router
  .route("/devices/mobile/:deviceId")
  .get(getMobileDevice)
  .put(updateMobileDevice)
  .delete(deleteMobileDevice);

/* ======= OFFICE EQUIPMENT ROUTES ===== */

router.route("/office_equipment/:deviceType/:machineId").post(addOfficeDevice);
router.route("/office_equipment/device/:deviceType").get(getOfficeDevices);
router
  .route("/office_equipment/:deviceType/:deviceId")
  .get(getOfficeDevice)
  .put(updateOfficeDevice)
  .delete(deleteOfficeDevice);

/* ======= NETWORKING ROUTES ===== */

router.route("/networking/:deviceType").post(addNetworkDevice);
router.route("/networking/device/:deviceType").get(getNetworkDevices);
router
  .route("/networking/:deviceType/:deviceId")
  .get(getNetworkDevice)
  .put(updateNetworkDevice)
  .delete(deleteNetworkDevice);

/* ======= TELEPHONE ROUTES ===== */

router.route("/telephone/").post(addLine);
router.route("/telephone/:line").get(getLine);
router.route("/telephone/").get(getLines);
router.route("/telephone/:lineId").put(updateLine).delete(deleteLine);

/* ======= REMOTE DESKTOP ROUTES ===== */

router.route("/remote_desktop/:machineId").post(addAddress);
router.route("/remote_desktop/:address").get(getAddress);
router.route("/remote_desktop/").get(getAddresses);
router
  .route("/remote_desktop/:addressId")
  .put(updateAddress)
  .delete(deleteAddress);

/* ======= EMAIL ROUTES ===== */

router.route("/email/").post(addEmail);
router.route("/email/:email").get(getEmail);
router.route("/email/").get(getEmails);
router.route("/email/:emailId").put(updateEmail).delete(deleteEmail);

/* ======= SOFTWARE ROUTES ===== */

router.route("/software/").post(addSoftware);
router.route("/software/:category").get(getSoftware);
router.route("/software/").get(getSoftwares);
router
  .route("/software/:softwareId")
  .put(updateSoftware)
  .delete(deleteSoftware);

/* ======= CONFIG ROUTES ===== */
router.route("/config/:configType/").post(addConfig);
router.route("/config/:configType/").get(getConfig);
router.route("/config/:configType/:configId").put(updateConfig);

/* ======= FAULTY STATE ROUTES ===== */
router.route("/faulty/:category/").get(getFaultyDevices);
router.route("/decommissioned/:category/").get(getDecommissionedDevices);

module.exports = router;
