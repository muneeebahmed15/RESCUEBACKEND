const multer = require("multer");
const path = require("path");

const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/StaffPictures');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({storage}).single('photo');
module.exports = upload;



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