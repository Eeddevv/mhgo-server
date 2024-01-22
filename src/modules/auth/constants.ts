import { SetMetadata } from '@nestjs/common';
export const jwtConstants = {
  secret: 'wergwwreg23423r23sfvbethyrew4t546ysrehthsevdst',
};
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);