"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConversation = exports.CreateConversation = void 0;
const ConversationModel_1 = require("../models/ConversationModel");
const conversationModel = new ConversationModel_1.ConversationModel();
const CreateConversation = async (req, res) => {
    try {
        const user2 = req.body.other_userid;
        const user1 = req.params.userid;
        await conversationModel.createConversation(user1, user2);
        res.status(200).send('Conversation created Successfully');
    }
    catch (error) {
        console.error("Error creating conversation:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.CreateConversation = CreateConversation;
const deleteConversation = async (req, res) => {
    try {
        const conversationId = parseInt(req.params.conversationId); // Assuming conversationId is passed in the request parameters
        //await conversationModel.deleteConversation(conversationId);
        res.status(200).send('Conversation deleted Successfully');
    }
    catch (error) {
        console.error("Error deleting conversation:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.deleteConversation = deleteConversation;
