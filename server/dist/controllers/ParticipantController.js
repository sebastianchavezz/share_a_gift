"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeParticipantFromConversation = exports.addParticipantToConversation = void 0;
const ParticipantModel_1 = require("../models/ParticipantModel");
const participantModel = new ParticipantModel_1.ParticipantModel();
const addParticipantToConversation = async (req, res) => {
    try {
        const conversationId = parseInt(req.params.conversationId); // Assuming conversationId is passed in the request parameters
        const userId = parseInt(req.body.userId); // Assuming userId is passed in the request body
        await participantModel.addParticipantToConversation(conversationId, userId);
        res.status(200).send('Participant added to Conversation Successfully');
    }
    catch (error) {
        console.error("Error adding participant to conversation:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.addParticipantToConversation = addParticipantToConversation;
const removeParticipantFromConversation = async (req, res) => {
    try {
        const conversationId = parseInt(req.params.conversationId); // Assuming conversationId is passed in the request parameters
        const userId = parseInt(req.params.userId); // Assuming userId is passed in the request parameters
        await participantModel.removeParticipantFromConversation(conversationId, userId);
        res.status(200).send('Participant removed from Conversation Successfully');
    }
    catch (error) {
        console.error("Error removing participant from conversation:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.removeParticipantFromConversation = removeParticipantFromConversation;
