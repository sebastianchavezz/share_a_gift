import { getRepository, Repository } from 'typeorm';
import { Conversations, Participants, User } from '../db/Entities'; // Assuming the entity for conversations is named Conversations
import pool from '../db/db';

class ConversationModel {
    private conversationRepository: Repository<Conversations>;
    private participantsRepository: Repository<Participants>;
    private userRepository: Repository<User>;

    constructor() {
        this.conversationRepository = pool.getRepository(Conversations);
        this.participantsRepository = pool.getRepository(Participants);
        this.userRepository = pool.getRepository(User);
    }
    async getAllConversationsByUser(userId: string): Promise<Conversations[]>{
        const id  = parseInt(userId, 10);
        const user = await this.userRepository.findOne({where: {UserID: id}});
        if(!user) throw new Error('User not found');

        const conversation = await this.conversationRepository.find({
            relations :['participants'],
            where: {
                participants: [{user}]
            }
        });
        return conversation;
    }

    async createConversation(user1Id_string: string, user2Id_string: string): Promise<number> {
        // Check if a conversation already exists between the two users
        const existingConversation = await this.getConversationByUsers(user1Id_string, user2Id_string);
        if (existingConversation) {
            return existingConversation.ConversationID;
        }

        // Create a new conversation entity
        const newConversation = this.conversationRepository.create();
        await this.conversationRepository.save(newConversation);

        const user1Id = parseInt(user1Id_string, 10);
        const user2Id = parseInt(user2Id_string, 10 );
        // Associate both users with the conversation
        await Promise.all([
            this.addParticipantToConversation(newConversation.ConversationID, user1Id),
            this.addParticipantToConversation(newConversation.ConversationID, user2Id)
        ]);

        return newConversation.ConversationID;
    }

    async getConversationByUsers(user1Id_string: string, user2Id_string: string): Promise<Conversations | undefined> {
        const user1Id = parseInt(user1Id_string, 10);
        const user2Id = parseInt(user2Id_string, 10 );
        
        // Find conversations where both users are participants
        const participant1 = await this.userRepository.findOne({where:{UserID:user1Id}});
        const participant2 = await this.userRepository.findOne({where:{UserID: user2Id}});

        if (!participant1 || !participant2) {
            throw new Error('User not found');
        }

        const conversations = await this.conversationRepository.find({
            relations: ['participants'],
            where: {
                participants: [
                    { user: participant1 },
                    { user: participant2 }
                ]
            }
        });

        // Return the first conversation found (assuming only one conversation is allowed between two users)
        return conversations[0];
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

export { ConversationModel };
