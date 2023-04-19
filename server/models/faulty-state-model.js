const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const FaultyDevicesSchema = new Schema({
  device: {
    type: String,
    unique: true,
    required: [true, "The device can not be empty"],
    enum: ["server", "desktop", "laptop", "ups", "tablet", "cellphone"],
  },
  machine: {
    type: String,
    unique: true,
    required: [true, "Machine name not be empty"],
  },
  recordId: {
    type: mongoose.SchemaTypes.ObjectId,
    unique: true,
  },
});

const FaultyOfficeEquipmentSchema = new Schema({
  device: {
    type: String,
    unique: true,
    required: [true, "The device can not be empty"],
    enum: ["printer", "scanner"],
  },
  user: {
    type: String,
    unique: true,
    required: [true, "User can not be empty"],
  },
  recordId: {
    type: mongoose.SchemaTypes.ObjectId,
    unique: true,
  },
});

const FaultyNetworkingDevicesSchema = new Schema({
  device: {
    type: String,
    unique: true,
    required: [true, "The device can not be empty"],
    enum: ["router", "switch", "converter"],
  },
  location: {
    type: String,
    unique: true,
    required: [true, "Location can not be empty"],
  },
  recordId: {
    type: mongoose.SchemaTypes.ObjectId,
    unique: true,
  },
});

const FaultyTelephoneSchema = new Schema({
  user: {
    type: String,
    unique: true,
    required: [true, "User can not be empty"],
  },
  recordId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "telephones",
    unique: true,
  },
});

const FaultyDevices = model("faulty_devices", FaultyDevicesSchema);
const FaultyOfficeEquipment = model(
  "faulty_office_equipment",
  FaultyOfficeEquipmentSchema
);
const FaultyNetworkingDevices = model(
  "faulty_networking_devices",
  FaultyNetworkingDevicesSchema
);
const FaultyTelephones = model("faulty_telephones", FaultyTelephoneSchema);

module.exports = {
  FaultyDevices,
  FaultyOfficeEquipment,
  FaultyNetworkingDevices,
  FaultyTelephones,
};
