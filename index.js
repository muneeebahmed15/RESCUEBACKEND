const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Load environment variables
require("dotenv").config();

// Connect to the database
connectDB();

// Enable CORS middleware with specific configuration
app.use(
  cors({
    origin: ["https://camprescue.vercel.app", "http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/multipleImages", express.static(path.join(__dirname, "multipleImages")));

// Define routes
app.use("/", (req, res) => {
  res.send("HELLO! Welcome to camper rescue app");
});

app.use("/v1/rescue", userRoutes);

const port = process.env.PORT || 4000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
