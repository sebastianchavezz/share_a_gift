/* import { getRepository, Repository } from 'typeorm';
import { Messages} from '../db/Entities'; // Assuming the entity for messages is named Message
import pool from '../db/db';

class MessageModel {
    private messageRepository: Repository<Messages>;

    constructor() {
        this.messageRepository = pool.getRepository(Messages);
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
 */