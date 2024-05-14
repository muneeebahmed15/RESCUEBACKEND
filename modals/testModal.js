const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  // {
  //   name: { type: String },
  //   files: [{ type: String }], // Array of image paths
  // },
  {
    files: [], // Array of image paths
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
