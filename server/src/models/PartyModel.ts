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
        const { userId, name,occasion, date, description, creator, members } = partyData;
    
        // Find requesting user
        const requestingUser = await this.findUserById(userId);
        if (!requestingUser) {
            throw new Error('Requesting user not found');
        }
    
        const user_creator = await this.userRepository.findOne({where:{UserID:parseInt(creator,10)}});
        if(!user_creator){
            throw new Error('No Creator found');
        }
        // Create a new Party object
        const newParty = new Party();
        newParty.Occasion = occasion;
        newParty.Name = name,
        newParty.DateStart = date;
        newParty.DateEnd = date;
        newParty.Creator = user_creator;
        newParty.Description = description;
    
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
    
        console.log('NEW PARTY: ', newParty);
        // Save the new party entity
        await this.partyRepository.save(newParty);
    }
    
    async getPartyById(partyId: string): Promise<Party> {
        const id = parseInt(partyId, 10);
        const party = await this.partyRepository.findOne({ where: { PartyID: id } });
        if (!party) {
            throw new Error("Party not found");
        }
        return party;
    }

    async getPartyByUser(userIdInput: string): Promise<Party[]> {
        const userId = parseInt(userIdInput, 10);
        console.log('getting the parties for user:', userId);
        
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

    async updateParty(partyId: string, updatedPartyData: any): Promise<void> {
        try {
            // Parse partyId to integer
            const id = parseInt(partyId, 10);
    
            // Find the party by ID
            const party = await this.partyRepository.findOne({ where: { PartyID: id } });
    
            // If party not found, throw error
            if (!party) {
                throw new Error('No party with this ID');
            }
            if (updatedPartyData.name) {
                party.Name = updatedPartyData.name;
            }
            if (updatedPartyData.occasion) {
                party.Occasion = updatedPartyData.occasion;
            }
            if (updatedPartyData.date) {
                party.DateEnd = updatedPartyData.date;
            }
            if (updatedPartyData.description) {
                party.Description = updatedPartyData.description;
            }
            if (updatedPartyData.image) {
                party.ImageData = updatedPartyData.image;
            }
    
            // Save the updated party data
            await this.partyRepository.save(party);
        } catch (error) {
            // Handle error
            console.error('Error updating party:', error);
            throw new Error('Failed to update party');
        }
    }
    

    async deleteParty(partyId: number): Promise<void> {
        await this.partyRepository.delete(partyId);
    }

    async updatePicture(partyid: string, picture: any): Promise<void>{
        const id = parseInt(partyid, 10);
        console.log('id: ', id);
        const party = await this.partyRepository.findOne({where: {PartyID: id}});
        if(!party){
            throw new Error('Party Not Found');
        }
        party.ImageData = picture;
        await this.partyRepository.save(party);

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