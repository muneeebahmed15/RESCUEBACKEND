const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String },
    photo: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    DOB: { type: String },
    emergencyContactName: { type: String },
    emergencyContactNumber: { type: String },
    role: { type: String },
    otherRole: { type: String },
    availability: [String],
    photo: { type: String },
    password: { type: String },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
