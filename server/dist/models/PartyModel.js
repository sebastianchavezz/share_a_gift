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
        const newParty = this.partyRepository.create(partyData);
        await this.partyRepository.save(newParty);
    }
    async getPartyById(partyId) {
        const party = await this.partyRepository.findOne({ where: { PartyID: partyId } });
        if (!party) {
            throw new Error("Party not found");
        }
        return party;
    }
    async getPartyByUser(userId) {
        // Use the repository for PartyUser entity to perform the join operation
        const partyUserRepository = db_1.default.getRepository(Entities_1.PartyUser);
        // Find parties associated with the given user ID
        const partyUsers = await partyUserRepository.find({ where: { user: { UserID: userId } }, relations: ['party'] });
        // Extract parties from the partyUser entities
        const parties = partyUsers.map(partyUser => partyUser.party);
        if (!parties) {
            throw new Error("No parties found for the user");
        }
        return parties; // Join Party table with PartyUser table on PartyID
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
