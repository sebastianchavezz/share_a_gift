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
    async addParty(partyData) {
        const { userId, occasion, date, users } = partyData;
        const requestingUser = await this.findUserById(userId);
        if (!requestingUser) {
            throw new Error('Requesting user not found');
        }
        const newParty = new Entities_1.Party();
        newParty.Occasion = occasion;
        newParty.DateStart = date;
        newParty.DateEnd = date;
        newParty.Description = '';
        // Create an array to store User objects
        const usersArray = [requestingUser]; // Include the requesting user
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
    async getPartyById(partyId) {
        const party = await this.partyRepository.findOne({ where: { PartyID: partyId } });
        if (!party) {
            throw new Error("Party not found");
        }
        return party;
    }
    async getPartyByUser(userIdInput) {
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
    async addUserToParty(partyId, userId) {
        // Logic to add a user to a party (not implemented)
    }
    async updateParty(partyId, updatedPartyData) {
        // Logic to update a party (not implemented)
    }
    async deleteParty(partyId) {
        await this.partyRepository.delete(partyId);
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
