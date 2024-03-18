import { getRepository, Repository } from 'typeorm';
import { Message } from '../db/Entities'; // Assuming the entity for messages is named Message

class MessageModel {
    private messageRepository: Repository<Message>;

    constructor() {
        this.messageRepository = getRepository(Message);
    }

    async createMessage(messageData: any): Promise<void> {
        const newMessage = this.messageRepository.create(messageData);
        await this.messageRepository.save(newMessage);
    }

    async deleteMessage(messageId: number): Promise<void> {
        await this.messageRepository.delete(messageId);
    }
}

export { MessageModel };
