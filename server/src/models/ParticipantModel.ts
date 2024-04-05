import { getRepository, Repository } from 'typeorm';
import { Participants, User, Conversations } from '../db/Entities'; // Assuming the entity for participants is named Participants
import pool from '../db/db';

class ParticipantModel {
    private participantsRepository: Repository<Participants>;
    private userRepository: Repository<User>;
    private conversationRepository: Repository<Conversations>;

    constructor() {
        this.participantsRepository = pool.getRepository(Participants);
        this.userRepository = pool.getRepository(User);
        this.conversationRepository = pool.getRepository(Conversations);
    }

    async addParticipantToConversation(conversationId: number, userId: number): Promise<void> {
        const user = await this.userRepository.findOne({where:{UserID:userId}});
        if (!user) {
            throw new Error('User not found');
        }

        const conversation = await this.conversationRepository.findOne({where:{ConversationID: conversationId}});
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

export { ParticipantModel };
