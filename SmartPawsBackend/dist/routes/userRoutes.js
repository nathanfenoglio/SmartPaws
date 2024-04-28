"use strict";
// Defines routes for userController to post API's to
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatGPT_1 = __importDefault(require("../chatGPT"));
const userController_1 = require("../controllers/userController");
const userRoutes = express_1.default.Router();
userRoutes.route("/create").post(userController_1.createUser);
userRoutes.route("/login").post(userController_1.loginUser);
userRoutes.route("/chatGPT/:ownerId/:petName/:threadId").post(chatGPT_1.default);
userRoutes.route("/get/:uid").get(userController_1.getUser);
userRoutes.route("/update/:uid").patch(userController_1.updateUser);
exports.default = userRoutes;
