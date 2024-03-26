const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const Role = require("../enums/Role");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: Role.USER,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password, name) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, name });
  return user;
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email not Registered");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
