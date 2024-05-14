const mongoose = require("mongoose");

const animalSchema = mongoose.Schema(
  {
    files: [],
    name: { type: String },
    age: { type: String },

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
    touchPicture: { type: String },

    brush: { type: String },
    brushPicture: { type: String },

    halter: { type: String },
    halterPicture: { type: String },

    leadRope: { type: String },
    leadRopePicture: { type: String },

    leadInSmall: { type: String },
    leadInSmallPicture: { type: String },

    leadInLarge: { type: String },
    leadInLargePicture: { type: String },

    leadInPasture: { type: String },
    leadInPasturePicture: { type: String },

    tie: { type: String },
    tiePicture: { type: String },

    touchFeet: { type: String },
    touchFeetPicture: { type: String },

    pickupFeet: { type: String },
    pickupFeetPicture: { type: String },

    pickoutFeet: { type: String },
    pickoutFeetPicture: { type: String },

    trailerLoad: { type: String },
    tailerLoadPicture: { type: String },

    trainingNotes: { type: String },

    //adoptionInformation
    adoptionDate: { type: String },
    adopterName: { type: String },
    adopterEmail: { type: String },
    adopterPhone: { type: String },
    adopterStreet: { type: String },
    adopterCity: { type: String },
    aopterState: { type: String },
    adopterZip: { type: String },
    // adopterSource:  { type: String } [],

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
