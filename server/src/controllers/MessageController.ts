// src/controllers/MessageController.ts
import { Request, Response } from "express";
import { Messages } from "../db/Entities"
import {MessageModel} from "../models/MessageModel"

const messageModel = new MessageModel();

export const SendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        await messageModel.createMessage(req.body);
        res.status(200).send('Message created Successfully');
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const GetMessagesBetweenUsers = async (req: Request, res: Response) : Promise<void> => {
    try {
        const user1 = req.body.user1;
        const user2 = req.body.user2;
        const messages = await messageModel.getMessagesBetweenUsers(user1, user2);
        res.status(200).send(messages);
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).send("Internal Server Error");
    }
};
