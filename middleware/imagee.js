const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination directory for storing the file
        cb(null, 'uploads/staff'); // Change 'uploads/' to your desired destination directory
    },
    filename: (req, file, cb) => {
        // Define the filename for the stored file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
});

// Multer upload configuration
const upload = multer({ storage });

module.exports = upload.single('file'); // Change 'file' to the name of the field in your form




// const multer = require("multer");
// const path = require("path");

// const storage  = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Uploads/StaffPictures');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// })

// const upload = multer({storage}).single('photo');
// module.exports = upload;



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Uploads/User/DPS/'); // Upload directory
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const extname = path.extname(file.originalname);
//         cb(null, file.fieldname + '-' + uniqueSuffix + extname);
//     }
// });
// const upload = multer({ storage });
// export default upload;