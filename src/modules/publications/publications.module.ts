import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { publicationsProviders } from './publications.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [PublicationsController],
  providers: [PublicationsService, ...publicationsProviders],
})
export class PublicationsModule {}
