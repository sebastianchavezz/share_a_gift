//src/controllers/User.ts
import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";

const userModel = new UserModel();

export const Login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await userModel.loginUser(username, password);
        if (user) {
            res.status(200).send('User logged In');
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const Register = async (req: Request, res: Response): Promise<void> => {
    try {
        await userModel.registerUser(req.body);
        res.status(200).send('User registered Successfully');
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const GetUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId); // Assuming userId is passed in the request parameters
        const user = await userModel.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const UpdateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId); // Assuming userId is passed in the request parameters
        await userModel.updateUser(userId, req.body);
        res.status(200).send('User updated Successfully');
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const DeleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId); // Assuming userId is passed in the request parameters
        await userModel.deleteUser(userId);
        res.status(200).send('User deleted Successfully');
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
};
