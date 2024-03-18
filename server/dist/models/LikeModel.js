"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModel = void 0;
const Entities_1 = require("../db/Entities"); // Assuming the entity for likes is named Like
const db_1 = __importDefault(require("../db/db"));
class LikeModel {
    constructor() {
        this.likeRepository = db_1.default.getRepository(Entities_1.Likes);
    }
    async createLike(likeData) {
        const newLike = this.likeRepository.create(likeData);
        await this.likeRepository.save(newLike);
    }
    async deleteLike(likeId) {
        await this.likeRepository.delete(likeId);
    }
}
exports.LikeModel = LikeModel;
