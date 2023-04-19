const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EmailsSchema = new Schema({
  user: {
    type: String,
    unique: true,
    required: [true, "The user can not be empty."],
    // lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "The address can not be empty."],
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "The password can not be empty."],
  },
});

module.exports = model("emails", EmailsSchema);
