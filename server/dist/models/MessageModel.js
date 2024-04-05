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
        this.participantsRepository = db_1.default.getRepository(Entities_1.Participants);
        this.conversationRepository = db_1.default.getRepository(Entities_1.Conversations);
        this.userRepository = db_1.default.getRepository(Entities_1.User);
    }
    async createMessage(messageData) {
        // Extract conversation ID, sender ID, and recipient ID from messageData
        const { conversationId, senderId, recipientId, content } = messageData;
        // Check if the conversation exists
        const conversation = await this.conversationRepository.findOne(conversationId);
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        // Check if both sender and recipient are participants in the conversation
        const [sender, recipient] = await Promise.all([
            this.userRepository.findOne(senderId),
            this.userRepository.findOne(recipientId)
        ]);
        if (!sender || !recipient) {
            throw new Error('Sender or recipient not found');
        }
        // Create message entity
        const newMessage = this.messageRepository.create({
            content,
            sender,
            conversation
        });
        // Save message entity
        await this.messageRepository.save(newMessage);
    }
}
exports.MessageModel = MessageModel;
