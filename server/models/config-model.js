const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ipValidator = require("../helpers/ipValidator");

const EmailConfigSchema = new Schema({
  incomingMail: {
    type: String,
    unique: true,
    required: [true, "Please provide a valid incoming mail server."],
    minLength: 3,
  },
  incomingMailPort: {
    type: Number,
    unique: true,
    required: [true, "Please provide a valid incoming mail server port."],
  },
  outgoingMail: {
    type: String,
    unique: true,
    required: [true, "Please provide a valid incoming mail server."],
    minLength: 3,
  },
  outgoingMailPort: {
    type: Number,
    unique: true,
    required: [true, "Please provide a valid incoming mail server port."],
  },
});

const NetworkConfigSchema = new Schema({
  baseIpAddress: {
    type: String,
    unique: true,
    required: [true, "The ip address can not be empty."],
    validate: {
      validator: (ipAddress) => ipValidator(ipAddress),
      message: (props) => `${props.value} is not a valid ip address.`,
    },
  },
  defaultGateway: {
    type: String,
    unique: true,
    required: [true, "The default gateway can not be empty."],
    validate: {
      validator: (ipAddress) => ipValidator(ipAddress),
      message: (props) => `${props.value} is not a valid gateway address.`,
    },
  },
  dns: {
    type: String,
    unique: true,
    required: [true, "The dns can not be empty."],
    validate: {
      validator: (ipAddress) => ipValidator(ipAddress),
      message: (props) => `${props.value} is not a valid dns address.`,
    },
  },
});

const NetworkConfig = model("network_config", NetworkConfigSchema);
const EmailConfig = model("email_config", EmailConfigSchema);

module.exports = { NetworkConfig, EmailConfig };
