"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentsModel = void 0;
const Entities_1 = require("../db/Entities");
const db_1 = __importDefault(require("../db/db"));
class PresentsModel {
    constructor() {
        this.presentRepository = db_1.default.getRepository(Entities_1.Present);
    }
    async addPresentToParty(partyId, presentData) {
        // Logic to add a present to a party (not implemented)
    }
    async getAllPresentsForParty(partyId) {
        // Logic to retrieve all presents for a party (not implemented)
    }
    async deletePresentFromParty(partyId, presentId) {
        // Logic to delete a present from a party (not implemented)
    }
    async updatePresent(presentId, updatedPresentData) {
        // Logic to update a present (not implemented)
    }
}
exports.PresentsModel = PresentsModel;
