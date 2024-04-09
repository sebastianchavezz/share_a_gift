"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMessagesBetweenUsers = exports.SendMessage = void 0;
const MessageModel_1 = require("../models/MessageModel");
const messageModel = new MessageModel_1.MessageModel();
const SendMessage = async (req, res) => {
    try {
        await messageModel.createMessage(req.body);
        res.status(200).send('Message created Successfully');
    }
    catch (error) {
        console.error("Error creating message:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.SendMessage = SendMessage;
const GetMessagesBetweenUsers = async (req, res) => {
    try {
        const user1 = req.body.user1;
        const user2 = req.body.user2;
        const messages = await messageModel.getMessagesBetweenUsers(user1, user2);
        res.status(200).send(messages);
    }
    catch (error) {
        console.error("Error creating message:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.GetMessagesBetweenUsers = GetMessagesBetweenUsers;
