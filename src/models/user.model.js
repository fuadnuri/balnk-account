const db = require("../config/db.js");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstName: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  middleName: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  lastName: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  DoB: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  nationalId: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  accountNumber: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  balance: {
    type: mongoose.Schema.Types.Number,
    required: true,
    default: 0,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
