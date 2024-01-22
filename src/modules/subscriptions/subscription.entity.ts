import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Subscription extends Model<Subscription> {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  followerId: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  followeeId: string;

  @BelongsTo(() => User, 'followerId')
  follower: User;

  @BelongsTo(() => User, 'followeeId')
  followee: User;
}