const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  // {
  //   name: { type: String },
  //   files: [{ type: String }], // Array of image paths
  // },
  {
    animalPhoto: { type: String },
    touchPicture: { type: String },
    brushPicture: { type: String },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
