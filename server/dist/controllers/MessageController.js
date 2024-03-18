"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.createMessage = void 0;
const MessageModel_1 = require("../models/MessageModel");
const messageModel = new MessageModel_1.MessageModel();
const createMessage = async (req, res) => {
    try {
        await messageModel.createMessage(req.body);
        res.status(200).send('Message created Successfully');
    }
    catch (error) {
        console.error("Error creating message:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.createMessage = createMessage;
const deleteMessage = async (req, res) => {
    try {
        const messageId = parseInt(req.params.messageId); // Assuming messageId is passed in the request parameters
        await messageModel.deleteMessage(messageId);
        res.status(200).send('Message deleted Successfully');
    }
    catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.deleteMessage = deleteMessage;
