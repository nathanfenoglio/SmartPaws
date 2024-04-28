"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const petRoutes_1 = __importDefault(require("./routes/petRoutes"));
const petController_1 = require("./controllers/petController");
const journalEntryRoutes_1 = __importDefault(require("./routes/journalEntryRoutes"));
// ExpressJS code to define server and routes.
console.log("app.ts");
const application = (0, express_1.default)();
application.use(express_1.default.json());
application.use("/user", userRoutes_1.default);
application.use("/pet", petRoutes_1.default);
application.use("/journalEntry", journalEntryRoutes_1.default);
// Route to print something to the web page
application.get("/", (req, res) => {
    res.send("<h1>Welcome to SmartPaws API</h1>");
});
// Route to print the MongoDB connection string in an <h1> tag for debugging
// yup it seems to print the correct mongodb connection string
application.get("/debug", (req, res) => {
    const dbConnectionString = process.env.MONGODB_CONNECTION_STRING;
    res.send(`<h1>DB Connection String: ${dbConnectionString}</h1>`);
});
petController_1.petEventEmitter.on('petConcernToggled', (pet) => {
    console.log(`Notification: ${pet.name} has been flagged for concern by ${pet.ownerId}.`);
});
exports.default = application;
