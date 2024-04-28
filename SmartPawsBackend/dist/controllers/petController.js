"use strict";
// create pet, toggle pet concern on/off, get all user's pets, 
// get one pet, delete one pet, update one pet 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePet = exports.deleteOnePet = exports.getOnePet = exports.getPets = exports.petConcernToggle = exports.petEventEmitter = exports.createPet = void 0;
const petModel_1 = __importDefault(require("../models/petModel"));
const events_1 = require("events");
const createPet = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerId, name, age, species, breed, color, gender, vaccinationRecords, medsSupplements, allergiesSensitivities, prevIllnessesInjuries, diet, exerciseHabits, indoorOrOutdoor, reproductiveStatus, image, notes, threadId } = request.body;
        // NOT SURE THAT THIS IS WORKING FOR CHECKING IF AN OWNER ALREADY HAS A PET WITH THE SAME NAME, NEED TO TEST...
        const existingPet = yield petModel_1.default.findOne({ ownerId, name }); // check if the database already contains a pet with same ownerId and name
        if (existingPet) {
            return response.status(409).send("pet already exists");
        }
        // not doing anything with generating a password
        // because creating a pet should be tied in already with user being logged in 
        yield petModel_1.default.create({
            ownerId: ownerId,
            name: name,
            age: age,
            species: species,
            breed: breed,
            color: color,
            gender: gender,
            vaccinationRecords: vaccinationRecords,
            medsSupplements: medsSupplements,
            allergiesSensitivities: allergiesSensitivities,
            prevIllnessesInjuries: prevIllnessesInjuries,
            diet: diet,
            exerciseHabits: exerciseHabits,
            indoorOrOutdoor: indoorOrOutdoor,
            reproductiveStatus: reproductiveStatus,
            image: image,
            notes: notes,
            threadId: threadId,
        });
        return response.status(201).send({ message: "Pet created successfully" });
    }
    catch (error) {
        console.log("error in createPet", error);
        throw error;
    }
});
exports.createPet = createPet;
exports.petEventEmitter = new events_1.EventEmitter();
// Toggle the flaggedForConcern
const petConcernToggle = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerId, petName } = request.params;
        const pet = yield petModel_1.default.findOne({ ownerId, name: petName });
        if (!pet) {
            return response.status(404).send("Pet not found");
        }
        pet.flaggedForConcern = !pet.flaggedForConcern;
        yield pet.save();
        if (pet.flaggedForConcern) {
            // Emitting an event indicating a pet has been flagged for concern
            exports.petEventEmitter.emit('petConcernToggled', pet);
        }
        return response.status(200).json({
            message: "Pet flagged status updated successfully",
            flaggedForConcern: pet.flaggedForConcern
        });
    }
    catch (error) {
        console.log("Error in petConcernToggle", error);
        return response.status(500).send(error);
    }
});
exports.petConcernToggle = petConcernToggle;
// getPets is called in petRoutes.ts in the get request
// sends request with ownerId specified like http://localhost:1337/pet/get/123456
// and gets all pets that have same ownerId as currently logged in user's uid
const getPets = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerId } = request.params;
        const pets = yield petModel_1.default.find({ ownerId });
        console.log(pets);
        return response.status(200).send(pets);
    }
    catch (error) {
        console.log("error in getPets", error);
        throw error;
    }
});
exports.getPets = getPets;
// get pet based on ownerId and pet name
const getOnePet = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerId, petName } = request.params;
        const pet = yield petModel_1.default.findOne({ "ownerId": ownerId, "name": petName });
        console.log(pet);
        return response.status(200).send(pet);
    }
    catch (error) {
        console.log("error in getOnePet");
        throw error;
    }
});
exports.getOnePet = getOnePet;
// delete pet based on ownerId and pet name
const deleteOnePet = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerId, petName } = request.params;
        const pet = yield petModel_1.default.findOneAndDelete({ "ownerId": ownerId, "name": petName });
        console.log(pet);
        if (!pet) {
            return response.status(400).json("Pet not found");
        }
        response.status(200).json("Pet deleted successfully");
        console.log("pet deleted from database");
    }
    catch (error) {
        console.log("error in deleteOnePet");
        throw error;
    }
});
exports.deleteOnePet = deleteOnePet;
// update pet based on ownerId and pet name
const updatePet = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerId, petName } = request.params;
        const petUpdatedData = request.body;
        // mongoose function to find record in database and update it
        // locates record based on ownerId and petName
        // and then updates the record with the new pet data
        const pet = yield petModel_1.default.findOneAndUpdate({ "ownerId": ownerId, "name": petName }, petUpdatedData, { new: true, upsert: true });
        console.log(pet);
        if (!pet) {
            return response.status(400).json("pet not found");
        }
        response.status(200).json("pet profile updated successfully");
        console.log("pet profile updated in database");
    }
    catch (error) {
        console.log("error in updatePet");
        throw error;
    }
});
exports.updatePet = updatePet;
