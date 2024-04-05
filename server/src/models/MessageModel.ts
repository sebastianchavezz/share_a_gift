import { getRepository, Repository } from 'typeorm';
import { Conversations, Messages, Participants, User } from '../db/Entities'; // Assuming the entity for messages is named Message
import pool from '../db/db';

class MessageModel {
    private messageRepository: Repository<Messages>;
    private participantsRepository: Repository<Participants>;
    private conversationRepository: Repository<Conversations>;
    private userRepository: Repository<User>;

    constructor() {
        this.messageRepository = pool.getRepository(Messages);
        this.participantsRepository = pool.getRepository(Participants);
        this.conversationRepository = pool.getRepository(Conversations);
        this.userRepository = pool.getRepository(User);
    }

    async createMessage(messageData: any): Promise<void> {
        // Extract conversation ID, sender ID, and recipient ID from messageData
        const { conversationId, senderId, recipientId, content } = messageData;

        // Check if the conversation exists
        const conversation = await this.conversationRepository.findOne(conversationId);
        if (!conversation) {
            throw new Error('Conversation not found');
        }

        // Check if both sender and recipient are participants in the conversation
        const [sender, recipient] = await Promise.all([
            this.userRepository.findOne(senderId),
            this.userRepository.findOne(recipientId)
        ]);
        if (!sender || !recipient) {
            throw new Error('Sender or recipient not found');
        }

        // Create message entity
        const newMessage = this.messageRepository.create({
            content,
            sender,
            conversation
        });

        // Save message entity
        await this.messageRepository.save(newMessage);
    }
}

export { MessageModel };
