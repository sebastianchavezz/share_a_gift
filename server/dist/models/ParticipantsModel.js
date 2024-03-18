"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantModel = void 0;
const typeorm_1 = require("typeorm");
const Entities_1 = require("../db/Entities"); // Assuming the entity for participants is named Participant
class ParticipantModel {
    constructor() {
        this.participantRepository = (0, typeorm_1.getRepository)(Entities_1.Participant);
    }
    async addParticipantToConversation(conversationId, userId) {
        // Logic to add a participant to a conversation (not implemented)
    }
    async removeParticipantFromConversation(conversationId, userId) {
        // Logic to remove a participant from a conversation (not implemented)
    }
}
exports.ParticipantModel = ParticipantModel;
