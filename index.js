const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");
// const serverless = require("serverless-http");

const app = express();

// Load environment variables
require("dotenv").config();

// Connect to the database
connectDB();

// Enable CORS middleware with specific configuration
// app.use(
//   cors({
//     origin: "https://musical-starburst-2690cb.netlify.app", //"http://localhost:5173",
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//testing

app.use(cors());

// Parse JSON requests
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/testing", express.static(path.join(__dirname, "testing")));

// Define routes
// app.use("/", (req, res) => {
//   res.send("HELLO! Welcome to camper rescue app");
// });

app.use("/v1/rescue", userRoutes);

const port = process.env.PORT || 4000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

// module.exports.handler = serverless(app);
