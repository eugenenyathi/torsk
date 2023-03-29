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
  addPrinter,
  getPrinter,
  getPrinters,
  updatePrinter,
  deletePrinter,
} = require("../controllers/printer-contr");

const {
  addScanner,
  getScanner,
  getScanners,
  updateScanner,
  deleteScanner,
} = require("../controllers/scanner-contr");

//TODO  add serial number column to the printer model

//User routes
router.route("/validate/:username").post(validateIdentity);
router.route("/settings/:username").patch(updatePassword);

/* ======= DEVICES ROUTES ===== */

//add a new machine
router.route("/devices/machine").post(addMachine);
//get machine(s)
router.route("/devices/machine/:machineId").get(getMachine);
router.route("/devices/machines/:machineType").get(getMachines);
//update || delete a machine
router.route("/devices/machine/:machineId").put(updateMachine);
router.route("/devices/machine/:machineId").delete(deleteMachine);

//add a new mobile device
router.route("/devices/mobile/").post(addMobileDevice);
//get device(s)
router.route("/devices/mobile/:deviceId").get(getMobileDevice);
router.route("/devices/mobiles/:deviceType").get(getMobileDevices);
//update || delete a device
router.route("/devices/mobile/:deviceId").put(updateMobileDevice);
router.route("/devices/mobile/:deviceId").delete(deleteMobileDevice);

/* ======= OFFICE EQUIPMENT ROUTES ===== */

/* Printers */
//add a printer
router.route("/office_equipment/printer/").post(addPrinter);
//get printer(s)
router.route("/office_equipment/printer/:printerId").get(getPrinter);
router.route("/office_equipment/printer/").get(getPrinters);
//update || delete a printer
router.route("/office_equipment/printer/:printerId").put(updatePrinter);
router.route("/office_equipment/printer/:printerId").delete(deletePrinter);

/* Scanners */
//add a scanner
router.route("/office_equipment/scanner/").post(addScanner);
//get scanner(s)
router.route("/office_equipment/scanner/:scannerId").get(getScanner);
router.route("/office_equipment/scanner/").get(getScanners);
//update || delete a scanner
router.route("/office_equipment/scanner/:scannerId").put(updateScanner);
router.route("/office_equipment/scanner/:scannerId").delete(deleteScanner);

/* ======= REMOTE DESKTOP ROUTES ===== */

//add a new address
router.route("/remote_desktop/:machineId").post(addAddress);
//get address(s)
router.route("/remote_desktop/:address").get(getAddress);
router.route("/remote_desktop/").get(getAddresses);
//update || delete an address
router.route("/remote_desktop/:address").put(updateAddress);
router.route("/remote_desktop/:address").delete(deleteAddress);

/* ======= EMAIL ROUTES ===== */

//add a new email
router.route("/email/").post(addEmail);
//get email(s)
router.route("/email/:email").get(getEmail);
router.route("/email/").get(getEmails);
//update || delete an email
router.route("/email/:email").put(updateEmail);
router.route("/email/:email").delete(deleteEmail);

module.exports = router;
