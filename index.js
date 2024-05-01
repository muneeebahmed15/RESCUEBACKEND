// const express = require("express");
// const app = express();
// const cors = require("cors");
// require('dotenv').config();
// const connectDB = require("./db/db");

// const path = require('path');


// connectDB();

// const port = process.env.PORT || 4000;

// app.use(express.json())

// app.use(cors({
//     origin: 'https://jobrescuefrontend.vercel.app'
// }));


// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use("/v1/rescue", require("./routes/userRoutes"));

// app.listen(port, () => {
//     console.log(`Server is running on Port ${port}`);
// });


const express = require("express");
const cors = require("cors");
const path = require('path');
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Load environment variables
require('dotenv').config();

// Connect to the database
connectDB();

// Define the port for the server
const port = process.env.PORT || 4000;

// Handle preflight requests
app.options('*', cors());

// Enable CORS middleware
app.use(cors({
    origin: ['http://localhost:5173', "https://jobrescuefrontend.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

// Parse JSON requests
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use('/', (req, res) => {
//     res.send('Welcome to the rescue endpoint! from the indexxxxxx');
//   });

// Define routes
app.use("/v1/rescue", userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
