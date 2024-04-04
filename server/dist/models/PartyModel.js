"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyModel = void 0;
const Entities_1 = require("../db/Entities");
const db_1 = __importDefault(require("../db/db"));
const Mailer_1 = require("../utils/Mailer");
const typeorm_1 = require("typeorm");
class PartyModel {
    constructor() {
        this.partyRepository = db_1.default.getRepository(Entities_1.Party);
        this.userRepository = db_1.default.getRepository(Entities_1.User);
    }
    async addParty(partyData, image) {
        const { userId, name, occasion, date, description, creator, members } = partyData;
        // Find requesting user
        const requestingUser = await this.findUserById(userId);
        if (!requestingUser) {
            throw new Error('Requesting user not found');
        }
        const user_creator = await this.userRepository.findOne({ where: { UserID: parseInt(creator, 10) } });
        if (!user_creator) {
            throw new Error('No Creator found');
        }
        // Create a new Party object
        const newParty = new Entities_1.Party();
        newParty.Occasion = occasion;
        newParty.Name = name;
        newParty.DateStart = date;
        newParty.DateEnd = date;
        newParty.Creator = user_creator;
        newParty.Description = description;
        // Add image data if provided
        if (image) {
            newParty.ImageData = image;
        }
        // Create an array to store User objects
        const usersArray = [requestingUser];
        // Iterate through members array
        for (const member of members) {
            const { type, identifier } = member;
            //Todo fix this shit CODE PLEASE
            // Find or create user based on type
            let newUser = null;
            switch (type) {
                case 'email':
                    if (identifier) {
                        newUser = await this.findOrCreateUserByEmail(identifier);
                    }
                    break;
                case 'username':
                    if (identifier) {
                        newUser = await this.getUserByUsername(identifier);
                    }
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
        console.log('NEW PARTY: ', newParty);
        // Save the new party entity
        await this.partyRepository.save(newParty);
    }
    async getPartyById(partyId) {
        const id = parseInt(partyId, 10);
        const party = await this.partyRepository.findOne({
            where: { PartyID: id },
            relations: ['users', 'Creator']
        });
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
    async updateParty(userid, updatedPartyData) {
        // Parse partyId to integer
        const u_id = parseInt(userid, 10);
        const p_id = parseInt(updatedPartyData.partyid, 10);
        // Find the party by ID
        const party = await this.partyRepository.findOne({
            where: { PartyID: p_id },
            relations: ['Creator', 'users']
        });
        // If party not found, throw error
        if (!party) {
            throw new Error('No party with this ID');
        }
        // Check whether the creator wants to update the party
        if (u_id !== party.Creator.UserID) {
            throw new Error('This user cannot update the Party');
        }
        // Users that are in the PartyData and in the party Repo
        const union_users = await this.userRepository.find({
            where: { Username: (0, typeorm_1.In)(updatedPartyData.users) }
        });
        // Get all the users in the Party
        const users_in_party = party.users;
        // All the users in UpdateData
        const update_user = updatedPartyData.users;
        // Compare users_in_party with union_users and remove users not in union_users
        party.users = users_in_party.filter(user => union_users.some(u => u.UserID === user.UserID));
        // Compare update_user with union_users and add users not in union_users
        update_user.forEach(username => {
            const userToAdd = union_users.find(u => u.Username === username);
            if (userToAdd && !party.users.some(user => user.UserID === userToAdd.UserID)) {
                party.users.push(userToAdd);
            }
        });
        // Update other party properties
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
        console.log("PARTY in UPDATE", party);
        // Save the updated party data
        await this.partyRepository.save(party);
    }
    async deleteParty(userid, partyid) {
        const userId = parseInt(userid, 10);
        const partyId = parseInt(partyid, 10);
        console.log('Party id:', partyId);
        console.log('User id:', userId);
        const party = await this.partyRepository.findOne({
            where: { PartyID: partyId },
            relations: ['Creator', 'users']
        });
        if (!party) {
            console.log('Error: Party not found');
            throw new Error('Error: Party not found');
        }
        console.log('Party:', party);
        if (userId !== party.Creator.UserID) {
            throw new Error('You may not delete this party, NOT AUTHORISED');
        }
        // Remove the party from each user's parties array
        party.users.forEach(user => {
            if (user.parties) {
                user.parties = user.parties.filter(p => p.PartyID !== partyId);
            }
        });
        // Save the users to update the party removal from user's parties array
        await Promise.all(party.users.map(user => user.save()));
        // Finally, delete the party
        await this.partyRepository.remove(party);
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
