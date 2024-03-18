"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const Entities_1 = require("../db/Entities"); // Assuming the entity for messages is named Message
const db_1 = __importDefault(require("../db/db"));
class MessageModel {
    constructor() {
        this.messageRepository = db_1.default.getRepository(Entities_1.Messages);
    }
    async createMessage(messageData) {
        const newMessage = this.messageRepository.create(messageData);
        await this.messageRepository.save(newMessage);
    }
    async deleteMessage(messageId) {
        await this.messageRepository.delete(messageId);
    }
}
exports.MessageModel = MessageModel;
