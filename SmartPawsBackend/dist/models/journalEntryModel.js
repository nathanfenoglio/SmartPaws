"use strict";
// mongodb JounalEntry schema
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const journalEntrySchema = new mongoose_1.default.Schema({
    ownerId: {
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    entry: {
        type: String
    }
});
const JournalEntry = mongoose_1.default.model("JournalEntry", journalEntrySchema);
exports.default = JournalEntry;
