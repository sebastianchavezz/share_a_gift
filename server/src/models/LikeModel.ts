import { getRepository, Repository } from 'typeorm';
import { Like } from '../db/Entities'; // Assuming the entity for likes is named Like

class LikeModel {
    private likeRepository: Repository<Like>;

    constructor() {
        this.likeRepository = getRepository(Like);
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
