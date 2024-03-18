"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModel = void 0;
const Entities_1 = require("../db/Entities"); // Assuming the entity for conversations is named Conversation
const db_1 = __importDefault(require("../db/db"));
class ConversationModel {
    constructor() {
        this.conversationRepository = db_1.default.getRepository(Entities_1.Conversations);
    }
    async createConversation(conversationData) {
        const newConversation = this.conversationRepository.create(conversationData);
        await this.conversationRepository.save(newConversation);
    }
    async deleteConversation(conversationId) {
        await this.conversationRepository.delete(conversationId);
    }
}
exports.ConversationModel = ConversationModel;
