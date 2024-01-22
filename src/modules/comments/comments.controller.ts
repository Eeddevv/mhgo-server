import { Controller, Post, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../auth/auth.guard';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post(':entityId')
  create(
    @Param('entityId') entityId: number,
    @Body('content') content: string,
    @Req() req: any,
  ): Promise<Comment> {
    const userId = req.user.userId;
    return this.commentsService.create(userId, entityId, content);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: any): Promise<void> {
    const userId = req.user.userId;
    return this.commentsService.remove(userId, id);
  }
}