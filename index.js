const express = require("express");
// const cors = require("cors");
const path = require("path");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Load environment variables
require("dotenv").config();

// Connect to the database
connectDB();

// Define the port for the server
const port = process.env.PORT || 4000;

// Handle preflight requests
// app.options("*", cors());

// Enable CORS middleware
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://jobrescuefrontend.vercel.app",
//     ],
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

function customCors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
}

app.use(customCors);

// Parse JSON requests
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("myRequest");
});

// Define routes
app.use("/v1/rescue", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
