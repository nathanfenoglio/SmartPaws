"use strict";
// This file has functions that interact with User.
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
exports.updateUser = exports.getUser = exports.loginUser = exports.createUser = void 0;
// import bcrypt from "bcrypt"
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const getUserToken = (_id) => {
    const authenticatedUserToken = jsonwebtoken_1.default.sign({ _id }, "express", {
        expiresIn: "7d",
    });
    return authenticatedUserToken;
};
// API to handle creating user. Takes Name, Email, UID (Provided by Firebase API via Frontend), and Password then stores it in MONGODB
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, uid, password } = request.body;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return response.status(409).send("user already exist");
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        yield userModel_1.default.create({
            name: name,
            email: email,
            uid: uid,
            password: hashedPassword,
        });
        return response.status(201).send({ message: "User created successfully" });
    }
    catch (error) {
        console.log("error in createUser", error);
        throw error;
    }
});
exports.createUser = createUser;
// API to handle logging in User
const loginUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (!existingUser) {
            return response.status(409).send({ message: "User doesn't exist" });
        }
        const isPasswordIdentical = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (isPasswordIdentical) {
            const token = getUserToken(existingUser._id);
            return response.send({
                token,
                user: {
                    email: existingUser.email,
                    name: existingUser.name,
                },
            });
        }
        else {
            return response.status(400).send({ message: "Wrong credentials" });
        }
    }
    catch (error) {
        console.log("error in loginUser", error);
        throw error;
    }
});
exports.loginUser = loginUser;
// API to handle getting User data
const getUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = request.params;
        const user = yield userModel_1.default.findOne({ uid });
        console.log(user);
        return response.status(200).send(user);
    }
    catch (error) {
        console.log("Error in getUser", error);
        throw error;
    }
});
exports.getUser = getUser;
// API to handle updating user details
const updateUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = request.params;
        const { name, email } = request.body;
        const updatedUser = yield userModel_1.default.findOneAndUpdate({ uid }, { name, email }, { new: true });
        return response.status(200).send({ message: "User updated successfully", updatedUser });
    }
    catch (error) {
        console.log("Error in updateUser", error);
        response.status(500).send("Error updating user");
    }
});
exports.updateUser = updateUser;
