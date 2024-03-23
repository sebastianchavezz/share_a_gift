/* import { getRepository, Repository } from 'typeorm';
import { Conversations } from '../db/Entities'; // Assuming the entity for conversations is named Conversation
import pool from '../db/db';

class ConversationModel {
    private conversationRepository: Repository<Conversations>;

    constructor() {
        this.conversationRepository = pool.getRepository(Conversations);
    }

    async createConversation(conversationData: any): Promise<void> {
        const newConversation = this.conversationRepository.create(conversationData);
        await this.conversationRepository.save(newConversation);
    }

    async deleteConversation(conversationId: number): Promise<void> {
        await this.conversationRepository.delete(conversationId);
    }
}

export { ConversationModel }; */