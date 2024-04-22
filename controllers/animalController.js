const animal = require('../modals/animalModal')

const addAnimal = async(req, res) =>{
   
    try {
                const response = await animal.create({...req.body});
                res.status(200).json({msg:"Record Added", response}) 
       
    } catch (error) {
        res.status(500).json({error:"Internal Server Error", error});
    }
}

const getAnimals = async(req,res) =>{
    try {
        const user = await animal.find()
        if(user){
            res.status(200).json({msg:"All Records", user})
        }else{
            res.stauts(404).json({msg: "No Record found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = {addAnimal, getAnimals}