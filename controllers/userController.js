const User = require("../modals/userModal");
const jwt = require("jsonwebtoken")
const Test = require("../modals/testModal")

const registerUser = async(req, res) =>{
    const {
        firstName,
        lastName,
        email,
        phone,
        address,
        DOB,
        emergencyContactName,
        emergencyContactNumber,
        role,
        otherRole,
        availability,
        photo,
        password,
        notes
     } = req.body;

     console.log(role)

    try {
        // if(!name || !email || !password || !gender){
        //     res.status(400).json("All fields manadatory!");
        // }

        // if (!req.file) {
        //     res.status(400).json("Image is required");
        //   }
        
            const existingUser = await User.findOne({email});

                if(existingUser){
                    res.status(400).json({msg:"User already exist", user: existingUser});
            }
            else{
              const user = await User.create({
                firstName,
                lastName,
                email,
                phone,
                address,
                DOB,
                emergencyContactName,
                emergencyContactNumber,
                role,
                otherRole,
                availability,
                photo: req.file.path,
                password,
                notes , 
                addedBy: req.user.id
            } );
         
                if(user){
                    res.status(200).json({msg:"User created Successfully", user});
                }else{
                    res.status(400).json("User not created");
                }
            }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error, msg:"Internal Server Error"})
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // console.log(req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json("User not found");
        }
        if (password !== user.password) {
            return res.status(400).json("Wrong Credentials");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        return res.status(200).json({ token, rest });
    } catch (error) {
        return res.status(500).json({ error, msg: "Internal Server Error" });
    }
};

const forgetPassword = async(req, res) =>{
        const {email, password} = req.body;

        try {
            const user = await User.findOne({email})
            if(user){
                user.password = password;
                res.status(200).json({msg:"Password updated Successfully", user})
            }else{
                res.status(404).json("User not found")
            }
        } catch (error) {
            res.status(500).json({error, msg:"Internal Server Error"})
        }
}

const updatePassword = async(req, res) => {
    const { id } = req.user; // Correctly accessing the user ID from req.user

    const { oldPass, newPass } = req.body;

    try {
        const user = await User.findById(id);
        if (user) {
            if (user.password !== oldPass) {
                res.status(400).json("Old password is incorrect");
            } else {
                user.password = newPass; 
                await user.save(); 
                res.status(200).json({ msg: "Password updated successfully", user });
            }
        } else {
            res.status(404).json("User not found");
        }
    } catch (error) {
        res.status(500).json({ error, msg: "Internal Server Error" });
    }
}

const currentUser = async(req, res) =>{
    const {id} = req.user;

    try {
        const user = await User.findById(id);
        if(user){
            res.status(200).json({user})
        }
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

const loadUser = async(req, res) =>{

    try {
        const users = await User.find();
       
        const usersWithPhotoURL = users.map(user => {
            const imgURL = user.photo ? `/${user.photo}` : null;
            return { ...user.toJSON(), photo: imgURL };
        });

        res.status(200).json({ data: usersWithPhotoURL });
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}

const singleUser = async(req, res) =>{
    const {id} = req.params;

    try {
        const user = await User.findById(id);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({error:  "User not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const updateUser = async(req, res) =>{
    const{id} = req.params;
    const updateData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, {new: true});
        if(updatedUser){
            res.status(200).json({msg: "User updated", updatedUser});
        }else{
            res.status(400).json({msg: "User not updated"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const deleteUser = async(req, res) =>{
    const {id} = req.params;

    try {
        const data = await User.findByIdAndDelete( id );
            if (data) {
            res.status(200).json({msg: "Staff deleted", data});
        }else{
            res.status(404).json({msg: "Staff not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

const testing = async(req, res) => {
    const {name} = req.body;
    try {
        if (!req.file) {
            res.status(400).json("Image is required");
          }
          const user = new Test({
            name,
            dp: req.file.filename,
          });
      
          await user.save();
      
          if (user) {
            res.status(200).json({ msg: "User created Successfully", user });
          } else {
            res.status(400).json("User not created");
          }
        
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

const updateDP = async (req, res) => {

    console.log(req.body);

        const { id } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(200).json({
                status: false,
                message: "User not found"
            });
        }
        // Update the user's image path
        user.dp = req.file.path;
        await user.save();
        // Construct the image URL using the base URL and the user's image path
        const imageUrl = `${req.protocol}://${req.get('host')}/${user.dp}`;
        return res.status(200).json({
            status: true,
            message: "Profile image uploaded successfully",
            data: user
        });
    }


const uploadFile = async (req, res) => {
        console.log(req.body)
        console.log(req.file)
        try {
            // Check if file exists in the request
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
    
            // Extract name from request body
            const { name } = req.body;
    
            // Create a new Test object with name and dp fields
            const newTest = new Test({
                name: name,
                file: req.file.path // Assuming req.file.path contains the path to the uploaded file
            });
    
            // Save the new Test object to the database
            const savedTest = await newTest.save();
    
            res.status(200).json({ message: 'File uploaded and saved successfully', test: savedTest });
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };



const getFile = async (req, res) => {
    try {
        // Fetch the file data from the database
        const fileData = await Test.findById(req.params.id);


        // Check if file data exists
        if (!fileData) {
            return res.status(404).json({ message: "File not found" });
        }

        // Construct the image URL based on your server configuration
        // const imageUrl = `${req.protocol}://${req.get('host')}/${fileData.file}`;

        const imageUrl = `/${fileData.file}`; //${req.protocol}://${req.get('host')}

        // Send the file data and image URL in the response
        res.status(200).json({ message: "File retrieved successfully", fileData: { ...fileData.toJSON(), file: imageUrl } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getId = async (req, res) =>{
    try {
        const ids = await Test.find();
        if(ids){
            res.status(200).json({msg: "ids", ids})
        }
    } catch (error) {
        console.log(error);
    }
}
    
    
    

module.exports = {registerUser, uploadFile,getId, getFile, loginUser,forgetPassword, updatePassword, currentUser, loadUser, testing, singleUser, updateUser, deleteUser}