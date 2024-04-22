const mongoose = require("mongoose");

const animalSchema = mongoose.Schema({

    // arrivalDate: { type: Date },
    animalSource: { type: String },
    animalName: { type: String },
    // camperPhoto: { type: Date },
    camperGender: { type: String },
    camperAge: { type: String },
    microchip: { type: String },
    freezemark: { type: String },


    //care record
    vaccination: { type: Date },
    nextVaccination: { type: Date },

    farrier: { type: Date },
    nextFarrie: { type: Date },

    deWorm: { type: Date },
    nextDeWorm: { type: Date },

    sandClear: { type: Date },
    nextSandClear: { type: Date },

    Coggins: { type: Date },

    gelded: { type: String },

    foal: { type: String },

    //training

    touch: { type: String },

    halten: { type: String },

    leadRope: { type: String },

    leadIn: { type: String },

    tie: { type: String },

    touchLess: { type: String },

    pickupLess: { type: String },

    trailerLoad: { type: String },

    //adoptionInformation

    brandInspection: { type: String },
    halterColor: { type: String },
    halterSize: { type: String },
    adoptionDate: { type: Date },
    adopterName: { type: String },
    adopterAddress: { type: String },
    tieToPost: { type: String },
    adopterCity: { type: String },
    aopterState: { type: String },
    adopterZip: { type: String },
    adopterEmail: { type: String },
    adopterPhone: { type: String },

    
},
{
    timestamps: true,
})

const animal = mongoose.model("animal", animalSchema);
 
module.exports = animal