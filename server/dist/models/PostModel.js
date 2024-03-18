"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const Entities_1 = require("../db/Entities"); // Assuming the entity for posts is named Post
const db_1 = __importDefault(require("../db/db"));
class PostModel {
    constructor() {
        this.postRepository = db_1.default.getRepository(Entities_1.Posts);
    }
    async createPost(postData) {
        // Logic to create a post (not implemented)
    }
    async getPostById(postId) {
        const post = await this.postRepository.findOne({ where: { PostID: postId } });
        if (!post) {
            throw new Error("Post not found");
        }
        return post;
    }
    async updatePost(postId, updatedPostData) {
        // Logic to update a post (not implemented)
    }
    async deletePost(postId) {
        await this.postRepository.delete(postId);
    }
}
exports.PostModel = PostModel;
