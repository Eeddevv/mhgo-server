import { Inject, Injectable } from '@nestjs/common';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @Inject('LIKES_REPOSITORY')
    private likesRepository: typeof Like
  ) {}

  async create(userId: string, publicationId: number): Promise<Like> {
    return this.likesRepository.create({ userId, publicationId });
  }

  async getLikeCount(userId: string, publicationId: number): Promise<number> {
    return await this.likesRepository.count({
      where: { userId, publicationId }
    });
  }

  async remove(userId: string, likeId: number): Promise<void> {
    await this.likesRepository.destroy({ where: { id: likeId, userId } });
  }
}
