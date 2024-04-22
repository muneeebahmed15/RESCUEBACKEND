const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./db/db");

connectDB();

const port = process.env.PORT || 4000;

app.use(express.json())

// const corsOptions = {
//   origin: ['https://jobrescuefrontend.vercel.app/', 'http://localhost:5173'], // Specify the allowed origin
//   methods: ['GET', 'POST', 'PUT'], // Specify the allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
// };
// app.use(cors(corsOptions));

app.use(cors());

//optionsS
// app.options("*", cors());

app.use("/v1/rescue", require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
