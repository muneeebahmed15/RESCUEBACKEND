const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./db/db");

connectDB();

const port = process.env.PORT || 4000;

app.use(express.json())

//  //  "http://localhost:5173", 
// app.use(cors({ origin:"https://jobrescuefrontend.vercel.app" }))

const corsOptions = {
  origin: ["http://localhost:5173", "https://jobrescuefrontend.vercel.app"]
};

app.use(cors(corsOptions));

//optionsS
app.options("*", cors());

// router.get('/', (req, res) => {
//   res.send('Welcome to the rescue endpoint!');
// });

app.use("/v1/rescue", require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
