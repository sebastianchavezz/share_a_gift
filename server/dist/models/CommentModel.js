"use strict";
/* import { getRepository, Repository } from 'typeorm';
import { Comments } from '../db/Entities'; // Assuming the entity for comments is named Comment
import pool from '../db/db';

class CommentModel {
    private commentsRepository: Repository<Comments>;

    constructor() {
        this.commentsRepository = pool.getRepository(Comments);
    }

    async createComment(commentData: any): Promise<void> {
        const newComment = this.commentsRepository.create(commentData);
        await this.commentsRepository.save(newComment);
    }

    async updateComment(commentId: number, updatedCommentData: any): Promise<void> {
        await this.commentsRepository.update(commentId, updatedCommentData);
    }

    async deleteComment(commentId: number): Promise<void> {
        await this.commentsRepository.delete(commentId);
    }

    async getCommentById(commentId: number): Promise<Comments> {
        const comment = await this.commentsRepository.findOne({ where: { CommentID: commentId } });
        if (!comment) {
            throw new Error("Comment not found");
        }
        return comment;
    }
}

export { CommentModel };
 */ 
