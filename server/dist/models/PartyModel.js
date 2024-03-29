"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyModel = void 0;
const Entities_1 = require("../db/Entities");
const db_1 = __importDefault(require("../db/db"));
const Mailer_1 = require("../utils/Mailer");
class PartyModel {
    constructor() {
        this.partyRepository = db_1.default.getRepository(Entities_1.Party);
        this.userRepository = db_1.default.getRepository(Entities_1.User);
    }
    async addParty(partyData, image) {
        const { userId, name, occasion, date, members } = partyData;
        // Find requesting user
        const requestingUser = await this.findUserById(userId);
        if (!requestingUser) {
            throw new Error('Requesting user not found');
        }
        // Create a new Party object
        const newParty = new Entities_1.Party();
        newParty.Occasion = occasion;
        newParty.Name = name,
            newParty.DateStart = date;
        newParty.DateEnd = date;
        newParty.Description = '';
        // Add image data if provided
        if (image) {
            newParty.ImageData = image;
        }
        // Create an array to store User objects
        const usersArray = [requestingUser];
        // Iterate through members array
        for (const member of members) {
            const { type, identifier } = member;
            // Find or create user based on type
            let newUser = null;
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
            }
            else {
                throw new Error(`User not found for ${type}: ${identifier}`);
            }
        }
        // Assign usersArray to newParty.users
        newParty.users = usersArray;
        // Save the new party entity
        await this.partyRepository.save(newParty);
    }
    async getPartyById(partyId) {
        const id = parseInt(partyId, 10);
        const party = await this.partyRepository.findOne({ where: { PartyID: id } });
        if (!party) {
            throw new Error("Party not found");
        }
        return party;
    }
    async getPartyByUser(userIdInput) {
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
    async addUserToParty(partyId, userId) {
        // Logic to add a user to a party (not implemented)
    }
    async updateParty(partyId, updatedPartyData) {
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
        }
        catch (error) {
            // Handle error
            console.error('Error updating party:', error);
            throw new Error('Failed to update party');
        }
    }
    async deleteParty(partyId) {
        await this.partyRepository.delete(partyId);
    }
    async updatePicture(partyid, picture) {
        const id = parseInt(partyid, 10);
        console.log('id: ', id);
        const party = await this.partyRepository.findOne({ where: { PartyID: id } });
        if (!party) {
            throw new Error('Party Not Found');
        }
        party.ImageData = picture;
        await this.partyRepository.save(party);
    }
    async getUserByUsername(username) {
        const user = await this.userRepository.findOne({ where: { Username: username } });
        if (!user) {
            throw new Error("User not found with this username");
        }
        return user;
    }
    async findUserById(userId) {
        const user = await this.userRepository.findOne({ where: { UserID: userId } });
        if (!user) {
            throw new Error("User not found with this ID");
        }
        return user;
    }
    async findOrCreateUserByEmail(email) {
        let user = await this.userRepository.findOne({ where: { Email: email } });
        if (!user) {
            user = new Entities_1.User();
            user.Email = email;
            // here we send an email if it doesnt have an account yet
            //Warning: Check ifthis is good later on
            (0, Mailer_1.mailToRegister)(email);
            await this.userRepository.save(user);
        }
        return user;
    }
}
exports.PartyModel = PartyModel;
