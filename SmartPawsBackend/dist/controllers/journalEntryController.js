"use strict";
// create journal entries from mongodb
// get journal entries from mongodb
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
exports.getJournalEntriesOnePet = exports.createJournalEntry = void 0;
const journalEntryModel_1 = __importDefault(require("../models/journalEntryModel"));
const createJournalEntry = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerId, petName, date, entry } = request.body;
        // don't need to check for duplicates since user could make multiple journal entries for the same pet
        yield journalEntryModel_1.default.create({
            ownerId: ownerId,
            petName: petName,
            date: date,
            entry: entry
        });
        return response.status(201).send({ message: "Journal Entry created successfully" });
    }
    catch (error) {
        console.log("Error in journal entry creation");
        throw error;
    }
});
exports.createJournalEntry = createJournalEntry;
const getJournalEntriesOnePet = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerId, petName } = request.params;
        const journalEntries = yield journalEntryModel_1.default.find({ ownerId, petName });
        console.log(journalEntries);
        return response.status(200).send(journalEntries);
    }
    catch (error) {
        console.log("error in getJournalEntriesOnePet", error);
        throw error;
    }
});
exports.getJournalEntriesOnePet = getJournalEntriesOnePet;
// don't know if need to worry about deleting a journal entry...
