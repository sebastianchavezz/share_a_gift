"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const Entities_1 = require("../db/Entities"); // Assuming the entity for comments is named Comment
const db_1 = __importDefault(require("../db/db"));
class CommentModel {
    constructor() {
        this.commentsRepository = db_1.default.getRepository(Entities_1.Comments);
    }
    async createComment(commentData) {
        const newComment = this.commentsRepository.create(commentData);
        await this.commentsRepository.save(newComment);
    }
    async updateComment(commentId, updatedCommentData) {
        await this.commentsRepository.update(commentId, updatedCommentData);
    }
    async deleteComment(commentId) {
        await this.commentsRepository.delete(commentId);
    }
    async getCommentById(commentId) {
        const comment = await this.commentsRepository.findOne({ where: { CommentID: commentId } });
        if (!comment) {
            throw new Error("Comment not found");
        }
        return comment;
    }
}
exports.CommentModel = CommentModel;
