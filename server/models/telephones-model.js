const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

const TelephoneSchema = new Schema({
  user: {
    type: String,
    required: [true, "The user can not be empty."],
  },
  extension: {
    type: Number,
    unique: true,
    required: [true, "The extension field can not be empty."],
    minLength: 4,
    maxLength: 4,
  },
  directLine: {
    type: Number,
    unique: true,
    minLength: 7,
    maxLength: 7,
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
  extensionIsFaulty: {
    type: Boolean,
    default: false,
  },
  directLineIsFaulty: {
    type: Boolean,
    default: false,
  },
  extensionDecommissioned: {
    type: Boolean,
    default: false,
  },
  directLineDecommissioned: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("telephones", TelephoneSchema);
