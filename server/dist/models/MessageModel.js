"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const Entities_1 = require("../db/Entities"); // Assuming the entity for messages is named Message
const db_1 = __importDefault(require("../db/db"));
const UserModel_1 = require("./UserModel");
class MessageModel {
    constructor() {
        this.userModel = new UserModel_1.UserModel();
        this.messageRepository = db_1.default.getRepository(Entities_1.Messages);
        this.participantsRepository = db_1.default.getRepository(Entities_1.Participants);
        this.conversationRepository = db_1.default.getRepository(Entities_1.Conversations);
        this.userRepository = db_1.default.getRepository(Entities_1.User);
    }
    async getMessagesBetweenUsers(user1Id_string, user2Id_string) {
        // Check if both sender and recipient are participants in the conversation
        const sender = await this.userModel.getUserById(user1Id_string);
        const recipient = await this.userModel.getUserById(user2Id_string);
        if (!sender || !recipient) {
            throw new Error('Sender or recipient not found');
        }
        // Find the conversation where both users are participants
        const conversation = await this.conversationRepository.findOne({
            relations: ['messages', 'messages.sender'],
            where: {
                participants: [{ user: sender }, { user: recipient }]
            }
        });
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        // Extract relevant message details
        const messagesData = conversation.messages.map(message => ({
            sender: {
                id: message.sender.UserID,
                username: message.sender.Username,
                // Add any other sender details you need
            },
            content: message.content,
            timestamp: message.timestamp
        }));
        return messagesData;
    }
    async createMessage(messageData) {
        // Extract conversation ID, sender ID, and recipient ID from messageData
        const { conversationId, senderId_string, recipientId_string, content } = messageData;
        console.log("messageData: ", messageData);
        // Check if the conversation exists
        const conversation = await this.conversationRepository.findOne({
            where: { ConversationID: conversationId }
        });
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        // Check if both sender and recipient are participants in the conversation
        const sender = await this.userModel.getUserById(senderId_string);
        const recipient = await this.userModel.getUserById(recipientId_string);
        if (!sender || !recipient) {
            throw new Error('Sender or recipient not found');
        }
        // Create message entity
        const newMessage = this.messageRepository.create({
            content,
            sender,
            conversation
        });
        console.log('Message is: ', newMessage);
        // Save message entity
        await this.messageRepository.save(newMessage);
    }
}
exports.MessageModel = MessageModel;
