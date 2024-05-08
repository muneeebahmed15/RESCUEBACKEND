const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination directory for storing the files
    cb(null, "testing/"); // Change 'uploads/' to your desired destination directory
  },
  filename: (req, file, cb) => {
    // Define the filename for the stored file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});

// Multer upload configuration
const upload = multer({ storage });

const multiTest = upload.fields([
  { name: "animalPhoto", maxCount: 1 },
  // { name: "touchPicture", maxCount: 1 },
  // { name: "brushPicture", maxCount: 1 },
]);

module.exports = multiTest;
