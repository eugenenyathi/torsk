const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UpsSchema = new Schema({
  connectedDevice: {
    type: String,
    unique: true,
    required: [true, "The connected device can not be empty"],
  },
  model: {
    type: String,
    required: [true, "The model can not be empty."],
  },
  watts: {
    type: Number,
    required: [true, "Watt number can not be empty."],
  },
  serialNumber: {
    type: String,
    unique: true,
    lowercase: true,
    minLength: 6,
    required: [true, "Serial number can not be empty."],
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

module.exports = model("upSuppliers", UpsSchema);
