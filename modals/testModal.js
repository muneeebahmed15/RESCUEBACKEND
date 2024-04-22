const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    name: {type: String, required: true},
    dp: {type: String}
},{
    timestamps: true,
})

const Test = mongoose.model("Test", testSchema);

 module.exports = Test;