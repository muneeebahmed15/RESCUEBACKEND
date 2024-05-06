const animal = require("../modals/animalModal");
const test = require("../modals/testModal");

const addAnimal = async (req, res) => {
  const data = req.body;
  const files = req.files.map((file) => file.path);
  console.log(files);

  try {
    const response = await animal.create({ ...data, files });
    if (response) {
      res.status(200).json({ msg: "Record Added", response });
    } else {
      res.status(400).json({ msg: "Fail to add record", error });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

const getAnimals = async (req, res) => {
  try {
    const user = await animal.find();
    if (user) {
      res.status(200).json({ msg: "All Records", user });
    } else {
      res.stauts(404).json({ msg: "No Record found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const singleAnimal = async (req, res) => {
  const { id } = req.params;

  try {
    const record = await animal.findById(id);
    res.status(200).json({ record });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAnimal = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // console.log(id);
  // console.log(req.body);

  try {
    const updatedAnimal = await animal.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedAnimal) {
      return res.status(404).json({ error: "Animal record not found" });
    }

    res.status(200).json({ data: updatedAnimal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const storeAnimalWithPhotos = async (req, res) => {
  try {
    // Extract name from request body
    const { name } = req.body;

    // Extract file paths from req.files array (provided by Multer)
    const files = req.files.map((file) => file.path);

    // Create a new Test document with the provided data
    const newTest = new test({
      name,
      files,
    });

    // Save the Test document to the database
    const savedTest = await newTest.save();

    res.status(201).json({ message: "Test created successfully", test: savedTest });
  } catch (error) {
    console.error("Error storing test:", error);
    res.status(500).json({ error: "Failed to store test" });
  }
};

module.exports = {
  addAnimal,
  getAnimals,
  singleAnimal,
  updateAnimal,
  storeAnimalWithPhotos,
};
