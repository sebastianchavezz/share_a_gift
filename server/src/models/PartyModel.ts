import { getRepository, Repository } from 'typeorm';
import { Party,User } from '../db/Entities';
import pool from '../db/db';
import { mailToRegister } from '../utils/Mailer';

class PartyModel {
    private partyRepository: Repository<Party>;
    private userRepository: Repository<User>;

    constructor() {
        this.partyRepository = pool.getRepository(Party);
        this.userRepository = pool.getRepository(User);
    }

    async addParty(partyData: any, image: Buffer | null): Promise<void> {
        const { userId, occasion, date, members } = partyData;
    
        // Find requesting user
        const requestingUser = await this.findUserById(userId);
        if (!requestingUser) {
            throw new Error('Requesting user not found');
        }
    
        // Create a new Party object
        const newParty = new Party();
        newParty.Occasion = occasion;
        newParty.DateStart = date;
        newParty.DateEnd = date;
        newParty.Description = '';
    
        // Add image data if provided
        if (image) {
            newParty.ImageData = image;
        }
    
        // Create an array to store User objects
        const usersArray: User[] = [requestingUser];
    
        // Iterate through members array
        for (const member of members) {
            const { type, identifier } = member;
    
            // Find or create user based on type
            let newUser: User | null = null;
            switch (type) {
                case 'email':
                    newUser = await this.findOrCreateUserByEmail(identifier);
                    break;
                case 'username':
                    newUser = await this.getUserByUsername(identifier);
                    break;
                default:
                    throw new Error('Invalid user type provided');
            }
    
            // Add user to usersArray if found
            if (newUser) {
                usersArray.push(newUser);
            } else {
                throw new Error(`User not found for ${type}: ${identifier}`);
            }
        }
    
        // Assign usersArray to newParty.users
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

        // TODO: data validation inside the Controller Please
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

    private async getUserByUsername(username: string): Promise<User>{
        const user = await this.userRepository.findOne({where: {Username: username}});
        if(!user){
            throw new Error("User not found with this username");
        }
        return user;
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
            // here we send an email if it doesnt have an account yet
            //Warning: Check ifthis is good later on
            mailToRegister(email); 
            await this.userRepository.save(user);
        }

        return user;
    }
}

 

export { PartyModel };