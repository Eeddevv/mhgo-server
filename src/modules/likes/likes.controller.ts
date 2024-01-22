import { Controller, Post, Delete, Param, UseGuards, Req, Get } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '../auth/auth.guard';
import { Like } from './entities/like.entity';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(AuthGuard)
  @Post(':publicationId')
  create(@Param('publicationId') publicationId: number, @Req() req: any): Promise<Like> {
    const userId = req.user.userId;
    return this.likesService.create(userId, publicationId);
  }

  @Get(':userId/:publicationId/count')
  async getLikeCount(
    @Param('userId') userId: string,
    @Param('publicationId') publicationId: number,
  ): Promise<{ count: number }> {
    const likeCount = await this.likesService.getLikeCount(userId, publicationId);
    return { count: likeCount };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: any): Promise<void> {
    const userId = req.user.userId;
    return this.likesService.remove(userId, id);
  }
}
