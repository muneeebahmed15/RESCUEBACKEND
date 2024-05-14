const mongoose = require("mongoose");

const animalSchema = mongoose.Schema(
  {
    files: [],

    burroSource: { type: String },
    animalName: { type: String },
    animalPhoto: { type: String },
    animalGender: { type: String },
    animalAge: { type: String },
    microchip: { type: String },
    freezeMark: { type: String },
    animalYear: { type: String },
    ageNotes: { type: String },
    animalNotes: { type: String },

    //care record
    vaccination: { type: String },
    nextVaccination: { type: String },
    vaccinationSerial: { type: String },

    addRabies: { type: String },
    nextRabies: { type: String },
    rabiesSerial: { type: String },

    farrier: { type: String },
    nextFarrie: { type: String },
    farrierName: { type: String },
    otherFarrierName: { type: String },

    deWorm: { type: String },
    nextDeWorm: { type: String },
    deWormBrand: { type: String },

    sandClear: { type: String },
    nextSandClear: { type: String },
    healthCertificate: { type: String },

    coggins: { type: String },

    gelded: { type: String },

    careNotes: { type: String },

    //training

    touch: { type: String },

    brush: { type: String },

    halter: { type: String },

    leadRope: { type: String },

    leadInSmall: { type: String },

    leadInLarge: { type: String },

    leadInPasture: { type: String },

    tie: { type: String },

    touchFeet: { type: String },

    pickupFeet: { type: String },

    pickoutFeet: { type: String },

    trailerLoad: { type: String },

    trainingNotes: { type: String },

    //adoptionInformation
    adoptionDate: { type: String },
    adopterName: { type: String },
    adopterEmail: { type: String },
    adopterPhone: { type: String },
    adopterStreet: { type: String },
    adopterCity: { type: String },
    adopterState: { type: String },
    adopterZip: { type: String },
    adopterSource: { type: String },

    brandInspection: { type: String },
    halterColor: { type: String },
    otherHalterColor: { type: String },
    halterSize: { type: String },
    adopterNotes: { type: String },
  },
  {
    timestamps: true,
  }
);

const animal = mongoose.model("animal", animalSchema);

module.exports = animal;
