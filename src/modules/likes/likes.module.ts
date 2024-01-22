import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { likesProviders } from './likes.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [LikesController],
  providers: [LikesService, ...likesProviders],
})
export class LikesModule {}
