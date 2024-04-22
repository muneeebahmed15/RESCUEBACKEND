const express = require("express");
const { registerUser, loginUser, updatePassword, forgetPassword, currentUser, loadUser, testing, singleUser, updateUser, deleteUser } = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const { addAnimal, getAnimals } = require("../controllers/animalController");
const upload = require("../middleware/imagee");

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the rescue endpoint!');
});

router.post("/register-user", verifyToken, upload, registerUser);

router.post("/login", loginUser);

router.post("/forget-password", forgetPassword);

router.post("/update-password", verifyToken, updatePassword);

router.get("/current-user", verifyToken, currentUser);

router.get("/get-users", verifyToken, loadUser);

router.get("/single-user/:id", verifyToken, singleUser);

router.put("/update-user/:id", verifyToken, updateUser);

// router.delete("/delete-user/:id", verifyToken, deleteUser);


//animals
router.post("/add-animal", verifyToken, addAnimal);

router.get("/get-animals", verifyToken, getAnimals);



router.post("/upload-image", upload, (req, res)=>{
    res.send("file upload")
});


router.post("/test/image",verifyToken, upload, testing);


// router.get('/images/:filename', (req, res) => {
//     const filename = req.params.filename;
//     // Construct the path to the image file
//     const imagePath = path.join(__dirname, 'path_to_your_image_directory', filename);
    
//     // Send the image file in the response
//     res.sendFile(imagePath);
//   });


module.exports = router;