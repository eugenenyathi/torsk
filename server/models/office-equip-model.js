const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PrinterSchema = new Schema({
  user: {
    type: String,
    required: [true, "The user can not be empty."],
    // lowercase: true,
  },
  model: {
    type: String,
    required: [true, "The model can not be empty."],
    // lowercase: true,
  },
  cartridge: {
    type: String,
    required: [true, "The cartridge can not be empty."],
    // lowercase: true,
  },
  multipurpose: {
    type: Boolean,
    required: [true, "Multipurpose option can not be empty."],
    default: false,
  },
  duplex: {
    type: Boolean,
    required: [true, "The duplex option can not be empty."],
    default: false,
  },
  networked: {
    type: Boolean,
    required: [true, "The networked option can not be empty."],
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
    // lowercase: true,
  },
  model: {
    type: String,
    required: [true, "The model can not be empty."],
    // lowercase: true,
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
