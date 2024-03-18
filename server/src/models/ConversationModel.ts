import { getRepository, Repository } from 'typeorm';
import { Conversation } from '../db/Entities'; // Assuming the entity for conversations is named Conversation

class ConversationModel {
    private conversationRepository: Repository<Conversation>;

    constructor() {
        this.conversationRepository = getRepository(Conversation);
    }

    async createConversation(conversationData: any): Promise<void> {
        const newConversation = this.conversationRepository.create(conversationData);
        await this.conversationRepository.save(newConversation);
    }

    async deleteConversation(conversationId: number): Promise<void> {
        await this.conversationRepository.delete(conversationId);
    }
}

export { ConversationModel };