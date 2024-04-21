import "dotenv/config";
import express from "express";
import userRoutes from "./routes/userRoutes";
import petRoutes from "./routes/petRoutes";
import { petEventEmitter } from "./controllers/petController";
import journalEntryRoutes from "./routes/journalEntryRoutes";


// ExpressJS code to define server and routes.
console.log("app.ts");
const application = express();
application.use(express.json())

application.use("/user", userRoutes)
application.use("/pet", petRoutes)
application.use("/journalEntry", journalEntryRoutes)

// Route to print something to the web page
application.get("/", (req, res) => {
  res.send("<h1>Welcome to SmartPaws API</h1>");
});

// Route to print the MongoDB connection string in an <h1> tag for debugging
application.get("/debug", (req, res) => {
  const dbConnectionString = process.env.MONGODB_CONNECTION_STRING;
  res.send(`<h1>DB Connection String: ${dbConnectionString}</h1>`);
});

petEventEmitter.on('petConcernToggled', (pet) => {
    console.log(`Notification: ${pet.name} has been flagged for concern by ${pet.ownerId}.`);
});

export default application;


