// src/controllers/MessageController.ts
import { Request, Response } from "express";
import { Messages } from "../db/Entities"
import {MessageModel} from "../models/MessageModel"

const messageModel = new MessageModel();

export const createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        await messageModel.createMessage(req.body);
        res.status(200).send('Message created Successfully');
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).send("Internal Server Error");
    }
};
