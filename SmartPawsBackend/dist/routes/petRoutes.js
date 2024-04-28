"use strict";
// defines routes for petController to post to
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const petController_1 = require("../controllers/petController");
const petRoutes = express_1.default.Router();
petRoutes.route("/create").post(petController_1.createPet);
petRoutes.route("/get/:ownerId").get(petController_1.getPets); // get request specifies ownerId/user's uid to get pets associated with logged in user
petRoutes.route("/get/:ownerId/:petName").get(petController_1.getOnePet); // get request to get 1 pet found by owner id and pet name in url 
petRoutes.route("/delete/:ownerId/:petName").delete(petController_1.deleteOnePet); // delete 1 pet
petRoutes.route("/update/:ownerId/:petName").put(petController_1.updatePet); // update preexisting pet profile
petRoutes.route("/toggleConcern/:ownerId/:petName").patch(petController_1.petConcernToggle); //for concern toggle-able button
exports.default = petRoutes;
