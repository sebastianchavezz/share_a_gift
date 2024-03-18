import { getRepository, Repository } from 'typeorm';
import { Participant } from '../db/Entities'; // Assuming the entity for participants is named Participant

class ParticipantModel {
    private participantRepository: Repository<Participant>;

    constructor() {
        this.participantRepository = getRepository(Participant);
    }

    async addParticipantToConversation(conversationId: number, userId: number): Promise<void> {
        // Logic to add a participant to a conversation (not implemented)
    }

    async removeParticipantFromConversation(conversationId: number, userId: number): Promise<void> {
        // Logic to remove a participant from a conversation (not implemented)
    }
}

export { ParticipantModel };
