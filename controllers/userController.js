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

    try {
        // if(!name || !email || !password || !gender){
        //     res.status(400).json("All fields manadatory!");
        // }

        // if (!req.file) {
        //     res.status(400).json("Image is required");
        //   }
        
            const existingUser = await User.findOne({email});

                if(existingUser){
                    res.status(400).json("User already exist");
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
                photo,
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

const loginUser  = async(req, res) =>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json("User not found");
        }
        if(password !== user.password){
            res.status(400).json("Wrong Credentials");
        }else{
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = user._doc;
            res.status(200).json({token, rest})
        }
    } catch (error) {
        res.status(500).json({error, msg:"Internal Server Error"})
    }
}

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
        const user = await User.find();
        res.status(200).json(user);
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


module.exports = {registerUser, loginUser,forgetPassword, updatePassword, currentUser, loadUser, testing, singleUser, updateUser, deleteUser}