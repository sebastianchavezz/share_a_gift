//src/models/PartyModel.ts
import { getRepository, Repository } from 'typeorm';
import { Party } from '../db/Entities';

class PartyModel {
    private partyRepository: Repository<Party>;

    constructor() {
        this.partyRepository = getRepository(Party);
    }

    async addParty(partyData: any): Promise<void> {
        const newParty = this.partyRepository.create(partyData);
        await this.partyRepository.save(newParty);
    }

    async getPartyById(partyId: number): Promise<Party | undefined> {
        return this.partyRepository.findOne(partyId);
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
