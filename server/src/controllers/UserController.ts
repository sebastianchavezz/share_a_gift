//src/controllers/User.ts
import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import jwt from 'jsonwebtoken';

const userModel = new UserModel();

export const Login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await userModel.loginUser(username, password);

        // Check if user is found and password matches
        if (user) {
            // Generate JWT token
            const accessToken = jwt.sign({ userId: user.UserID }, 'c3728b36f425fb184f8f91b06b8293eb19f3f837e21b65a8172dfe80bebdd00c', { expiresIn: '1h' });

            // Send the token in the response
            res.status(200).json({ accessToken: accessToken, userId: user.UserID, message: 'User logged In' });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const Register = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('REGISTERING');
        await userModel.addUser(req.body);
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
            
            res.status(200).json({'fullName':user.Username, 'email':user.Email});
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