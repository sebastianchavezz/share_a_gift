"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantModel = void 0;
const Entities_1 = require("../db/Entities"); // Assuming the entity for participants is named Participants
const db_1 = __importDefault(require("../db/db"));
class ParticipantModel {
    constructor() {
        this.participantsRepository = db_1.default.getRepository(Entities_1.Participants);
        this.userRepository = db_1.default.getRepository(Entities_1.User);
        this.conversationRepository = db_1.default.getRepository(Entities_1.Conversations);
    }
    async addParticipantToConversation(conversationId, userId) {
        const user = await this.userRepository.findOne({ where: { UserID: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const conversation = await this.conversationRepository.findOne({ where: { ConversationID: conversationId } });
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        const participant = this.participantsRepository.create({
            user,
            conversation
        });
        await this.participantsRepository.save(participant);
    }
}
exports.ParticipantModel = ParticipantModel;
