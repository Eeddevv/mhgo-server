import { Subscription } from './subscription.entity';

export const subscriptionsProviders = [
  {
    provide: 'SUBSCRIPTIONS_REPOSITORY',
    useValue: Subscription,
  },
];