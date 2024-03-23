import { getRepository, Repository } from 'typeorm';
import { Party,User } from '../db/Entities';
import pool from '../db/db';

class PartyModel {
    private partyRepository: Repository<Party>;
    private userRepository: Repository<User>;

    constructor() {
        this.partyRepository = pool.getRepository(Party);
        this.userRepository = pool.getRepository(User);
    }

    async addParty(partyData: any): Promise<void> {
        const { userId, occasion, date, users } = partyData;
        const requestingUser = await this.findUserById(userId);
    
        if (!requestingUser) {
            throw new Error('Requesting user not found');
        }
    
        const newParty = new Party();
        newParty.Occasion = occasion;
        newParty.DateStart = date;
        newParty.DateEnd = date;
        newParty.Messaging = '';
    
        // Create an array to store User objects
        const usersArray: User[] = [requestingUser]; // Include the requesting user
    
        // Populate usersArray with User objects for each user in the partyData
        for (const userData of users) {
            const newUser = await this.findOrCreateUserByEmail(userData.email);
            usersArray.push(newUser);
        }
    
        // Assign the usersArray to newParty.users
        newParty.users = usersArray;
    
        // Save the new party entity
        await this.partyRepository.save(newParty);
    }
    

    async getPartyById(partyId: number): Promise<Party> {
        const party = await this.partyRepository.findOne({ where: { PartyID: partyId } });

        if (!party) {
            throw new Error("Party not found");
        }

        return party;
    }

    async getPartyByUser(userIdInput: any): Promise<Party[]> {
        const userId = parseInt(userIdInput, 10);

        if (isNaN(userId)) {
            throw new Error('Invalid user ID. Please provide a valid integer.');
        }
    
        const user = await this.userRepository.findOne({ 
            where: { UserID: userId }, 
            relations: ['parties'] 
        });
    
        if (!user) {
            throw new Error('User not found');
        }
        return user.parties;
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


    private async findUserById(userId: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { UserID: userId } });
        if(!user){
            throw new Error("User not found with this ID");
        }
        return user;
    }

    private async findOrCreateUserByEmail(email: string): Promise<User> {
        let user = await this.userRepository.findOne({ where: { Email: email } });

        if (!user) {
            user = new User();
            user.Email = email;
            await this.userRepository.save(user);
        }

        return user;
    }
}

export { PartyModel };