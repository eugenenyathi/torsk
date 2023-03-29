const express = require("express");
const router = express.Router();

const {
  updatePassword,
  validateIdentity,
} = require("../controllers/auth-contr");

/* ==== Devices-controllers ==== */
const {
  addMachine,
  getMachine,
  getAllMachines,
  getMachines,
  updateMachine,
  deleteMachine,
} = require("../controllers/machine-contr");

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

//TODO  Dashboard
//TODO  Faulty & Decommission
//TODO  Anydesk linking
//TODO default case switch
//TODO toggle password fields

//User routes
router.route("/validate/:username").post(validateIdentity);
router.route("/settings/:username").patch(updatePassword);

/* ======= DEVICES ROUTES ===== */

router.route("/devices/machine").post(addMachine);
router.route("/devices/machine/:machineId").get(getMachine);
router.route("/devices/machines/").get(getAllMachines);
router.route("/devices/machines/:machineType").get(getMachines);
router.route("/devices/machine/:machineId").put(updateMachine);
router.route("/devices/machine/:machineId").delete(deleteMachine);

router.route("/devices/mobile/:deviceType").post(addMobileDevice);
router.route("/devices/mobile/:deviceId").get(getMobileDevice);
router.route("/devices/mobiles/:deviceType").get(getMobileDevices);
router.route("/devices/mobile/:deviceId").put(updateMobileDevice);
router.route("/devices/mobile/:deviceId").delete(deleteMobileDevice);

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
router.route("/networking/:deviceType/:deviceId").get(getNetworkDevice);
router.route("/networking/:deviceType/:deviceId").put(updateNetworkDevice);
router.route("/networking/:deviceType/:deviceId").delete(deleteNetworkDevice);

/* ======= TELEPHONE ROUTES ===== */

router.route("/telephone/").post(addAddress);
router.route("/telephone/:device").get(getAddress);
router.route("/telephone/devices").get(getAddresses);
router.route("/telephone/:deviceId").put(updateAddress).delete(deleteAddress);

/* ======= REMOTE DESKTOP ROUTES ===== */

router.route("/remote_desktop/:machineId").post(addAddress);
router.route("/remote_desktop/:address").get(getAddress);
router.route("/remote_desktop/").get(getAddresses);
router.route("/remote_desktop/:addressId").put(updateAddress);
router.route("/remote_desktop/:addressId").delete(deleteAddress);

/* ======= EMAIL ROUTES ===== */

router.route("/email/").post(addEmail);
router.route("/email/:email").get(getEmail);
router.route("/email/").get(getEmails);
router.route("/email/:emailId").put(updateEmail);
router.route("/email/:emailId").delete(deleteEmail);

/* ======= SOFTWARE ROUTES ===== */

router.route("/software/").post(addSoftware);
router.route("/software/:category").get(getSoftware);
router.route("/software/").get(getSoftwares);
router.route("/software/:softwareId").put(updateSoftware);
router.route("/software/:softwareId").delete(deleteSoftware);

module.exports = router;
