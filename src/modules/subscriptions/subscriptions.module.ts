import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { UsersModule } from '../users/users.module';
import { subscriptionsProviders } from './subscriptions.providers';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, ...subscriptionsProviders],
  exports: [SubscriptionsService]
})
export class SubscriptionsModule {}