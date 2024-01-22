import { Like } from './entities/like.entity';

export const likesProviders = [
  {
    provide: 'LIKES_REPOSITORY',
    useValue: Like,
  },
];