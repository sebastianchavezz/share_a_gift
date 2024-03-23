"use strict";
/* // src/controllers/ConversationController.ts
import { Request, Response } from "express";
import { ConversationModel } from "../models/ConversationModel";

const conversationModel = new ConversationModel();

export const createConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        await conversationModel.createConversation(req.body);
        res.status(200).send('Conversation created Successfully');
    } catch (error) {
        console.error("Error creating conversation:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const conversationId = parseInt(req.params.conversationId); // Assuming conversationId is passed in the request parameters
        await conversationModel.deleteConversation(conversationId);
        res.status(200).send('Conversation deleted Successfully');
    } catch (error) {
        console.error("Error deleting conversation:", error);
        res.status(500).send("Internal Server Error");
    }
}; */ 
