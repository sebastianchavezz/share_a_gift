//src/models/PartyModel.ts
import { getRepository, Repository } from 'typeorm';
import { Party, PartyUser} from '../db/Entities';
import pool from '../db/db';

class PartyModel {
    private partyRepository: Repository<Party>;

    constructor() {
        this.partyRepository = pool.getRepository(Party);
    }

    async addParty(partyData: any): Promise<void> {
        // Parse the user ID to ensure it's a valid integer
        const uid = parseInt(partyData.userId, 10);
        if (isNaN(uid)) {
            throw new Error('Invalid user ID. Please provide a valid integer.');
        }

        // Create a new party entity
        const newParty = this.partyRepository.create({
            Occasion: partyData.occasion,
            DateStart: partyData.date,
            DateEnd: partyData.date, // Assuming both start and end date are the same
            Messaging: '', // Add messaging data if available
            users: [{ userid: uid }] // Add the user to the party
        });

        // Save the new party entity
        await this.partyRepository.save(newParty);
    }

    async getPartyById(partyId: number): Promise<Party> {
        const party = await this.partyRepository.findOne({where: {PartyID:partyId}});
        if (!party) {
            throw new Error("Party not found");
        }
        return party;
    }
    
    async getPartyByUser(userIdInput: any): Promise<Party[]> {
        console.log("User ID input:", userIdInput); // Log the user input
        // Parse the user input to ensure it's a valid integer
        const userId = parseInt(userIdInput, 10); // Radix 10 is used to parse integers in base 10
    
        // Check if userId is a valid integer
        if (isNaN(userId)) {
            throw new Error('Invalid user ID. Please provide a valid integer.');
        }
    
        // Use the repository for PartyUser entity to perform the join operation
        const partyUserRepository = pool.getRepository(PartyUser);
        
        // Find parties associated with the given user ID
        const partyUsers = await partyUserRepository.find({ where: { user: { UserID: userId } }, relations: ['party'] });

        console.log('heloooww');
        partyUsers.forEach(partyUser => {
            console.log("Party User:", partyUser);
        });
        
        // Extract parties from the partyUser entities
        const parties = partyUsers.map(partyUser => partyUser.party);
        
        if (!parties) {
            throw new Error("No parties found for the user");
        }
        return parties;
    }
    
    
    async addUserToParty(partyId: number, userId: number): Promise<void> {
        // Logic to add a user to a party (not implemented)
    }

    async updateParty(partyId: number, updatedPartyData: any): Promise<void> {
        // Logic to update a party (not implemented)
    }

    async deleteParty(partyId: number): Promise<void> {
        await this.partyRepository.delete(partyId);
    }

}

export { PartyModel };
