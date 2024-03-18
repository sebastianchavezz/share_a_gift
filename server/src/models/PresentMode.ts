import { getRepository, Repository } from 'typeorm';
import { Present } from '../db/Entities';

class PresentModel {
    private presentRepository: Repository<Present>;

    constructor() {
        this.presentRepository = getRepository(Present);
    }

    async addPresentToParty(partyId: number, presentData: any): Promise<void> {
        // Logic to add a present to a party (not implemented)
    }

    async getAllPresentsForParty(partyId: number): Promise<Present[] | undefined> {
        // Logic to retrieve all presents for a party (not implemented)
    }

    async deletePresentFromParty(partyId: number, presentId: number): Promise<void> {
        // Logic to delete a present from a party (not implemented)
    }

    async updatePresent(presentId: number, updatedPresentData: any): Promise<void> {
        // Logic to update a present (not implemented)
    }
}

export { PresentModel };
