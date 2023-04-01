const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MachineSchema = new Schema({
  machineType: {
    type: String,
    required: [true, "The deviceType can not be empty."],
    enum: ["desktop", "laptop"],
    lowercase: true,
  },
  user: {
    type: String,
    required: [true, "User can not be empty"],
    // lowercase: true,
  },
  machine: {
    type: String,
    unique: true,
    required: [true, "Machine name not be empty"],
  },
  os: {
    type: String,
    required: [true, "The Os can not be empty."],
    // lowercase: true,
  },
  office: {
    type: String,
    required: [true, "The office can not be empty."],
    lowercase: true,
  },
  antivirus: {
    type: String,
    required: [true, "The antivirus can not be empty."],
    lowercase: true,
  },
  model: {
    type: String,
    required: [true, "The model can not be empty."],
    // lowercase: true,
  },
  cpu: {
    type: String,
    required: [true, "The CPU can not be empty."],
    // lowercase: true,
  },
  cpuGen: {
    type: Number,
    required: [true, "The cpu generation can not be empty."],
    // lowercase: true,
  },
  ram: {
    type: Number,
    required: [true, "RAM can not be empty."],
  },
  storageType: {
    type: String,
    required: [true, "The storage type can not be empty"],
    enum: ["HDD", "SSD"],
  },
  storageGigs: {
    type: Number,
    required: [true, "Storage can not be empty."],
  },
  macAddress: {
    type: String,
    unique: true,
    lowercase: true,
    minLength: 17,
    maxLength: 17,
  },
  serialNumber: {
    type: String,
    unique: true,
    lowercase: true,
    minLength: 6,
    required: [true, "Serial number can not be empty."],
  },
  monitorSerialNumber: {
    type: String,
    unique: true,
    lowercase: true,
    minLength: 6,
    required: [true, "The monitor serial number can not be empty."],
  },
});

const MobileSchema = new Schema({
  deviceType: {
    type: String,
    required: [true, "The deviceType can not be empty."],
    enum: ["tablet", "cellphone"],
    lowercase: true,
  },
  user: {
    type: String,
    required: [true, "User can not be empty"],
    // lowercase: true,
  },
  os: {
    type: String,
    required: [true, "The Os can not be empty."],
    // lowercase: true,
  },
  model: {
    type: String,
    required: [true, "The model can not be empty."],
    // lowercase: true,
  },
  storage: {
    type: Number,
    required: [true, "Storage can not be empty."],
  },
  macAddress: {
    type: String,
    unique: true,
    lowercase: true,
    minLength: 17,
    maxLength: 17,
  },
  serialNumber: {
    type: String,
    unique: true,
    required: [true, "The serial number can not be empty."],
    lowercase: true,
    minLength: 6,
  },
  imei: {
    type: String,
    unique: true,
    required: [true, "The IMEI can not be empty."],
    minLength: 15,
    maxLength: 15,
  },
});

const Machine = model("computers", MachineSchema);
const MobileDevice = model("mobile_devices", MobileSchema);

module.exports = { Machine, MobileDevice };
