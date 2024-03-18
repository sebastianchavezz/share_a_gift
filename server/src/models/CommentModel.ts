import { getRepository, Repository } from 'typeorm';
import { Comment } from '../db/Entities'; // Assuming the entity for comments is named Comment

class CommentModel {
    private commentRepository: Repository<Comment>;

    constructor() {
        this.commentRepository = getRepository(Comment);
    }

    async createComment(commentData: any): Promise<void> {
        const newComment = this.commentRepository.create(commentData);
        await this.commentRepository.save(newComment);
    }

    async updateComment(commentId: number, updatedCommentData: any): Promise<void> {
        await this.commentRepository.update(commentId, updatedCommentData);
    }

    async deleteComment(commentId: number): Promise<void> {
        await this.commentRepository.delete(commentId);
    }

    async getCommentById(commentId: number): Promise<Comment | undefined> {
        return this.commentRepository.findOne(commentId);
    }
}

export { CommentModel };
