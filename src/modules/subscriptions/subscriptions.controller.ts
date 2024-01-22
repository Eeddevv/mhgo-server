import { Controller, Get, Param, Post, Delete, UseGuards, Request } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('subscriptions')
@UseGuards(AuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post(':followeeId')
  follow(@Param('followeeId') followeeId: string, @Request() req) {
    const followerId = req.user.userId;
    return this.subscriptionsService.follow(followeeId, followerId);
  }

  @Delete(':followeeId')
  unfollow(@Param('followeeId') followeeId: string, @Request() req) {
    const followerId = req.user.userId;
    return this.subscriptionsService.unfollow(followeeId, followerId);
  }

  @Get('followers/:userId')
  getFollowers(@Param('userId') userId: string) {
    return this.subscriptionsService.getFollowers(userId);
  }

  @Get('isFollowing/:followerId/:followeeId')
  async isUserFollowing(
    @Param('followerId') followerId: string,
    @Param('followeeId') followeeId: string,
  ): Promise<{ isFollowing: boolean }> {
    try {
      const isFollowing = await this.subscriptionsService.isUserFollowing(followerId, followeeId);

      return { isFollowing };
    } catch (error) {
      return { isFollowing: false };
    }
  }

  @Get('following/:userId')
  getFollowing(@Param('userId') userId: string) {
    return this.subscriptionsService.getFollowing(userId);
  }
}