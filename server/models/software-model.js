const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SoftwareSchema = new Schema({
  category: {
    type: String,
    unique: true,
    required: [true, "The category can not be empty."],
    lowercase: true,
  },
  software: {
    type: String,
    unique: true,
    required: [true, "The software field can not be empty."],
    // lowercase: true,
  },
});

module.exports = model("softwares", SoftwareSchema);
