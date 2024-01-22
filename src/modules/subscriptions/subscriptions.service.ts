import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { Subscription } from './subscription.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class SubscriptionsService {

  constructor(
    private usersService: UsersService,
    @Inject('SUBSCRIPTIONS_REPOSITORY')
    private subscriptionsRepository: typeof Subscription
  ) {}
  async follow(followeeId: string, followerId: string) {
    if (followerId === followeeId) {
      throw new ConflictException('Нельзя подписаться на самого себя');
    }

    const follower = await this.usersService.findByUid(followerId);
    const followee = await this.usersService.findByUid(followeeId);

    if (!follower || !followee) {
      throw new NotFoundException('Пользователь не найден');
    }

    const existingSubscription = await this.subscriptionsRepository.findOne({
      where: { followerId, followeeId },
    });

    if (existingSubscription) {
      throw new ConflictException('Уже подписаны');
    }

    await this.subscriptionsRepository.create({ followerId, followeeId });

    return await this.getFollowersCount(followeeId);
  }

  async getFollowersCount(userId: string): Promise<number> {
    const followers = await this.getFollowers(userId);
    return followers.length;
  }

  async getFollowingCount(userId: string): Promise<number> {
    const following = await this.getFollowing(userId);
    return following.length;
  }

  async unfollow(followeeId: string, followerId: string) {
    if (followerId === followeeId) {
      throw new ConflictException('Нельзя отписаться от самого себя');
    }

    const follower = await this.usersService.findByUid(followerId);
    const followee = await this.usersService.findByUid(followeeId);

    if (!follower || !followee) {
      throw new NotFoundException('Пользователь не найден');
    }

    const existingSubscription = await this.subscriptionsRepository.findOne({
      where: { followerId, followeeId },
    });

    if (!existingSubscription) {
      throw new ConflictException('Не подписаны');
    }

    await existingSubscription.destroy();

    return await this.getFollowersCount(followeeId);
  }

  async getFollowers(userId: string) {
    const user = await this.usersService.findByUid(userId, {
      include: { model: Subscription, as: 'followers' },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user.followers;
  }

  async isUserFollowing(followerId: string, followeeId: string): Promise<boolean> {
    const existingSubscription = await this.subscriptionsRepository.findOne({
      where: { followerId, followeeId },
    });
    return !!existingSubscription;
  }

  async getFollowing(userId: string) {
    const user = await this.usersService.findByUid(userId, {
      include: { model: Subscription, as: 'following' },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user.following;
  }
}