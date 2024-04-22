const mongoose = require("mongoose");

const connectDB = async (req,res) =>{
    try {
        const connect = await mongoose.connect(process.env.ConnectionString);
        console.log("Database connected", connect.connection.host,
        connect.connection.name);

    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;