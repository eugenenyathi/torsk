const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ipValidator = require("../helpers/ipValidator");

const RouterSchema = new Schema({
  location: {
    type: String,
    required: [true, "The location can not be empty."],
  },
  model: {
    type: String,
    required: [true, "The model can not be empty."],
  },
  wireless: {
    type: Boolean,
    required: [true, "The wireless option can not be empty."],
  },
  ports: {
    type: Number,
    required: [true, "The ports option can not be empty."],
    min: 6,
  },
  deadPorts: {
    type: Number,
    default: 0,
  },
  ipAddress: {
    type: String,
    unique: true,
    required: [true, "The ip address can not be empty."],
    // required: true,
    validate: {
      validator: (ipAddress) => ipValidator(ipAddress),
      message: (props) => `${props.value} is not a valid ip address.`,
    },
  },
  serialNumber: {
    type: String,
    unique: true,
    required: [true, "The serial number can not be empty."],
    lowercase: true,
    minLength: 6,
  },
  faulty: {
    type: Boolean,
    default: false,
  },
  decommissioned: {
    type: Boolean,
    default: false,
  },
  inRepair: {
    type: Boolean,
    default: false,
  },
});

const SwitchSchema = new Schema({
  location: {
    type: String,
    required: [true, "The location can not be empty."],
    // lowercase: true,
  },
  model: {
    type: String,
    required: [true, "The model can not be empty."],
    // lowercase: true,
  },
  ports: {
    type: Number,
    required: [true, "The ports option can not be empty."],
    min: 8,
  },
  deadPorts: {
    type: Number,
    default: 0,
  },
  serialNumber: {
    type: String,
    unique: true,
    required: [true, "The serial number can not be empty."],
    lowercase: true,
    minLength: 6,
  },
  faulty: {
    type: Boolean,
    default: false,
  },
  decommissioned: {
    type: Boolean,
    default: false,
  },
  inRepair: {
    type: Boolean,
    default: false,
  },
});

const ConverterSchema = new Schema({
  location: {
    type: String,
    required: [true, "The location can not be empty."],
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
  faulty: {
    type: Boolean,
    default: false,
  },
  decommissioned: {
    type: Boolean,
    default: false,
  },
  inRepair: {
    type: Boolean,
    default: false,
  },
});

const WiFiSchema = new Schema({
  routerId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "routers",
  },
  location: {
    type: String,
    required: [true, "The location can not be empty."],
    // lowercase: true,
  },
  ssid: {
    type: String,
    unique: true,
    required: [true, "The ssid can not be empty."],
    // lowercase: true,
  },
  password: {
    type: String,
    required: [true, "The password can not be empty."],
    minLength: 6,
  },
});

const Router = model("routers", RouterSchema);
const Switch = model("switches", SwitchSchema);
const Converter = model("converters", ConverterSchema);
const WiFi = model("wifi", WiFiSchema);

module.exports = { Router, Switch, Converter, WiFi };
