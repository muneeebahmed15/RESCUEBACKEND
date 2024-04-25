const animal = require('../modals/animalModal')

const addAnimal = async(req, res) =>{
   
    try {
                const response = await animal.create({...req.body});
                res.status(200).json({msg:"Record Added", response}) 
       
    } catch (error) {
        res.status(500).json({error:"Internal Server Error", error});
    }
}

const getAnimals = async(req, res) =>{
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

const singleAnimal = async(req, res) =>{
    const {id} = req.params;

    try {
        const record = await animal.findById(id);
        res.status(200).json({record})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
}

const updateAnimal = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; 

    console.log(id);
    console.log(req.body);

    try {
        const updatedAnimal = await animal.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedAnimal) {
            return res.status(404).json({ error: "Animal record not found" });
        }

        res.status(200).json({ data: updatedAnimal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = {addAnimal, getAnimals, singleAnimal, updateAnimal}