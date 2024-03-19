"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyModel = void 0;
const Entities_1 = require("../db/Entities");
const db_1 = __importDefault(require("../db/db"));
class PartyModel {
    constructor() {
        this.partyRepository = db_1.default.getRepository(Entities_1.Party);
    }
    async addParty(partyData) {
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
    async getPartyById(partyId) {
        const party = await this.partyRepository.findOne({ where: { PartyID: partyId } });
        if (!party) {
            throw new Error("Party not found");
        }
        return party;
    }
    async getPartyByUser(userIdInput) {
        console.log("User ID input:", userIdInput); // Log the user input
        // Parse the user input to ensure it's a valid integer
        const userId = parseInt(userIdInput, 10); // Radix 10 is used to parse integers in base 10
        // Check if userId is a valid integer
        if (isNaN(userId)) {
            throw new Error('Invalid user ID. Please provide a valid integer.');
        }
        // Use the repository for PartyUser entity to perform the join operation
        const partyUserRepository = db_1.default.getRepository(Entities_1.PartyUser);
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
    async addUserToParty(partyId, userId) {
        // Logic to add a user to a party (not implemented)
    }
    async updateParty(partyId, updatedPartyData) {
        // Logic to update a party (not implemented)
    }
    async deleteParty(partyId) {
        await this.partyRepository.delete(partyId);
    }
}
exports.PartyModel = PartyModel;
