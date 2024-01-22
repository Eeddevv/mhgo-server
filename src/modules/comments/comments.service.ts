import { Inject, Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENTS_REPOSITORY')
    private commentsRepository: typeof Comment
  ) {}
  async create(userId: string, entityId: number, content: string): Promise<Comment> {
    return this.commentsRepository.create({ userId, entityId, content });
  }

  async remove(userId: string, commentId: number): Promise<void> {
    await this.commentsRepository.destroy({ where: { id: commentId, userId } });
  }
}