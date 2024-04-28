"use strict";
// mongodb pet schema
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const petSchema = new mongoose_1.default.Schema({
    ownerId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    species: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
    },
    color: {
        type: String,
    },
    gender: {
        type: String,
    },
    vaccinationRecords: {
        type: String,
        // perhaps image files could be uploaded...
    },
    medsSupplements: {
        type: String,
    },
    allergiesSensitivities: {
        type: String,
    },
    prevIllnessesInjuries: {
        type: String,
    },
    diet: {
        type: String,
    },
    exerciseHabits: {
        type: String,
    },
    indoorOrOutdoor: {
        type: String,
    },
    reproductiveStatus: {
        type: String,
    },
    image: {
        type: String,
        // image is the image url of the file that has been saved in firebase
    },
    notes: {
        type: String,
    },
    threadId: {
        type: String,
        // threadId is the id of the openai assistant thread specific to the pet 
    },
    flaggedForConcern: {
        type: Boolean,
        default: false, // This field is false by default, can be toggled to true
    }
}, {
    timestamps: true,
});
const Pet = mongoose_1.default.model("Pet", petSchema);
exports.default = Pet;
