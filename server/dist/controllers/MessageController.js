"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
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
