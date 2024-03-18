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
        const newParty = this.partyRepository.create(partyData);
        await this.partyRepository.save(newParty);
    }

    async getPartyById(partyId: number): Promise<Party> {
        const party = await this.partyRepository.findOne({where: {PartyID:partyId}});
        if (!party) {
            throw new Error("Party not found");
        }
        return party;
    }
    
    async getPartyByUser(userId: number): Promise<Party[]> {
        // Use the repository for PartyUser entity to perform the join operation
        const partyUserRepository = pool.getRepository(PartyUser);
        
        // Find parties associated with the given user ID
        const partyUsers = await partyUserRepository.find({ where: {user:{UserID: userId} }, relations: ['party'] });
        
        // Extract parties from the partyUser entities
        const parties = partyUsers.map(partyUser => partyUser.party);
        
        if (!parties) {
            throw new Error("No parties found for the user");
        }
        return parties;        // Join Party table with PartyUser table on PartyID
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
