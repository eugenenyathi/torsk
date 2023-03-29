const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

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

// EmailsSchema.pre("save", async function () {
//   const salt = bcrypt.genSalt(10);
//   this.password = bcrypt.hash(this.password, salt);
// });

module.exports = model("emails", EmailsSchema);
