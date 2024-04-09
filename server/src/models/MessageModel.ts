import { getRepository, Repository } from 'typeorm';
import { Conversations, Messages, Participants, User } from '../db/Entities'; // Assuming the entity for messages is named Message
import pool from '../db/db';
import { UserModel } from './UserModel';

class MessageModel {
    private messageRepository: Repository<Messages>;
    private participantsRepository: Repository<Participants>;
    private conversationRepository: Repository<Conversations>;
    private userRepository: Repository<User>;
    private userModel = new UserModel();

    constructor() {
        this.messageRepository = pool.getRepository(Messages);
        this.participantsRepository = pool.getRepository(Participants);
        this.conversationRepository = pool.getRepository(Conversations);
        this.userRepository = pool.getRepository(User);
    }

    async getMessagesBetweenUsers(user1Id_string: string, user2Id_string: string): Promise<any[]> {
        // Check if both sender and recipient are participants in the conversation
        const sender = await this.userModel.getUserById(user1Id_string);
        const recipient = await this.userModel.getUserById(user2Id_string);
        if (!sender || !recipient) {
            throw new Error('Sender or recipient not found');
        }
    
        // Find the conversation where both users are participants
        const conversation = await this.conversationRepository.findOne({
            relations: ['messages', 'messages.sender'],
            where: {
                participants: [{ user: sender }, { user: recipient }]
            }
        });
    
        if (!conversation) {
            throw new Error('Conversation not found');
        }
    
        // Extract relevant message details
        const messagesData = conversation.messages.map(message => ({
            sender: {
                id: message.sender.UserID,
                username: message.sender.Username,
                // Add any other sender details you need
            },
            content: message.content,
            timestamp: message.timestamp
        }));
    
        return messagesData;
    }
    
    async createMessage(messageData: any): Promise<void> {
        // Extract conversation ID, sender ID, and recipient ID from messageData
        const { conversationId, senderId_string, recipientId_string, content } = messageData;

        console.log("messageData: ",messageData);
        // Check if the conversation exists
        const conversation = await this.conversationRepository.findOne({
            where: {ConversationID: conversationId}
        });
        if (!conversation) {
            throw new Error('Conversation not found');
        }

        // Check if both sender and recipient are participants in the conversation
        const sender = await this.userModel.getUserById(senderId_string);
        const recipient = await this.userModel.getUserById(recipientId_string);
        if (!sender || !recipient) {
            throw new Error('Sender or recipient not found');
        }

        // Create message entity
        const newMessage = this.messageRepository.create({
            content,
            sender,
            conversation
        });
        console.log('Message is: ', newMessage);
        // Save message entity
        await this.messageRepository.save(newMessage);
    }
}

export { MessageModel };
