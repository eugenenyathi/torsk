const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username can not be empty"],
    minLength: 3,
  },
  fullName: {
    type: String,
    required: [true, "Please enter your name"],
    lowercase: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: [true, "The password can not be empty."],
    minLength: 8,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model("users", UserSchema);
