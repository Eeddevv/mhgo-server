import { Body, Controller, Get, Param, Patch, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly subscriptionsService: SubscriptionsService) {}
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Patch('profile')
  async updateUser(
    @Request() req,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(req.user.userId, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Get('profile/:userId?')
  async getProfile(@Request() req, @Param('userId') requestedUserId?: string) {
    const currentUser = req.user;
    const userIdToFetch = requestedUserId || currentUser.userId;

    const isCurrentUserProfile = currentUser.userId === userIdToFetch;
    const requestedUser = await this.usersService.findByUid(userIdToFetch);

    if (!requestedUser) {
      return { error: 'Requested user not found' };
    }

    const followersCount = await this.subscriptionsService.getFollowersCount(userIdToFetch);
    const followingCount = await this.subscriptionsService.getFollowingCount(userIdToFetch);

    const isFollowingResult = await this.subscriptionsService.isUserFollowing(currentUser.userId, userIdToFetch);

    // Составление ответа
    const profileWithCounts = {
      ...requestedUser.dataValues,
      followersCount,
      followingCount,
      isCurrentUserProfile,
      isFollowing: isFollowingResult
    };

    return profileWithCounts;
  }
}
