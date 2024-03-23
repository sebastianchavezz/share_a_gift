"use strict";
/* import { getRepository, Repository } from 'typeorm';
import { Likes } from '../db/Entities'; // Assuming the entity for likes is named Like
import pool from '../db/db';

class LikeModel {
    private likeRepository: Repository<Likes>;

    constructor() {
        this.likeRepository = pool.getRepository(Likes);
    }

    async createLike(likeData: any): Promise<void> {
        const newLike = this.likeRepository.create(likeData);
        await this.likeRepository.save(newLike);
    }

    async deleteLike(likeId: number): Promise<void> {
        await this.likeRepository.delete(likeId);
    }
}

export { LikeModel };
 */ 
