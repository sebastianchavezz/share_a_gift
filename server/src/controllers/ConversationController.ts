import { Request, Response } from "express";
import { ConversationModel } from "../models/ConversationModel";

const conversationModel = new ConversationModel();

export const CreateConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const user2 = req.body.other_userid;
        const user1 = req.params.userid;
        await conversationModel.createConversation(user1, user2);
        res.status(200).send('Conversation created Successfully');
    } catch (error) {
        console.error("Error creating conversation:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const GetAllConversationsByUser = async (req:Request, res: Response): Promise<void> => {
    try {
        const user = req.params.userid;
        const conversations =await conversationModel.getAllConversationsByUser(user);
        res.status(200).send(conversations);
    } catch (error){
        console.error("ERROR: ",error);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const conversationId = parseInt(req.params.conversationId); // Assuming conversationId is passed in the request parameters
        //await conversationModel.deleteConversation(conversationId);
        res.status(200).send('Conversation deleted Successfully');
    } catch (error) {
        console.error("Error deleting conversation:", error);
        res.status(500).send("Internal Server Error");
    }
}; 