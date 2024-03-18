"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantModel = void 0;
const Entities_1 = require("../db/Entities"); // Assuming the entity for participants is named Participant
const db_1 = __importDefault(require("../db/db"));
class ParticipantModel {
    constructor() {
        this.participantRepository = db_1.default.getRepository(Entities_1.Participants);
    }
    async addParticipantToConversation(conversationId, userId) {
        // Logic to add a participant to a conversation (not implemented)
    }
    async removeParticipantFromConversation(conversationId, userId) {
        // Logic to remove a participant from a conversation (not implemented)
    }
}
exports.ParticipantModel = ParticipantModel;
