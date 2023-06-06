const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RemoteDesktopSchema = new Schema({
  machineId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "computers",
  },
  user: {
    type: String,
    unique: true,
    required: [true, "The user can not be empty."],
  },
  address: {
    type: Number,
    unique: true,
    required: [true, "The address can not be empty."],
  },
});

module.exports = model("remote_desktops", RemoteDesktopSchema);
