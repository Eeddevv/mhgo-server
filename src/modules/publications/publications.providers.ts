import { Publication } from './entities/publication.entity';

export const publicationsProviders = [
  {
    provide: 'PUBLICATIONS_REPOSITORY',
    useValue: Publication,
  },
];