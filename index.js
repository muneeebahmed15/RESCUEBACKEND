const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./db/db");

const path = require('path');


connectDB();

const port = process.env.PORT || 4000;

app.use(express.json())

app.use(cors({
    origin: 'https://jobrescuefrontend.vercel.app'
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/v1/rescue", require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
