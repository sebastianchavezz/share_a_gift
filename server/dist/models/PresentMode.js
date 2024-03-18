"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentModel = void 0;
const typeorm_1 = require("typeorm");
const Entities_1 = require("../db/Entities");
class PresentModel {
    constructor() {
        this.presentRepository = (0, typeorm_1.getRepository)(Entities_1.Present);
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
exports.PresentModel = PresentModel;
