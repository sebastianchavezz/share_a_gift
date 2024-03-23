"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.UpdateUser = exports.GetUser = exports.Register = exports.Login = void 0;
const UserModel_1 = require("../models/UserModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = new UserModel_1.UserModel();
const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.loginUser(username, password);
        // Check if user is found and password matches
        if (user) {
            // Generate JWT token
            const accessToken = jsonwebtoken_1.default.sign({ userId: user.UserID }, 'c3728b36f425fb184f8f91b06b8293eb19f3f837e21b65a8172dfe80bebdd00c', { expiresIn: '1h' });
            // Send the token in the response
            res.status(200).json({ accessToken: accessToken, userId: user.UserID, message: 'User logged In' });
        }
        else {
            res.status(401).send('Invalid credentials');
        }
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.Login = Login;
const Register = async (req, res) => {
    try {
        console.log('REGISTERING');
        await userModel.addUser(req.body);
        res.status(200).send('User registered Successfully');
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.Register = Register;
const GetUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId); // Assuming userId is passed in the request parameters
        const user = await userModel.getUserById(userId);
        if (user) {
            res.status(200).json({ 'fullName': user.Username, 'email': user.Email });
        }
        else {
            res.status(404).send("User not found");
        }
    }
    catch (error) {
        console.error("Error getting user:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.GetUser = GetUser;
const UpdateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId); // Assuming userId is passed in the request parameters
        await userModel.updateUser(userId, req.body);
        res.status(200).send('User updated Successfully');
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.UpdateUser = UpdateUser;
const DeleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId); // Assuming userId is passed in the request parameters
        await userModel.deleteUser(userId);
        res.status(200).send('User deleted Successfully');
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.DeleteUser = DeleteUser;
