const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PrinterSchema = new Schema({
  user: {
    type: String,
    required: [true, "The user can not be empty."],
  },
  model: {
    type: String,
    required: [true, "The model can not be empty."],
  },
  cartridge: {
    type: String,
    required: [true, "The cartridge can not be empty."],
  },
  multipurpose: {
    type: Boolean,
    default: false,
  },
  duplex: {
    type: Boolean,
    default: false,
  },
  networked: {
    type: Boolean,
    default: false,
  },
  serialNumber: {
    type: String,
    unique: true,
    required: [true, "The serial number can not be empty."],
    lowercase: true,
    minLength: 6,
  },
});

const ScannerSchema = new Schema({
  user: {
    type: String,
    required: [true, "The user can not be empty."],
  },
  model: {
    type: String,
    required: [true, "The model can not be empty."],
  },
  serialNumber: {
    type: String,
    unique: true,
    required: [true, "The serial number can not be empty."],
    lowercase: true,
    minLength: 6,
  },
});

const Printer = model("printers", PrinterSchema);
const Scanner = model("scanners", ScannerSchema);

module.exports = { Printer, Scanner };
