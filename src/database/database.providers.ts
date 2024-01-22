import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/users/user.entity';
import { Subscription } from '../modules/subscriptions/subscription.entity';
import { Publication } from '../modules/publications/entities/publication.entity';
import { Like } from '../modules/likes/entities/like.entity';
import { Comment } from '../modules/comments/entities/comment.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'mhgo',
      });
      sequelize.addModels([
        User,
        Subscription,
        Publication,
        Like,
        Comment
      ])
      await sequelize.sync();
      return sequelize;
    },
  },
];