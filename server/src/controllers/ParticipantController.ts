/* // src/controllers/ParticipantController.ts
import { Request, Response } from "express";
import { ParticipantModel } from "../models/ParticipantModel";

const participantModel = new ParticipantModel();

export const addParticipantToConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const conversationId = parseInt(req.params.conversationId); // Assuming conversationId is passed in the request parameters
        const userId = parseInt(req.body.userId); // Assuming userId is passed in the request body
        await participantModel.addParticipantToConversation(conversationId, userId);
        res.status(200).send('Participant added to Conversation Successfully');
    } catch (error) {
        console.error("Error adding participant to conversation:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const removeParticipantFromConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const conversationId = parseInt(req.params.conversationId); // Assuming conversationId is passed in the request parameters
        const userId = parseInt(req.params.userId); // Assuming userId is passed in the request parameters
        await participantModel.removeParticipantFromConversation(conversationId, userId);
        res.status(200).send('Participant removed from Conversation Successfully');
    } catch (error) {
        console.error("Error removing participant from conversation:", error);
        res.status(500).send("Internal Server Error");
    }
};
 */