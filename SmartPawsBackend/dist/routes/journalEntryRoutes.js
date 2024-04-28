"use strict";
// defines routes for jounralEntryController to post to
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const journalEntryController_1 = require("../controllers/journalEntryController");
const journalEntryRoutes = express_1.default.Router();
journalEntryRoutes.route("/create").post(journalEntryController_1.createJournalEntry);
journalEntryRoutes.route("/get/:ownerId/:petName").get(journalEntryController_1.getJournalEntriesOnePet);
exports.default = journalEntryRoutes;
