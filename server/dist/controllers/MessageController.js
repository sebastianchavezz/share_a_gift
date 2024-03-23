"use strict";
/* // src/controllers/MessageController.ts
import { Request, Response } from "express";
import { MessageModel } from "../models/MessageModel";

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

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const messageId = parseInt(req.params.messageId); // Assuming messageId is passed in the request parameters
        await messageModel.deleteMessage(messageId);
        res.status(200).send('Message deleted Successfully');
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).send("Internal Server Error");
    }
}; */ 
