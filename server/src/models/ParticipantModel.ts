/* import { getRepository, Repository } from 'typeorm';
import { Participants } from '../db/Entities'; // Assuming the entity for participants is named Participant
import pool from '../db/db';

class ParticipantModel {
    private participantRepository: Repository<Participants>;

    constructor() {
        this.participantRepository = pool.getRepository(Participants);
    }

    async addParticipantToConversation(conversationId: number, userId: number): Promise<void> {
        // Logic to add a participant to a conversation (not implemented)
    }

    async removeParticipantFromConversation(conversationId: number, userId: number): Promise<void> {
        // Logic to remove a participant from a conversation (not implemented)
    }
}

export { ParticipantModel };
 */